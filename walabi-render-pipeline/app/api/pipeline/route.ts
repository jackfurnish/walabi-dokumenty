import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createProvider, type ImageInput } from '@/lib/ai/provider'
import { PipelineOutputSchema } from '@/lib/schemas/pipeline'
import { ProjectInputSchema } from '@/lib/schemas/project'

// Deterministic fallback modules
import { runSpaceAnalyzer }         from '@/lib/pipeline/spaceAnalyzer'
import { runRedesignStrategist }    from '@/lib/pipeline/redesignStrategist'
import { runStyleDirector }         from '@/lib/pipeline/styleDirector'
import { runFurnitureConcept }      from '@/lib/pipeline/furnitureConcept'
import { runRenderPromptGenerator } from '@/lib/pipeline/renderPromptGenerator'
import { runInvestorSummary }       from '@/lib/pipeline/investorSummary'

// AI prompt templates
import {
  spaceAnalyzerPrompt,
  redesignStrategistPrompt,
  furnitureConceptPrompt,
  renderPromptGeneratorPrompt,
  investorSummaryPrompt,
} from '@/lib/prompts/templates'
import {
  SPACE_ANALYZER_SYSTEM,
  REDESIGN_STRATEGIST_SYSTEM,
  FURNITURE_CONCEPT_SYSTEM,
  RENDER_PROMPT_SYSTEM,
  INVESTOR_SUMMARY_SYSTEM,
} from '@/lib/prompts/system'

import type {
  SpaceAnalysis,
  RedesignStrategy,
  StyleDirection,
  FurnitureConcept,
  RenderPromptPackage,
  InvestorSummary,
} from '@/lib/schemas/pipeline'

const RequestSchema = z.object({
  input: ProjectInputSchema,
})

// ============================================================
// POST /api/pipeline
// Runs the full pipeline server-side with AI or deterministic fallback
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { input } = RequestSchema.parse(body)

    const provider = createProvider()
    const useAI = provider.name === 'anthropic'

    // Extract image data for vision API (up to 4 images)
    const images: ImageInput[] = []

    if (useAI && input.imageDataUrls.length > 0) {
      for (const dataUrl of input.imageDataUrls.slice(0, 4)) {
        const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/)
        if (match) {
          const mime = match[1] as string
          let mediaType: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg'
          if (mime === 'image/png')  mediaType = 'image/png'
          if (mime === 'image/webp') mediaType = 'image/webp'
          images.push({ base64: match[2], mediaType })
        }
      }
    }

    // ── A. Space Analysis ──────────────────────────────────
    let spaceAnalysis: SpaceAnalysis

    if (useAI) {
      const prompt = spaceAnalyzerPrompt(input, images.length > 0)
      let raw: string

      if (images.length > 0 && provider.completeWithImages) {
        raw = await provider.completeWithImages(prompt, images, {
          systemPrompt: SPACE_ANALYZER_SYSTEM,
          maxTokens: 1500,
        })
      } else {
        raw = await provider.complete(prompt, {
          systemPrompt: SPACE_ANALYZER_SYSTEM,
          maxTokens: 1500,
        })
      }
      spaceAnalysis = parseAIResponse(raw, () => runSpaceAnalyzer(input))
    } else {
      spaceAnalysis = runSpaceAnalyzer(input)
    }

    // ── B. Redesign Strategy ───────────────────────────────
    let redesignStrategy: RedesignStrategy

    if (useAI) {
      const prompt = redesignStrategistPrompt(input, spaceAnalysis)
      const raw = await provider.complete(prompt, {
        systemPrompt: REDESIGN_STRATEGIST_SYSTEM,
        maxTokens: 2000,
      })
      redesignStrategy = parseAIResponse(raw, () => runRedesignStrategist(input, spaceAnalysis))
    } else {
      redesignStrategy = runRedesignStrategist(input, spaceAnalysis)
    }

    // ── C. Style Direction (always deterministic — brand consistency) ──
    const styleDirection: StyleDirection = runStyleDirector(input)

    // ── D. Furniture Concept ───────────────────────────────
    let furnitureConcept: FurnitureConcept

    if (useAI) {
      const prompt = furnitureConceptPrompt(input, redesignStrategy, styleDirection)
      const raw = await provider.complete(prompt, {
        systemPrompt: FURNITURE_CONCEPT_SYSTEM,
        maxTokens: 2500,
      })
      furnitureConcept = parseAIResponse(raw, () => runFurnitureConcept(input, redesignStrategy, styleDirection))
    } else {
      furnitureConcept = runFurnitureConcept(input, redesignStrategy, styleDirection)
    }

    // ── E. Render Prompt ───────────────────────────────────
    let renderPromptPackage: RenderPromptPackage

    if (useAI) {
      const prompt = renderPromptGeneratorPrompt(input, redesignStrategy, styleDirection, furnitureConcept)
      const raw = await provider.complete(prompt, {
        systemPrompt: RENDER_PROMPT_SYSTEM,
        maxTokens: 1500,
      })
      renderPromptPackage = parseAIResponse(raw, () => runRenderPromptGenerator(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept))
    } else {
      renderPromptPackage = runRenderPromptGenerator(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
    }

    // ── F. Investor Summary ────────────────────────────────
    let investorSummary: InvestorSummary

    if (useAI) {
      const prompt = investorSummaryPrompt(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
      const raw = await provider.complete(prompt, {
        systemPrompt: INVESTOR_SUMMARY_SYSTEM,
        maxTokens: 2000,
      })
      investorSummary = parseAIResponse(raw, () => runInvestorSummary(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept))
    } else {
      investorSummary = runInvestorSummary(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
    }

    const output = PipelineOutputSchema.parse({
      spaceAnalysis,
      redesignStrategy,
      styleDirection,
      furnitureConcept,
      renderPromptPackage,
      investorSummary,
    })

    return NextResponse.json({ output, provider: provider.name })

  } catch (error) {
    console.error('[Pipeline API] Error:', error)
    return NextResponse.json(
      { error: 'Pipeline failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// ── Helper: parse AI JSON response with fallback ──────────
function parseAIResponse<T>(raw: string, fallback: () => T): T {
  try {
    // Strip markdown code fences if Claude wrapped the response
    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    return JSON.parse(cleaned) as T
  } catch {
    console.warn('[Pipeline API] Failed to parse AI response, using fallback')
    return fallback()
  }
}
