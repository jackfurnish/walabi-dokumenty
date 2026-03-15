import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

import { z } from 'zod'
import { createProvider } from '@/lib/ai/provider'
import { ProjectInputSchema } from '@/lib/schemas/project'
import { runStyleDirector } from '@/lib/pipeline/styleDirector'

const RequestSchema = z.object({
  input: ProjectInputSchema,
})

// ============================================================
// POST /api/pipeline/style — StyleDirector module (deterministic, no AI)
// Brand consistency requires deterministic output.
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { input } = RequestSchema.parse(body)

    const provider = createProvider()

    // Always deterministic — brand consistency
    const output = runStyleDirector(input)

    return NextResponse.json({ output, provider: provider.name })

  } catch (error) {
    console.error('[Pipeline/style] Error:', error)
    return NextResponse.json(
      { error: 'Style module failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
