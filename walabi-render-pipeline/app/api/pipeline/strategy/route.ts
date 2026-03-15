import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

import { z } from 'zod'
import { createProvider } from '@/lib/ai/provider'
import { ProjectInputSchema } from '@/lib/schemas/project'
import { SpaceAnalysisSchema } from '@/lib/schemas/pipeline'
import { runRedesignStrategist } from '@/lib/pipeline/redesignStrategist'
import { redesignStrategistPrompt } from '@/lib/prompts/templates'
import { REDESIGN_STRATEGIST_SYSTEM } from '@/lib/prompts/system'
import { parseAIResponse } from '@/lib/pipeline/parseAIResponse'
import type { RedesignStrategy } from '@/lib/schemas/pipeline'

const RequestSchema = z.object({
  input: ProjectInputSchema,
  spaceAnalysis: SpaceAnalysisSchema,
})

// ============================================================
// POST /api/pipeline/strategy — RedesignStrategist module
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { input, spaceAnalysis } = RequestSchema.parse(body)

    const provider = createProvider()
    const useAI = provider.name === 'anthropic'

    let output: RedesignStrategy

    if (useAI) {
      const prompt = redesignStrategistPrompt(input, spaceAnalysis)
      const raw = await provider.complete(prompt, {
        systemPrompt: REDESIGN_STRATEGIST_SYSTEM,
        maxTokens: 1200,
      })
      output = parseAIResponse(raw, () => runRedesignStrategist(input, spaceAnalysis))
    } else {
      output = runRedesignStrategist(input, spaceAnalysis)
    }

    return NextResponse.json({ output, provider: provider.name })

  } catch (error) {
    console.error('[Pipeline/strategy] Error:', error)
    return NextResponse.json(
      { error: 'Strategy module failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
