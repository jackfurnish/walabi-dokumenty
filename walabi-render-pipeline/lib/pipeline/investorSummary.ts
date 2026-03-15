import type { ProjectInput, BudgetTier, DesignStyle, RoomType } from '@/lib/schemas/project'
import type {
  SpaceAnalysis,
  RedesignStrategy,
  StyleDirection,
  FurnitureConcept,
  InvestorSummary,
} from '@/lib/schemas/pipeline'
import { getRoomTypeLabel, getStyleLabel, getBudgetTierLabel } from '@/constants/options'

// ============================================================
// Investor Summary Generator — Module F
// Commercial narrative for hotel owners, investors, GMs
// Tone: senior consultant presenting to board — not a brochure
// ============================================================

const CONCEPT_TITLES: Record<DesignStyle, Record<RoomType, string>> = {
  'organic-modern': {
    'hotel-room':        'The Grounded Room — Organic Material Upgrade',
    'boutique-suite':    'The Living Suite — Organic Modern Transformation',
    'apartment-bedroom': 'The Warm Apartment — Organic Residential Upgrade',
  },
  'arhaus-luxury': {
    'hotel-room':        'The Considered Room — Layered Luxury Upgrade',
    'boutique-suite':    'The Grand Suite — American Craft Luxury Redesign',
    'apartment-bedroom': 'The Generous Bedroom — Layered Material Programme',
  },
  'japandi-hospitality': {
    'hotel-room':        'The Quiet Room — Japandi Material Discipline',
    'boutique-suite':    'The Still Suite — Japandi Hospitality Concept',
    'apartment-bedroom': 'The Considered Bedroom — Disciplined Material Calm',
  },
  'boutique-warm-minimalism': {
    'hotel-room':        'The Clean Room — Warm Minimal Upgrade',
    'boutique-suite':    'The Boutique Suite — Warm Minimalism Redesign',
    'apartment-bedroom': 'The Edit — Boutique Warm Minimalism Programme',
  },
}

const ELEVATOR_PITCHES: Record<BudgetTier, (style: string, room: string) => string> = {
  'light-refresh': (style, room) =>
    `A targeted ${style} refresh transforms this ${room} from standard-issue to review-worthy — through textile quality, lighting warmth, and considered styling — without any tradespeople, structural change, or extended room closure.`,

  'medium-upgrade': (style, room) =>
    `A selective ${style} furniture upgrade replaces the primary pieces communicating budget category in this ${room}, delivering a visible tier shift that guests recognise immediately — and photograph.`,

  'premium-redesign': (style, room) =>
    `A full ${style} redesign by WALABI converts this ${room} into a brand differentiator: custom-manufactured furniture, considered lighting design, and a complete material programme that sets the property apart from every competitor in its category.`,
}

const DESIGN_NARRATIVES: Record<DesignStyle, string> = {
  'organic-modern':
    'The redesign introduces natural material warmth as its primary language: white oak, linen, stoneware, and travertine replace the synthetic surfaces that currently communicate cost rather than care. The result is a room that feels as though it was assembled by someone with taste — not by a procurement team with a budget ceiling.',

  'arhaus-luxury':
    'The concept draws on the American craft furniture tradition: deep wood tones, plush upholstery, layered textiles, and brass details build a room that communicates investment without appearing showy. The guest understands the tier before reading the room card.',

  'japandi-hospitality':
    'The redesign applies material precision as its primary tool: each element present has earned its place, and each element absent was deliberately removed. The result is a room where guests feel the quality through the absence of compromise — the linen has weight, the wood has grain, the surfaces have texture.',

  'boutique-warm-minimalism':
    'The concept creates a commercially legible premium — warm, clean, and genuinely comfortable, without the labour of extreme minimalism or the cost of full luxury. This is the style most likely to generate strong photography, high review scores, and repeat bookings across a broad guest demographic.',
}

const BUSINESS_IMPACTS: Record<BudgetTier, string> = {
  'light-refresh':
    'At light refresh investment, the primary business return is photographic: improved room imagery on Booking.com, TripAdvisor, and the hotel\'s own website drives conversion from browse to book. Secondary impact is guest perception at check-in — the room exceeds expectation rather than confirming it. Expected review score improvement: 0.2–0.4 stars within 60 days of completion.',

  'medium-upgrade':
    'A medium upgrade delivers tier reclassification in practice, if not in official category. Guests who book a 3★ room and encounter a 4★ space produce disproportionately positive reviews — and the hotel can begin to price accordingly. Booking platforms reward improved photography with improved search ranking. Expected ADR (average daily rate) opportunity: +8–15% depending on market. Payback period at 70% occupancy: typically 14–22 months.',

  'premium-redesign':
    'A premium WALABI redesign creates a revenue asset: rooms at the new standard command a meaningful rate premium, attract media attention, support F&B and spa upsell, and provide the photography foundation for a brand repositioning. In portfolio hotels, a flagship redesigned room becomes the reference point that raises the perceived bar for the entire property. Expected ADR opportunity: +20–35% for the redesigned category. The investment is not a cost — it is a margin improvement programme.',
}

const PROPOSED_SCOPES: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Bedside lamp pair replacement (matched, warm-toned)',
    'Full bedding programme: linen or cotton base, throw, cushions',
    'Window treatment: sheer drop panel replacing existing roller blind',
    'Bedside and surface styling: tray, ceramic object, considered accessories',
    'Ceiling bulb replacement: 2700K warm white throughout',
  ],
  'medium-upgrade': [
    'Bed frame and upholstered headboard: new statement piece',
    'Matched bedside table pair at correct scale',
    'Ceiling pendant fixture and dimmer installation',
    'Bedside lamp pair aligned with new style palette',
    'Desk and desk chair replacement',
    'Full textile programme: bedding, curtains, throw, cushions',
    'One artwork piece for bed wall',
  ],
  'premium-redesign': [
    'Custom WALABI bed frame and headboard — bespoke manufacture',
    'Full furniture programme: bed, bedside tables, desk zone, wardrobe surround',
    'Lighting design and installation: ambient, task, accent',
    'Wardrobe surround and storage joinery in programme finish',
    'Complete textile programme: bedding, curtains, bath textiles',
    'Art and object programme: curated selection aligned with brand story',
    'Hardware replacement: all visible fittings in consistent palette',
    'WALABI project management: specification, production, delivery, installation, handover',
  ],
}

const TIMELINES: Record<BudgetTier, string> = {
  'light-refresh':    '5–7 business days from order. No room closure required — accessories delivered and styled in under 3 hours.',
  'medium-upgrade':   '4–6 weeks production lead time. Room closure: 1–2 days for furniture delivery and installation.',
  'premium-redesign': '6–10 weeks from confirmed specification. Room closure: 3–5 days for full installation programme. WALABI project manager on site throughout.',
}

const PERCEPTION_UPGRADES: Record<DesignStyle, string> = {
  'organic-modern':
    'Guests report the room as "different from other hotels" — they notice the material quality, photograph it, and share it. The room begins generating its own marketing.',

  'arhaus-luxury':
    'Guests feel the investment without being told about it. The weight of the upholstery, the finish of the wood, the quality of the bedding — these register subconsciously and produce the review score you cannot buy with a better TV.',

  'japandi-hospitality':
    'Guests seeking premium quietness — a growing and high-value demographic — recognise the design language immediately. They extend stays, return, and recommend to peers who share the same preference for material quality over decorative noise.',

  'boutique-warm-minimalism':
    'The room photographs clean, reads as premium, and feels genuinely comfortable. This combination — rare in the 3–4★ market — drives both online conversion and in-person satisfaction.',
}

const WALABI_ROLE_STATEMENTS: Record<BudgetTier, string> = {
  'light-refresh':
    'WALABI supplies, coordinates, and delivers the complete accessories and textile programme. Single point of contact for sourcing, quality control, and delivery logistics.',

  'medium-upgrade':
    'WALABI specifies, sources, and delivers the furniture programme with production coordination. WALABI acts as the hotel\'s design and procurement partner — removing the complexity of managing multiple suppliers.',

  'premium-redesign':
    'WALABI designs, manufactures, and installs the complete room programme. From initial specification through production, delivery, and site installation — one partner, one responsibility. This is not a furniture supplier relationship; it is a project delivery relationship.',
}

const CTAS: Record<BudgetTier, string> = {
  'light-refresh':
    'Contact WALABI to confirm product selection, receive a finalised quote, and schedule delivery. Turnaround from first call to completed room: under two weeks.',

  'medium-upgrade':
    'Contact WALABI to begin specification. A brief on-site survey (half day) confirms dimensions and installation requirements. Production begins upon deposit confirmation.',

  'premium-redesign':
    'Schedule an initial consultation with WALABI\'s design team. We present a full specification proposal within five business days of site visit. Production begins upon client approval — no assumptions, no surprises.',
}

export function runInvestorSummary(
  input: ProjectInput,
  spaceAnalysis: SpaceAnalysis,
  strategy: RedesignStrategy,
  style: StyleDirection,
  furniture: FurnitureConcept
): InvestorSummary {
  const styleLabel  = getStyleLabel(input.style)
  const roomLabel   = getRoomTypeLabel(input.roomType).toLowerCase()
  const budgetLabel = getBudgetTierLabel(input.budgetTier)

  return {
    conceptTitle:          CONCEPT_TITLES[input.style][input.roomType],
    elevatorPitch:         ELEVATOR_PITCHES[input.budgetTier](styleLabel, roomLabel),
    designNarrative:       DESIGN_NARRATIVES[input.style],
    businessImpact:        BUSINESS_IMPACTS[input.budgetTier],
    proposedScope:         PROPOSED_SCOPES[input.budgetTier],
    estimatedTimeline:     TIMELINES[input.budgetTier],
    guestPerceptionUpgrade: PERCEPTION_UPGRADES[input.style],
    walabiRoleStatement:   WALABI_ROLE_STATEMENTS[input.budgetTier],
    callToAction:          CTAS[input.budgetTier],
  }
}
