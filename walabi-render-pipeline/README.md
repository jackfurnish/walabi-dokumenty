# WALABI Render Pipeline

**Commercial pre-sales tool for WALABI — bespoke furniture and hospitality interiors.**

Transforms an existing hotel room photo into a complete redesign concept package:
space analysis → redesign strategy → furniture concept → render master prompt → investor summary.

---

## What it does

A hotel owner, GM, or investor uploads one photo of an existing 3–4★ room.
They select room type, target style, and budget tier.
The pipeline generates a structured, presentation-ready package in under 60 seconds:

- **Space Analysis** — visual issues, focal points, lighting quality, redesign opportunities
- **Redesign Strategy** — what to keep, replace, or add; priority action sequence
- **Style Direction** — WALABI's full design language: palettes, materials, rules, forbidden patterns
- **Furniture Concept** — named WALABI pieces with real dimensions, materials, finishes
- **Render Master Prompt** — production-ready prompt for Midjourney, DALL·E 3, SD XL
- **Investor Summary** — business impact narrative, ADR potential, WALABI role statement

All output can be copied or exported as a clean Markdown document.

---

## Why it exists

WALABI sells bespoke furniture and complete interior programmes to hotels.
The sales cycle requires demonstrating what a room *could* look like — quickly, credibly, and without a full design brief.

This tool compresses the initial concept phase from days to minutes, giving WALABI's sales team:
- A structured conversation starter for every hotel prospect
- Presentation-ready materials for investor and GM meetings
- A consistent design vocabulary across all projects

---

## Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Next.js 15 (App Router)             |
| Language      | TypeScript (strict)                 |
| Styling       | Tailwind CSS 3 + custom design tokens |
| Components    | Radix UI primitives + custom        |
| Forms         | React Hook Form + Zod validation    |
| State         | Zustand with localStorage persist   |
| Animation     | Framer Motion                       |
| Icons         | Lucide React                        |
| Fonts         | Playfair Display + Inter (Google Fonts) |

No database. No authentication. No external API calls in MVP.
All data persists in browser localStorage.

---

## Local setup

```bash
# 1. Navigate to project
cd walabi-render-pipeline

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

**Requirements:** Node.js 18+, npm 9+

---

## Architecture overview

```
walabi-render-pipeline/
│
├── app/                        Next.js App Router pages
│   ├── page.tsx                Landing page
│   ├── new/page.tsx            New project wizard (5 steps)
│   ├── projects/page.tsx       Project library
│   └── project/[id]/page.tsx  Results workspace
│
├── components/
│   ├── layout/                 Header, Footer, PageWrapper
│   ├── forms/                  NewProjectForm, ImageUpload, OptionSelector
│   ├── project/                ResultsWorkspace + 6 section components
│   └── ui/                     Button, Card, CollapsibleSection, CopyButton, etc.
│
├── lib/
│   ├── pipeline/               6 pipeline modules (the core business logic)
│   │   ├── spaceAnalyzer.ts
│   │   ├── redesignStrategist.ts
│   │   ├── styleDirector.ts
│   │   ├── furnitureConcept.ts
│   │   ├── renderPromptGenerator.ts
│   │   └── investorSummary.ts
│   ├── ai/provider.ts          AI provider interface (mock + future adapters)
│   ├── schemas/                Zod schemas for all data structures
│   └── utils/                  cn, helpers, markdown export
│
├── domain/services/
│   └── pipelineService.ts      Orchestrator hook — runs modules in sequence
│
├── store/
│   └── projectStore.ts         Zustand store with localStorage persistence
│
└── constants/
    └── options.ts              Room types, styles, budget tiers
```

### Data flow

```
User fills form
    ↓
ProjectRecord created (status: idle) → saved to localStorage
    ↓
Navigate to /project/[id]
    ↓
usePipeline hook triggers on mount
    ↓
6 modules run in sequence with status updates
    ↓
PipelineOutput saved to project → status: complete
    ↓
ResultsWorkspace renders all 6 sections
```

---

## Connecting real AI providers

The pipeline currently runs deterministic mock logic.
To connect a real AI provider, two changes are needed:

### 1. Implement the provider interface

```typescript
// lib/ai/provider.ts
export class AnthropicProvider implements AIProvider {
  name = 'anthropic'
  private client: Anthropic

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey })
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    const message = await this.client.messages.create({
      model: options?.model ?? 'claude-opus-4-5',
      max_tokens: options?.maxTokens ?? 2000,
      system: options?.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    })
    return message.content[0].type === 'text' ? message.content[0].text : ''
  }
}
```

### 2. Update pipeline modules to call the provider

Each module in `lib/pipeline/` currently returns a deterministic object.
Replace the return statement with a call to `provider.complete(prompt)` and parse the JSON response:

```typescript
// Example: spaceAnalyzer.ts with real AI
import { defaultProvider } from '@/lib/ai/provider'
import { SpaceAnalysisSchema } from '@/lib/schemas/pipeline'

export async function runSpaceAnalyzer(input: ProjectInput): Promise<SpaceAnalysis> {
  const prompt = buildSpaceAnalysisPrompt(input) // from lib/prompts/templates.ts
  const raw = await defaultProvider.complete(prompt, {
    systemPrompt: SPACE_ANALYZER_SYSTEM_PROMPT,
    temperature: 0.3,
  })
  return SpaceAnalysisSchema.parse(JSON.parse(raw))
}
```

The Zod schemas in `lib/schemas/pipeline.ts` validate and type the AI response —
no changes needed to components or the orchestrator.

### 3. Image analysis (future)

For actual room photo analysis, replace `imageDataUrl` processing with a vision API call:

```typescript
// OpenAI vision
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'image_url', image_url: { url: input.imageDataUrl } },
      { type: 'text', text: SPACE_ANALYSIS_PROMPT }
    ]
  }]
})
```

---

## Design system

**Fonts:** Playfair Display (headings) + Inter (body)
**Palette:** warm neutrals — `#faf9f7` background, stone/walabi custom scale
**Tone:** boutique interior consultancy, not a SaaS startup

Key CSS utility classes defined in `globals.css`:
- `.label-overline` — section labels, all-caps tracking
- `.card-premium` — white card with stone border
- `.tag-neutral / .tag-accent / .tag-success` — inline badges

---

## MVP scope

This tool covers one use case only:
**Redesigning 3–4★ hotel rooms without structural renovation.**

Not included in MVP (intentionally):
- User authentication
- Payments or billing
- Team collaboration
- Real image generation
- AI chat or iterative feedback loop
- Multi-property management

These may follow in future versions if the tool proves its value in sales conversations.

---

*WALABI — Bespoke Furniture & Hospitality Interiors*
*Render Pipeline MVP v0.1 — March 2026*
