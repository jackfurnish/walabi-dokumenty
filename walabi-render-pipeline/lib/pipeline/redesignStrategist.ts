import type { ProjectInput, BudgetTier, DesignStyle } from '@/lib/schemas/project'
import type { SpaceAnalysis, RedesignStrategy, FurnitureRecommendation } from '@/lib/schemas/pipeline'

// ============================================================
// Redesign Strategist — Module B
// Budget-driven, style-aware strategy
// Tone: senior interior project manager
// ============================================================

const DESIGN_DIRECTIONS: Record<DesignStyle, string> = {
  'organic-modern':            'Grounded warmth — introduce natural materials and organic form to create a room that feels genuinely lived-in and premium, not assembled from a catalogue.',
  'arhaus-luxury':             'Layered American luxury — deep woods, plush upholstery, and brass accents build a room that communicates investment without appearing ostentatious.',
  'japandi-hospitality':       'Disciplined calm — precise material choices and restrained form language create a space where every element earns its presence.',
  'boutique-warm-minimalism':  'Edited comfort — a minimal framework with warm material moments: the room should feel like a considered retreat, not a neutral void.',
}

const GUEST_EMOTIONS: Record<DesignStyle, string> = {
  'organic-modern':           'Rested, grounded, away from corporate sterility',
  'arhaus-luxury':            'Pampered, impressed, willingness to extend the stay',
  'japandi-hospitality':      'Calm, focused, grateful for the quiet quality',
  'boutique-warm-minimalism': 'At ease, cosy without clutter, quietly pleased',
}

const LIGHTING_RECS: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Replace ceiling fixture bulbs with warm white (2700K) immediately',
    'Introduce matching bedside table lamps with warm-toned shades',
    'Add a simple reading lamp or wall bracket if bedside space allows',
  ],
  'medium-upgrade': [
    'Replace ceiling fixture with a considered pendant or flush mount aligned with style',
    'Specify bedside lamps as a matched pair — correct scale to the new bed',
    'Add dimmer functionality to the main circuit',
    'Consider cove or strip lighting behind headboard for ambient wash',
  ],
  'premium-redesign': [
    'Full lighting design: ambient (cove/pendant), task (desk, reading), accent (artwork spot)',
    'Specify warm LED strip for headboard cove — dimmable to 10%',
    'Floor lamp in seating or reading zone',
    'Replace all switches and sockets with premium finish aligned with hardware palette',
  ],
}

const TEXTILE_RECS: Record<DesignStyle, string[]> = {
  'organic-modern': [
    'Natural linen bedding in warm white or oat — not hotel-white',
    'Textured throw at foot of bed: waffle-weave cotton or chunky knit',
    'Sheer curtain layer added behind existing blind for softened light quality',
    'Two accent cushions in complementary earthy tone',
  ],
  'arhaus-luxury': [
    'High thread-count cotton bedding with contrast piping — deep ivory or champagne',
    'Velvet or matelassé throw in warm cognac or forest tone',
    'Full-length lined curtains with weighted hem — replacing synthetic roller',
    'Three cushion set with mix of textures: velvet, woven, solid',
  ],
  'japandi-hospitality': [
    'Stone-washed linen bedding — no pattern, no bright white',
    'Single slim throw in muted sage or warm clay',
    'Linen-look pinch-pleat curtains to ceiling — maximum height illusion',
    'One cushion accent only — material interest over quantity',
  ],
  'boutique-warm-minimalism': [
    'Cotton percale bedding in warm cream — smooth and fresh',
    'Cotton knit or light wool throw — folded precisely at foot',
    'Sheer + block-out double curtain system for light control flexibility',
    'Two cushions maximum — solid tones, quality fabric',
  ],
}

type FurnitureRecsMap = Record<BudgetTier, FurnitureRecommendation[]>

const FURNITURE_RECS: FurnitureRecsMap = {
  'light-refresh': [
    { item: 'Bed frame', action: 'keep', reason: 'Structurally sound; headboard textile upgrade sufficient at this tier' },
    { item: 'Headboard cover / textile pad', action: 'replace', reason: 'Primary focal element — new upholstered panel dramatically changes first impression' },
    { item: 'Bedside lamps', action: 'replace', reason: 'Current fixtures are lowest-cost hotel standard; lamp pair is highest-ROI light swap' },
    { item: 'Bedding set', action: 'replace', reason: 'Immediate quality signal to guests — current synthetic visible in photos' },
    { item: 'Ceiling fixture', action: 'keep', reason: 'Not critical at this tier; bulb swap to 2700K delivers improvement without electrician' },
    { item: 'Decorative tray + objects', action: 'add', reason: 'Bedside styling depth for photography — currently bare' },
    { item: 'Window curtain panel', action: 'replace', reason: 'Current roller blind is institutional; sheer drop panel adds softness at low cost' },
  ],
  'medium-upgrade': [
    { item: 'Bed frame + headboard', action: 'replace', reason: 'Central statement — current piece communicates budget category immediately' },
    { item: 'Bedside tables', action: 'replace', reason: 'Existing are undersized and mismatched; correct-scale pair needed for new bed' },
    { item: 'Bedside lamps', action: 'replace', reason: 'Replace as matched pair aligned with new furniture style' },
    { item: 'Desk / work surface', action: 'replace', reason: 'Laminate surface inconsistent with upgraded room material language' },
    { item: 'Desk chair', action: 'replace', reason: 'Standard hotel chair undermines upgraded desk; simple upholstered option needed' },
    { item: 'Ceiling fixture', action: 'replace', reason: 'Pendant or quality flush mount anchors the upgraded palette' },
    { item: 'Minibar / shelf unit', action: 'keep', reason: 'Functional requirement; restyle surface with objects at this tier' },
    { item: 'Full textile programme', action: 'add', reason: 'Bedding, curtains, throw, cushions — complete the visual upgrade' },
    { item: 'Artwork — one piece', action: 'add', reason: 'Bed wall anchor; prevents freshly upgraded room from feeling bare' },
  ],
  'premium-redesign': [
    { item: 'Bed frame — custom WALABI', action: 'replace', reason: 'Signature hero piece; custom dimensions and upholstery to match brief' },
    { item: 'Bedside tables — matched pair', action: 'replace', reason: 'Custom or curated pieces coordinated with bed design language' },
    { item: 'Wardrobe surround / panel', action: 'replace', reason: 'Existing laminate finish incompatible with premium palette; veneer or lacquer replacement' },
    { item: 'Desk + storage unit', action: 'replace', reason: 'Full desk zone redesign: surface, shelf, cable management integrated' },
    { item: 'Desk chair', action: 'replace', reason: 'Quality upholstered piece — visible in room photography' },
    { item: 'All lighting fixtures', action: 'replace', reason: 'Full lighting design: pendant, bedside, desk, accent' },
    { item: 'Minibar unit', action: 'replace', reason: 'Integrate or rehouse in custom joinery — remove institutional appliance from view' },
    { item: 'Full textile programme', action: 'add', reason: 'Premium bedding, lined curtains, throw, cushion set, bath textiles' },
    { item: 'Art + object programme', action: 'add', reason: 'Curated artwork, mirror, statement objects — hotel brand story layer' },
    { item: 'All hardware', action: 'replace', reason: 'Door handles, coat hooks, bathroom fittings — detail alignment critical at this tier' },
  ],
}

const COST_RATIOS: Record<BudgetTier, RedesignStrategy['costEffortRatio']> = {
  'light-refresh':  'low-cost-high-impact',
  'medium-upgrade': 'medium-investment',
  'premium-redesign': 'premium-full-scope',
}

const IMPACT_STATEMENTS: Record<BudgetTier, string> = {
  'light-refresh':    'Significant improvement in online photography quality and perceived room tier — achievable without any tradespeople on site.',
  'medium-upgrade':   'Visible tier upgrade in Booking.com and TripAdvisor guest photography. Room should read as a genuine 4★ rather than aspirational 3★.',
  'premium-redesign': 'Transformational — room becomes a brand asset and revenue driver. Custom WALABI pieces differentiate the property from competing hotels in the category.',
}

const PRIORITY_ACTIONS: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Order bedside lamp pair (matched) — install immediately without electrician',
    'Replace bedding set with natural-fibre alternative in warm white',
    'Swap ceiling bulbs to 2700K warm white (same fitting, no cost)',
    'Add linen-textured curtain drop over existing blind',
    'Style bedside tray with 2–3 considered objects for photography',
  ],
  'medium-upgrade': [
    'Specify and order custom or curated bed frame + headboard — longest lead time item',
    'Select matched bedside table pair at correct scale to new bed',
    'Commission ceiling pendant or quality flush mount',
    'Order full textile programme coordinated with new palette',
    'Source one artwork piece for bed wall before photography',
    'Replace desk and task chair to complete material consistency',
  ],
  'premium-redesign': [
    'Commission WALABI custom bed frame — agree dimensions, material, finish',
    'Complete furniture programme specification before any orders placed',
    'Finalise lighting design with qualified designer — permit if cove work required',
    'Brief textile consultant or source full programme through WALABI network',
    'Art direction brief: agree artwork programme and installation plan',
    'Schedule installation sequence: lighting first, furniture, textiles, objects',
  ],
}

export function runRedesignStrategist(
  input: ProjectInput,
  spaceAnalysis: SpaceAnalysis
): RedesignStrategy {
  return {
    designDirection:          DESIGN_DIRECTIONS[input.style],
    targetGuestEmotion:       GUEST_EMOTIONS[input.style],
    furnitureRecommendations: FURNITURE_RECS[input.budgetTier],
    lightingRecommendations:  LIGHTING_RECS[input.budgetTier],
    textileRecommendations:   TEXTILE_RECS[input.style],
    costEffortRatio:          COST_RATIOS[input.budgetTier],
    estimatedImpact:          IMPACT_STATEMENTS[input.budgetTier],
    priorityActions:          PRIORITY_ACTIONS[input.budgetTier],
    summary:                  buildStrategySummary(input),
  }
}

function buildStrategySummary(input: ProjectInput): string {
  const styleNote: Record<string, string> = {
    'organic-modern':           'natural material warmth and organic form',
    'arhaus-luxury':            'layered luxury and material depth',
    'japandi-hospitality':      'material precision and disciplined calm',
    'boutique-warm-minimalism': 'edited comfort and warm restraint',
  }
  const budgetFrame: Record<string, string> = {
    'light-refresh':    'Within a light refresh budget, the strategy concentrates investment on the three highest-ROI touchpoints: lighting warmth, textile quality, and one focal statement element.',
    'medium-upgrade':   'A medium upgrade allows a fundamental shift in the room\'s furniture language — replacing the primary pieces that currently communicate budget category.',
    'premium-redesign': 'A premium redesign commissions WALABI\'s full capability: custom furniture, considered lighting design, and a complete material programme — delivering a room that becomes a brand differentiator.',
  }

  return `${budgetFrame[input.budgetTier]} The design direction leans into ${styleNote[input.style]}, with every decision serving the goal of improving guest perception and room photography quality.`
}
