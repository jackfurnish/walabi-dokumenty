import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

import { z } from 'zod'
import { createProvider } from '@/lib/ai/provider'
import { ProjectInputSchema } from '@/lib/schemas/project'
import {
  RedesignStrategySchema,
  StyleDirectionSchema,
} from '@/lib/schemas/pipeline'
import { runFurnitureConcept } from '@/lib/pipeline/furnitureConcept'
import { furnitureConceptPrompt } from '@/lib/prompts/templates'
import { FURNITURE_CONCEPT_SYSTEM } from '@/lib/prompts/system'
import { parseAIResponse } from '@/lib/pipeline/parseAIResponse'
import type { FurnitureConcept } from '@/lib/schemas/pipeline'

const RequestSchema = z.object({
  input: ProjectInputSchema,
  redesignStrategy: RedesignStrategySchema,
  styleDirection: StyleDirectionSchema,
})

// ============================================================
// POST /api/pipeline/furniture — FurnitureConcept module
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { input, redesignStrategy, styleDirection } = RequestSchema.parse(body)

    const provider = createProvider()
    const useAI = provider.name === 'anthropic'

    let output: FurnitureConcept

    if (useAI) {
      const prompt = furnitureConceptPrompt(input, redesignStrategy, styleDirection)
      const raw = await provider.complete(prompt, {
        systemPrompt: FURNITURE_CONCEPT_SYSTEM,
        maxTokens: 1200,
      })
      output = parseAIResponse(raw, () => runFurnitureConcept(input, redesignStrategy, styleDirection))
    } else {
      output = runFurnitureConcept(input, redesignStrategy, styleDirection)
    }

    return NextResponse.json({ output, provider: provider.name })

  } catch (error) {
    console.error('[Pipeline/furniture] Error:', error)
    return NextResponse.json(
      { error: 'Furniture module failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
