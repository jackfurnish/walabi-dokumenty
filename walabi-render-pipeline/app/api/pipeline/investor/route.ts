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
import { runInvestorSummary } from '@/lib/pipeline/investorSummary'
import { investorSummaryPrompt } from '@/lib/prompts/templates'
import { INVESTOR_SUMMARY_SYSTEM } from '@/lib/prompts/system'
import { parseAIResponse } from '@/lib/pipeline/parseAIResponse'
import type { InvestorSummary } from '@/lib/schemas/pipeline'

const RequestSchema = z.object({
  input: ProjectInputSchema,
  spaceAnalysis: SpaceAnalysisSchema,
  redesignStrategy: RedesignStrategySchema,
  styleDirection: StyleDirectionSchema,
  furnitureConcept: FurnitureConceptSchema,
})

// ============================================================
// POST /api/pipeline/investor — InvestorSummary module
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept } = RequestSchema.parse(body)

    const provider = createProvider()
    const useAI = provider.name === 'anthropic'

    let output: InvestorSummary

    if (useAI) {
      const prompt = investorSummaryPrompt(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
      const raw = await provider.complete(prompt, {
        systemPrompt: INVESTOR_SUMMARY_SYSTEM,
        maxTokens: 1200,
      })
      output = parseAIResponse(raw, () => runInvestorSummary(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept))
    } else {
      output = runInvestorSummary(input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
    }

    return NextResponse.json({ output, provider: provider.name })

  } catch (error) {
    console.error('[Pipeline/investor] Error:', error)
    return NextResponse.json(
      { error: 'Investor module failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
