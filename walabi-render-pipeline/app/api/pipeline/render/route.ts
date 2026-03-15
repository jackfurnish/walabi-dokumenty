import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

import { z } from 'zod'
import { createProvider } from '@/lib/ai/provider'
import { ProjectInputSchema } from '@/lib/schemas/project'
import {
  SpaceAnalysisSchema,
  RedesignStrategySchema,
  StyleDirectionSchema,
  FurnitureConceptSchema,
} from '@/lib/schemas/pipeline'
import { runRenderPromptGenerator } from '@/lib/pipeline/renderPromptGenerator'
import { renderPromptGeneratorPrompt } from '@/lib/prompts/templates'
import { RENDER_PROMPT_SYSTEM } from '@/lib/prompts/system'
import { parseAIResponse } from '@/lib/pipeline/parseAIResponse'
import type { RenderPromptPackage } from '@/lib/schemas/pipeline'

const RequestSchema = z.object({
  input: ProjectInputSchema,
  spaceAnalysis: SpaceAnalysisSchema,
  redesignStrategy: RedesignStrategySchema,
  styleDirection: StyleDirectionSchema,
  furnitureConcept: FurnitureConceptSchema,
})

// ============================================================
// POST /api/pipeline/render — RenderPromptGenerator module
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept } = RequestSchema.parse(body)

    const provider = createProvider()
    const useAI = provider.name === 'anthropic'

    let output: RenderPromptPackage

    if (useAI) {
      const prompt = renderPromptGeneratorPrompt(input, redesignStrategy, styleDirection, furnitureConcept)
      const raw = await provider.complete(prompt, {
        systemPrompt: RENDER_PROMPT_SYSTEM,
        maxTokens: 1500,
      })
      output = parseAIResponse(raw, () => runRenderPromptGenerator(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept))
    } else {
      output = runRenderPromptGenerator(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
    }

    return NextResponse.json({ output, provider: provider.name })

  } catch (error) {
    console.error('[Pipeline/render] Error:', error)
    return NextResponse.json(
      { error: 'Render module failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
