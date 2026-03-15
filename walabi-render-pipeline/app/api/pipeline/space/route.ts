import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

import { z } from 'zod'
import { createProvider, type ImageInput } from '@/lib/ai/provider'
import { ProjectInputSchema } from '@/lib/schemas/project'
import { runSpaceAnalyzer } from '@/lib/pipeline/spaceAnalyzer'
import { spaceAnalyzerPrompt } from '@/lib/prompts/templates'
import { SPACE_ANALYZER_SYSTEM } from '@/lib/prompts/system'
import { parseAIResponse } from '@/lib/pipeline/parseAIResponse'
import type { SpaceAnalysis } from '@/lib/schemas/pipeline'

const RequestSchema = z.object({
  input: ProjectInputSchema,
})

// ============================================================
// POST /api/pipeline/space — SpaceAnalyzer module
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

    let output: SpaceAnalysis

    if (useAI) {
      const prompt = spaceAnalyzerPrompt(input, images.length > 0)
      let raw: string

      if (images.length > 0 && provider.completeWithImages) {
        raw = await provider.completeWithImages(prompt, images, {
          systemPrompt: SPACE_ANALYZER_SYSTEM,
          maxTokens: 1200,
        })
      } else {
        raw = await provider.complete(prompt, {
          systemPrompt: SPACE_ANALYZER_SYSTEM,
          maxTokens: 1200,
        })
      }
      output = parseAIResponse(raw, () => runSpaceAnalyzer(input))
    } else {
      output = runSpaceAnalyzer(input)
    }

    return NextResponse.json({ output, provider: provider.name })

  } catch (error) {
    console.error('[Pipeline/space] Error:', error)
    return NextResponse.json(
      { error: 'Space module failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
