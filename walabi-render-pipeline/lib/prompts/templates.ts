import type { ProjectInput } from '@/lib/schemas/project'
import type { SpaceAnalysis, RedesignStrategy, StyleDirection, FurnitureConcept } from '@/lib/schemas/pipeline'
import { getRoomTypeLabel, getStyleLabel, getBudgetTierLabel } from '@/constants/options'

// ============================================================
// Prompt Templates — each returns a user-turn prompt
// System prompts are in system.ts
// ============================================================

// --- A. Space Analyzer ---

export function spaceAnalyzerPrompt(input: ProjectInput, hasImage: boolean): string {
  const roomLabel   = getRoomTypeLabel(input.roomType)
  const styleTarget = getStyleLabel(input.style)
  const budgetLabel = getBudgetTierLabel(input.budgetTier)

  return `Odpowiedź MUSI być w języku polskim.

${hasImage ? 'Analyse the attached room photo.' : 'Analyse this hotel room type based on the parameters provided.'} The room is a ${roomLabel}. The target redesign style is ${styleTarget}. The budget tier is ${budgetLabel}.

Return ONLY this JSON structure — no additional text:

{
  "roomType": "${input.roomType}",
  "detectedIssues": ["string — specific visual issue visible in the room, max 5"],
  "focalPoint": "string — what draws the eye first in this room",
  "lightingQuality": "poor" | "average" | "good" | "excellent",
  "lightingNotes": "string — specific observation about light quality and sources",
  "redesignOpportunities": ["string — specific, actionable opportunity, max 6"],
  "existingStrengths": ["string — what already works, max 3"],
  "confidenceScore": number between 60-95,
  "summary": "string — 2–3 sentence executive summary for a hotel owner"
}

Rules:
- detectedIssues must be specific and visual, not generic ("synthetic headboard communicates budget" not "room looks cheap")
- redesignOpportunities must match the ${budgetLabel} scope — no structural work
- summary tone: senior consultant, not interior design magazine`
}

// --- B. Redesign Strategist ---

export function redesignStrategistPrompt(
  input: ProjectInput,
  spaceAnalysis: SpaceAnalysis
): string {
  return `Odpowiedź MUSI być w języku polskim.

Based on this space analysis, generate a redesign strategy.

SPACE ANALYSIS:
${JSON.stringify(spaceAnalysis, null, 2)}

PARAMETERS:
- Target style: ${getStyleLabel(input.style)}
- Budget tier: ${getBudgetTierLabel(input.budgetTier)}
- Room type: ${getRoomTypeLabel(input.roomType)}
${input.notes ? `- Client notes: ${input.notes}` : ''}

Return ONLY this JSON structure:

{
  "designDirection": "string — one sentence defining the design approach",
  "targetGuestEmotion": "string — what the guest should feel in the redesigned room",
  "furnitureRecommendations": [
    {
      "item": "string — specific furniture piece",
      "action": "keep" | "replace" | "add" | "remove",
      "reason": "string — one sentence commercial or design justification"
    }
  ],
  "lightingRecommendations": ["string — specific lighting change, max 3"],
  "textileRecommendations": ["string — specific textile specification, max 4"],
  "costEffortRatio": "low-cost-high-impact" | "medium-investment" | "premium-full-scope",
  "estimatedImpact": "string — one sentence quantified or qualified impact statement",
  "priorityActions": ["string — ordered action, most impactful first, max 5"],
  "summary": "string — 2–3 sentence strategy summary for client presentation"
}

Rules:
- furnitureRecommendations: 5–10 items, all proportionate to ${getBudgetTierLabel(input.budgetTier)}
- priorityActions ordered by ROI, not by project sequence
- No structural work, no electrical rewiring unless minimal`
}

// --- D. Furniture Concept (Style Director is deterministic — no AI prompt) ---

export function furnitureConceptPrompt(
  input: ProjectInput,
  strategy: RedesignStrategy,
  style: StyleDirection
): string {
  return `Odpowiedź MUSI być w języku polskim.

Generate a WALABI furniture concept for this hotel room redesign.

STYLE DIRECTION:
- Style family: ${style.styleFamily}
- Primary wood: ${style.materialPalette.wood}
- Primary textile: ${style.materialPalette.textile}
- Metal finish: ${style.materialPalette.metal}
- Color palette primary: ${style.colorPalette.primary}
- Mood: ${style.moodKeywords.join(', ')}

STRATEGY SUMMARY: ${strategy.summary}
DESIGN DIRECTION: ${strategy.designDirection}
BUDGET TIER: ${getBudgetTierLabel(input.budgetTier)}

Return ONLY this JSON structure:

{
  "heroPieces": [
    {
      "name": "string — WALABI product name, evocative but not gimmicky",
      "role": "hero",
      "material": "string — specific material and grade",
      "finish": "string — specific surface finish",
      "dimensions": "string — W×D cm × H cm",
      "notes": "string — design intent and hospitality-specific detail",
      "manufacturabilityNote": "string — WALABI production lead time and method"
    }
  ],
  "supportingPieces": [same structure, role: "supporting", 2-3 pieces],
  "accentPieces": [same structure, role: "accent", 1-2 pieces],
  "textiles": ["string — specific textile with fibre, colour, application"],
  "lighting": ["string — specific fixture with fitting, colour temperature, placement"],
  "practicalNotes": ["string — installation or hotel-operation practical note"],
  "walabiProductionNotes": "string — lead time, COM options, project delivery note"
}

Rules:
- heroPieces: 1 item only (the signature piece — bed frame or statement chair)
- supporting pieces must be scaled and proportioned relative to hero
- All dimensions realistic for a ${getRoomTypeLabel(input.roomType)}
- manufacturabilityNote must be honest about lead times (3–8 weeks typical)`
}

// --- E. Render Prompt Generator ---

export function renderPromptGeneratorPrompt(
  input: ProjectInput,
  strategy: RedesignStrategy,
  style: StyleDirection,
  furniture: FurnitureConcept
): string {
  const heroPiece = furniture.heroPieces[0]
  const roomLabel = getRoomTypeLabel(input.roomType)

  return `Odpowiedź MUSI być w języku polskim.

Write a production-ready render prompt for this WALABI hotel room redesign concept.

CONCEPT SUMMARY:
- Room: ${roomLabel}
- Style: ${style.styleFamily}
- Hero piece: ${heroPiece?.name ?? 'upholstered bed frame'}
- Material language: ${style.materialPalette.wood}, ${style.materialPalette.textile}, ${style.materialPalette.metal}
- Colour palette: ${style.colorPalette.primary}, ${style.colorPalette.secondary}, ${style.colorPalette.accent}
- Mood: ${style.moodKeywords.join(', ')}
- Design direction: ${strategy.designDirection}

Return ONLY this JSON structure:

{
  "masterPrompt": "string — complete render prompt, 80–140 words, no line breaks",
  "styleModifiers": ["string — short technical modifier, 5-6 items"],
  "lightingInstructions": "string — specific lighting setup for this concept",
  "cameraAngle": "string — specific camera position and lens equivalent",
  "negativePrompt": "string — comma-separated negative terms, 15-20 items",
  "technicalSpec": "string — Midjourney parameters e.g. --ar 16:9 --q 2 --s 650 --v 6",
  "promptVariants": [
    "string — golden hour variant (full prompt)",
    "string — evening/ambient light variant (full prompt)",
    "string — close-up material detail variant (full prompt)"
  ]
}

Rules:
- masterPrompt must read as architectural photography brief, not a fantasy description
- negativePrompt must explicitly exclude: cartoon, generic hotel, chrome fixtures, over-saturated, corporate
- promptVariants are complete standalone prompts, not fragments`
}

// --- F. Investor Summary ---

export function investorSummaryPrompt(
  input: ProjectInput,
  spaceAnalysis: SpaceAnalysis,
  strategy: RedesignStrategy,
  style: StyleDirection,
  furniture: FurnitureConcept
): string {
  return `Odpowiedź MUSI być w języku polskim.

Write an investor and hotel GM summary for this WALABI redesign concept.

PROJECT PARAMETERS:
- Room: ${getRoomTypeLabel(input.roomType)}
- Style: ${style.styleFamily}
- Budget tier: ${getBudgetTierLabel(input.budgetTier)}
- Key issue: ${spaceAnalysis.detectedIssues[0] ?? 'standard 3-star visual quality'}
- Design direction: ${strategy.designDirection}
- Estimated impact: ${strategy.estimatedImpact}
- Hero furniture: ${furniture.heroPieces[0]?.name ?? 'custom bed frame'}
${input.notes ? `- Client context: ${input.notes}` : ''}

Return ONLY this JSON structure:

{
  "conceptTitle": "string — evocative concept name, 4–6 words",
  "elevatorPitch": "string — 2 sentences max, what changes and why it matters commercially",
  "designNarrative": "string — 3–4 sentences, the design story for a presentation",
  "businessImpact": "string — 3–4 sentences, specific commercial outcomes (ADR, reviews, competitive position)",
  "proposedScope": ["string — specific deliverable, 4–6 items"],
  "estimatedTimeline": "string — realistic timeline from order to completed room",
  "guestPerceptionUpgrade": "string — 2 sentences, how guests will experience the change",
  "walabiRoleStatement": "string — 2 sentences, WALABI's specific role in this project",
  "callToAction": "string — 1 sentence, next step for the hotel owner"
}

Rules:
- businessImpact: reference ADR uplift, review score improvement, or competitive differentiation — be specific
- No interior design clichés ("timeless", "elegant", "luxurious") — use commercial language
- walabiRoleStatement: positions WALABI as a capable partner, not just a furniture supplier
- callToAction: practical, low-commitment next step (consultation, survey, quote)`
}
