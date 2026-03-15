import Anthropic from '@anthropic-ai/sdk'

// ============================================================
// WALABI AI Provider
// Server-side only — never import in client components
// ============================================================

export interface CompletionOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  systemPrompt?: string
}

export interface ImageInput {
  base64: string
  mediaType: 'image/jpeg' | 'image/png' | 'image/webp'
}

export interface AIProvider {
  name: string
  complete(prompt: string, options?: CompletionOptions): Promise<string>
  completeWithImages?(
    prompt: string,
    images: ImageInput[],
    options?: CompletionOptions
  ): Promise<string>
}

// --- Anthropic (Claude) Provider ---

export class AnthropicProvider implements AIProvider {
  name = 'anthropic'
  private client: Anthropic
  private defaultModel: string

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
    // claude-3-haiku-20240307: ~1-2s per call — fits Vercel Hobby 10s limit
    // Switch to claude-sonnet-4-5 on Vercel Pro (300s limit)
    this.defaultModel = process.env.ANTHROPIC_MODEL ?? 'claude-3-haiku-20240307'
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    const message = await this.client.messages.create({
      model: options?.model ?? this.defaultModel,
      max_tokens: options?.maxTokens ?? 3000,
      system: options?.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    })
    const block = message.content[0]
    return block.type === 'text' ? block.text : ''
  }

  async completeWithImages(
    prompt: string,
    images: ImageInput[],
    options?: CompletionOptions
  ): Promise<string> {
    const imageBlocks = images.map((img) => ({
      type: 'image' as const,
      source: { type: 'base64' as const, media_type: img.mediaType, data: img.base64 },
    }))
    const message = await this.client.messages.create({
      model: options?.model ?? this.defaultModel,
      max_tokens: options?.maxTokens ?? 3000,
      system: options?.systemPrompt,
      messages: [
        {
          role: 'user',
          content: [...imageBlocks, { type: 'text' as const, text: prompt }],
        },
      ],
    })
    const block = message.content[0]
    return block.type === 'text' ? block.text : ''
  }
}

// --- Mock Provider (fallback when no API key) ---

export class MockAIProvider implements AIProvider {
  name = 'mock'
  async complete(): Promise<string> { return '' }
}

// --- Factory ---

export function createProvider(): AIProvider {
  if (process.env.ANTHROPIC_API_KEY) {
    return new AnthropicProvider()
  }
  return new MockAIProvider()
}
