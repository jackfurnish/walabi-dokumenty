import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const hasKey = !!process.env.ANTHROPIC_API_KEY
  const keyPreview = hasKey
    ? `${process.env.ANTHROPIC_API_KEY!.slice(0, 12)}...`
    : 'NOT SET'

  return NextResponse.json({
    provider: hasKey ? 'anthropic' : 'mock',
    keyConfigured: hasKey,
    keyPreview,
    model: process.env.ANTHROPIC_MODEL ?? 'claude-opus-4-6 (default)',
  })
}
