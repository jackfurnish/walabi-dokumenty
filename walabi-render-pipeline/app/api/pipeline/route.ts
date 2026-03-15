// DEPRECATED: This monolithic endpoint has been replaced by 6 separate module routes
// to avoid Vercel Hobby plan's 10-second function timeout.
// New endpoints: /api/pipeline/space, /strategy, /style, /furniture, /render, /investor
// This file is kept for reference only — the client now calls the module routes via pipelineService.ts

import { NextRequest, NextResponse } from 'next/server'

// Allow up to 60s for the full AI pipeline (Hobby plan limit)
export const maxDuration = 60
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
import { parseAIResponse } from '@/lib/pipeline/parseAIResponse'

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

    // ── E + F. Render Prompt + Investor Summary (parallel) ─
    let renderPromptPackage: RenderPromptPackage
    let investorSummary: InvestorSummary

    if (useAI) {
      const [rawRender, rawInvestor] = await Promise.all([
        provider.complete(
          renderPromptGeneratorPrompt(input, redesignStrategy, styleDirection, furnitureConcept),
          { systemPrompt: RENDER_PROMPT_SYSTEM, maxTokens: 1500 }
        ),
        provider.complete(
          investorSummaryPrompt(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept),
          { systemPrompt: INVESTOR_SUMMARY_SYSTEM, maxTokens: 2000 }
        ),
      ])
      renderPromptPackage = parseAIResponse(rawRender, () => runRenderPromptGenerator(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept))
      investorSummary     = parseAIResponse(rawInvestor, () => runInvestorSummary(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept))
    } else {
      renderPromptPackage = runRenderPromptGenerator(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
      investorSummary     = runInvestorSummary(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
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

// parseAIResponse has been moved to @/lib/pipeline/parseAIResponse (shared utility)
