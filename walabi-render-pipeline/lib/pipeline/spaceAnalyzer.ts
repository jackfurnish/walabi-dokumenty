import type { ProjectInput, RoomType, BudgetTier } from '@/lib/schemas/project'
import type { SpaceAnalysis } from '@/lib/schemas/pipeline'

// ============================================================
// Space Analyzer — Module A
// Deterministic, room-type-aware analysis
// Output tone: professional interior consultant, not AI assistant
// ============================================================

const ROOM_ISSUES: Record<RoomType, string[]> = {
  'hotel-room': [
    'Generic synthetic textile headboard dominates focal wall without visual weight',
    'Overhead ceiling fixture provides flat, shadow-free light — eliminates depth and warmth',
    'Laminate furniture surfaces reflect harshly, telegraphing low cost',
    'Bedside tables mismatched or undersized relative to bed scale',
    'Window treatment lacks layering — single roller blind removes all softness',
    'Exposed cable routing on bedside panel is visible in photography',
    'Minibar unit placement breaks the visual flow of the room',
  ],
  'boutique-suite': [
    'Sitting area lacks a defining anchor piece — reads as afterthought',
    'Ceiling height potential unexploited — no vertical elements draw the eye',
    'Multiple conflicting wood tones create visual noise',
    'Lack of intentional lighting zones — single source illuminates everything equally',
    'Bathroom threshold area visible and unresolved aesthetically',
    'Textile layering absent — single bedspread is insufficient for the tier',
    'Statement wall opportunity behind bed or sofa unused',
  ],
  'apartment-bedroom': [
    'Layout prioritises circulation over composition — furniture placed for convenience, not staging',
    'Storage solutions visible and non-decorative',
    'No considered colour story — walls and furniture in unrelated neutrals',
    'Bed headboard absent or too low — bed reads as mattress on frame',
    'Natural light source blocked partially by furniture placement',
    'Ceiling element (fan, basic fixture) diminishes perceived quality',
  ],
}

const ROOM_STRENGTHS: Record<RoomType, string[]> = {
  'hotel-room': [
    'Adequate floor area for a considered redesign',
    'Standard room proportions allow modular furniture placement',
    'Window provides usable natural light',
  ],
  'boutique-suite': [
    'Room footprint allows distinct zone separation',
    'Ceiling height above standard — supports pendant lighting',
    'Multiple walls suitable for feature treatment',
  ],
  'apartment-bedroom': [
    'Residential scale creates immediate warmth potential',
    'Wardrobe integration possible without structural change',
    'Natural light from window creates photography-friendly conditions',
  ],
}

const FOCAL_POINTS: Record<RoomType, string> = {
  'hotel-room':        'Bed wall — primary composition axis for guest photography',
  'boutique-suite':    'Seating area / feature wall visible from entry — first impression zone',
  'apartment-bedroom': 'Bed wall with natural light cross-reference — Instagram focal axis',
}

const LIGHTING_NOTES: Record<RoomType, string> = {
  'hotel-room':        'Single ceiling source creates flat, institutional quality. Warm bedside layering absent.',
  'boutique-suite':    'Overhead dominance. No ambient/accent separation. Pendant and floor lamp opportunities unused.',
  'apartment-bedroom': 'Reliant on single window and overhead. Evening atmosphere non-existent without intervention.',
}

const OPPORTUNITIES: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Replace textiles (bedding, cushions, curtains) to immediately shift perceived quality',
    'Introduce warm-toned bedside lighting to eliminate institutional feel',
    'Add one considered decor layer (tray, art print, plant) for photography depth',
    'Replace synthetic curtain panel with linen-textured drop for softer light quality',
  ],
  'medium-upgrade': [
    'Replace bed frame and headboard as primary focal element',
    'Introduce matching bedside tables at correct scale',
    'Upgrade lighting: bedside lamps + ceiling pendant or cove option',
    'Replace hard-surface minibar or desk unit with warm-material alternative',
    'Add layered textile programme: base layer, throw, accent cushions',
    'Introduce one artwork piece anchoring the bed wall composition',
  ],
  'premium-redesign': [
    'Custom WALABI bed frame and headboard as signature piece',
    'Full furniture programme: bed, bedside tables, desk, wardrobe surround',
    'Considered lighting design: ambient, task, accent across all zones',
    'Bespoke wardrobe or storage integration aligned with design language',
    'Full textile programme: bedding, curtains, cushions, throw, bathrobes',
    'Art direction: curated artwork, mirrors, objects — aligned with brand story',
    'Material upgrade on all visible surfaces: handles, fixtures, hooks',
  ],
}

export function runSpaceAnalyzer(input: ProjectInput): SpaceAnalysis {
  const issues = pickItems(ROOM_ISSUES[input.roomType], 4)
  const strengths = ROOM_STRENGTHS[input.roomType]
  const opportunities = OPPORTUNITIES[input.budgetTier]

  // Confidence varies slightly by room type and budget tier
  const baseConfidence = { 'hotel-room': 80, 'boutique-suite': 75, 'apartment-bedroom': 78 }
  const budgetModifier = { 'light-refresh': 5, 'medium-upgrade': 3, 'premium-redesign': 0 }
  const confidenceScore = baseConfidence[input.roomType] + budgetModifier[input.budgetTier]

  // Lighting quality: almost always average/poor in existing 3-4* rooms
  const lightingQuality = input.budgetTier === 'premium-redesign' ? 'average' : 'poor'

  const summary = buildSummary(input)

  return {
    roomType: input.roomType,
    detectedIssues: issues,
    focalPoint: FOCAL_POINTS[input.roomType],
    lightingQuality,
    lightingNotes: LIGHTING_NOTES[input.roomType],
    redesignOpportunities: opportunities,
    existingStrengths: strengths,
    confidenceScore,
    summary,
  }
}

function buildSummary(input: ProjectInput): string {
  const roomLabel = { 'hotel-room': 'standard hotel room', 'boutique-suite': 'boutique suite', 'apartment-bedroom': 'apartment bedroom' }[input.roomType]
  const budgetLabel = { 'light-refresh': 'targeted refresh', 'medium-upgrade': 'selective upgrade', 'premium-redesign': 'full concept redesign' }[input.budgetTier]

  return `This ${roomLabel} presents clear improvement potential through a ${budgetLabel}. The primary issues are concentrated in lighting quality, textile programme, and furniture material language — all addressable without structural intervention. The room's core proportions are workable; what's missing is considered curation and material discipline.`
}

function pickItems<T>(arr: T[], count: number): T[] {
  // Deterministic selection — not random, always consistent per room type
  return arr.slice(0, Math.min(count, arr.length))
}
