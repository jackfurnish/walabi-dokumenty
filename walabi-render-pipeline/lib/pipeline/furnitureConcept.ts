import type { ProjectInput, BudgetTier, DesignStyle } from '@/lib/schemas/project'
import type { RedesignStrategy, StyleDirection, FurnitureConcept, FurniturePiece } from '@/lib/schemas/pipeline'

// ============================================================
// Furniture Concept Generator — Module D
// WALABI-specific pieces with real specifications
// Tone: furniture manufacturer + interior designer hybrid
// ============================================================

// --- Hero Bed Frames by Style ---

const BED_FRAMES: Record<DesignStyle, FurniturePiece> = {
  'organic-modern': {
    name: 'Arc Bed Frame',
    role: 'hero',
    material: 'White Oak — wire-brushed, natural oil finish',
    finish: 'Natural Oil — open pore, matte',
    dimensions: '180×200 cm (King) / 160×200 cm (Queen) — headboard H: 110 cm',
    notes: 'Arched headboard profile in solid oak with upholstered linen centre panel. Low leg clearance (18 cm) for grounded visual weight. Slat base integrated.',
    manufacturabilityNote: 'WALABI standard production — 4–6 week lead time. Headboard panel upholstered in-house.',
  },
  'arhaus-luxury': {
    name: 'Grand Tufted Bed Frame',
    role: 'hero',
    material: 'Solid Dark Walnut frame — performance velvet upholstery',
    finish: 'Satin lacquer on walnut components, cognac velvet headboard',
    dimensions: '180×200 cm — headboard H: 140 cm oversized',
    notes: 'Button-tufted oversized headboard with walnut leg detail. Concealed storage drawer optional. Upholstered side rail for full premium finish.',
    manufacturabilityNote: 'WALABI bespoke programme — 6–8 weeks. Upholstery COM option available for hotel brand alignment.',
  },
  'japandi-hospitality': {
    name: 'Hira Platform Bed',
    role: 'hero',
    material: 'Ash — clear oil finish, natural grain',
    finish: 'Clear Oil — reveals grain, no sheen',
    dimensions: '180×200 cm — platform height 22 cm total, headboard H: 75 cm',
    notes: 'Minimal platform frame with slatted headboard in ash. No upholstery — material honesty is the design statement. Extremely low profile for horizontal visual calm.',
    manufacturabilityNote: 'WALABI standard production — 4–5 weeks. All joints exposed and crafted to display-quality tolerance.',
  },
  'boutique-warm-minimalism': {
    name: 'Nido Upholstered Bed',
    role: 'hero',
    material: 'White Oak frame with full upholstered headboard in cotton-linen blend',
    finish: 'Matte oil on oak, warm cream upholstery',
    dimensions: '180×200 cm — headboard H: 100 cm',
    notes: 'Clean, channelled headboard design with oak leg reveal at base. Proportion-balanced for standard hotel room height. The most commercially transferable piece in the range.',
    manufacturabilityNote: 'WALABI standard production — 4–5 weeks. COM/COL headboard option for hotel-specific fabric.',
  },
}

// --- Bedside Tables by Style ---

const BEDSIDE_TABLES: Record<DesignStyle, FurniturePiece> = {
  'organic-modern': {
    name: 'Ronde Bedside Table',
    role: 'supporting',
    material: 'White Oak — solid top with turned or tapered leg',
    finish: 'Natural Oil',
    dimensions: 'Ø 45 cm × H 55 cm — round form',
    notes: 'Round table top eliminates corner-catching in tight room layouts. Single open shelf or drawer. USB-A/C integrated into surface as option.',
    manufacturabilityNote: 'Standard production — 3–4 weeks. USB integration via third-party insert, WALABI sourced.',
  },
  'arhaus-luxury': {
    name: 'Marlowe Bedside Cabinet',
    role: 'supporting',
    material: 'Dark Walnut — solid top, two-drawer cabinet, brass pull',
    finish: 'Satin lacquer, oil-rubbed brass hardware',
    dimensions: '50×40 cm × H 60 cm — cabinet form',
    notes: 'Two-drawer cabinet with dovetail joinery visible at corners. Brass ring pull. Top surface with 3 mm chamfered edge. Drawer lining in suede-effect material.',
    manufacturabilityNote: 'Bespoke programme — 5–6 weeks. Hardware sourced from WALABI supplier network.',
  },
  'japandi-hospitality': {
    name: 'Shiro Floating Shelf Unit',
    role: 'supporting',
    material: 'Ash — wall-mounted cantilevered shelf with concealed bracket',
    finish: 'Clear Oil',
    dimensions: '55×28 cm × H (single shelf) — adjustable installation height',
    notes: 'Wall-mounted to free floor plane entirely. Single shelf with integrated cable channel for phone charging. Minimal hardware visible.',
    manufacturabilityNote: 'Standard production — 3 weeks. Wall-mount brackets included, concrete or masonry fixings provided.',
  },
  'boutique-warm-minimalism': {
    name: 'Forma Bedside Table',
    role: 'supporting',
    material: 'White Oak — rectangular top with single drawer and open shelf',
    finish: 'Natural Oil',
    dimensions: '45×38 cm × H 58 cm',
    notes: 'Proportioned for use alongside Nido Bed. Drawer with push-to-open (no handle required). Lower shelf for styling object or reading material.',
    manufacturabilityNote: 'Standard production — 3–4 weeks. Designed as matched pair production.',
  },
}

// --- Desk by Budget ---

const DESKS: Record<BudgetTier, FurniturePiece> = {
  'light-refresh': {
    name: 'Desk Surface Restyle',
    role: 'supporting',
    material: 'Existing desk base retained — new surface styling only',
    finish: 'Desk pad in leather or cork added over existing surface',
    dimensions: 'Existing',
    notes: 'At light refresh tier, desk replacement is not warranted. A considered desk pad, coordinated accessories tray, and lamp upgrade delivers the improvement required.',
    manufacturabilityNote: 'No production required — sourced accessories only.',
  },
  'medium-upgrade': {
    name: 'Tana Desk',
    role: 'supporting',
    material: 'White Oak or Ash — solid top with hairpin or tapered legs',
    finish: 'Natural Oil',
    dimensions: '120×55 cm × H 75 cm',
    notes: 'Clean, unfussy desk proportioned for a working hotel room. Cable channel integrated at rear. Surface depth allows laptop + monitor if required.',
    manufacturabilityNote: 'Standard production — 3–4 weeks. Leg finish matches bedside table programme.',
  },
  'premium-redesign': {
    name: 'Tana Desk — Full Zone',
    role: 'supporting',
    material: 'Solid Oak top with integrated joinery surround — shelving and cable trunking built in',
    finish: 'Natural Oil on timber, matte black cable management elements',
    dimensions: '140×60 cm × H 75 cm, with 40 cm shelf above',
    notes: 'Full desk zone design: work surface, integrated shelf unit, cable management trunking, and task light bracket. Designed as a considered joinery piece, not a standalone table.',
    manufacturabilityNote: 'Bespoke joinery — 5–7 weeks. Requires wall fixing for shelf element.',
  },
}

// --- Accent Pieces by Style ---

const ACCENT_PIECES: Record<DesignStyle, FurniturePiece[]> = {
  'organic-modern': [
    {
      name: 'Ceramic Table Lamp Base',
      role: 'accent',
      material: 'Stoneware ceramic — wheel-thrown form, matte earth glaze',
      finish: 'Matte glaze in warm taupe or sand',
      dimensions: 'H 35 cm, shade Ø 40 cm linen drum',
      notes: 'Organic form base communicates craft provenance. Linen shade in warm white.',
      manufacturabilityNote: 'Sourced via WALABI artisan network. 2–3 week lead.',
    },
  ],
  'arhaus-luxury': [
    {
      name: 'Sculptural Floor Lamp',
      role: 'accent',
      material: 'Aged brass stem — tripod or arc form — with heavyweight linen or empire shade',
      finish: 'Aged Brass — hand-finished',
      dimensions: 'H 160–175 cm',
      notes: 'Statement piece for reading zone or corner. One per room maximum — not as a pair.',
      manufacturabilityNote: 'Sourced. Lead time 2–4 weeks depending on stock.',
    },
  ],
  'japandi-hospitality': [
    {
      name: 'Stone Object — Bedside',
      role: 'accent',
      material: 'Honed travertine or sandstone — small block or sculptural form',
      finish: 'Honed natural surface, no polish',
      dimensions: 'Approx. 12×8 cm — tabletop object',
      notes: 'Replaces flower arrangement. Permanent, does not require maintenance. Communicates design attention.',
      manufacturabilityNote: 'Sourced via stone supplier. One-off procurement per project.',
    },
  ],
  'boutique-warm-minimalism': [
    {
      name: 'Terracotta or Ceramic Vase',
      role: 'accent',
      material: 'Terracotta or earthenware — simple cylindrical or tapered form',
      finish: 'Unglazed or single-tone matte glaze',
      dimensions: 'H 25–35 cm',
      notes: 'Dried grass or single stem — not fresh flowers. Maintenance-free and photogenic.',
      manufacturabilityNote: 'Sourced. Budget-conscious accent with high visual return.',
    },
  ],
}

// --- Textile Specs ---

const TEXTILE_SPECS: Record<DesignStyle, string[]> = {
  'organic-modern': [
    'Bedding: 200-thread-count stone-washed linen, oat or warm white. Two pillowcases, fitted sheet, flat sheet.',
    'Duvet: Hungarian goose down alternative, weight 400 gsm, linen cover',
    'Throw: Waffle-weave cotton in terracotta or clay — folded at bed foot',
    'Cushions: 2× linen in complementary tones — 50×50 cm',
    'Curtains: Linen-look fabric, full-length, off-white. Eyelet heading, ceiling-mounted track.',
  ],
  'arhaus-luxury': [
    'Bedding: Egyptian cotton sateen 400TC, deep ivory with contrast piping. Fully pressed.',
    'Duvet: European goose down, 600 fill power, cotton casing',
    'Coverlet: Matelassé cotton in champagne or warm cream — under duvet layer',
    'Throw: Wool or cashmere blend in cognac or forest — draped at foot',
    'Cushions: 3× set — velvet, woven, solid mix. 50×50 + 30×50 cm',
    'Curtains: Full weight lined curtains, ceiling to floor, in coordinated fabric. Pinch pleat.',
  ],
  'japandi-hospitality': [
    'Bedding: Stone-washed linen, warm grey or pale flax. Minimal. Properly pressed.',
    'Duvet: Natural fibre fill, clean cover with no decoration',
    'Throw: Single slim throw in muted sage or clay — folded precisely',
    'Cushions: 1 only — linen, no pattern',
    'Curtains: Linen-look pinch pleat, ceiling-mounted, monochrome. Full blackout lining.',
  ],
  'boutique-warm-minimalism': [
    'Bedding: Cotton percale 300TC, warm cream. Smooth finish, no decoration.',
    'Duvet: Microfibre or down alternative — white, pressed',
    'Throw: Light cotton knit or brushed cotton in warm sand — folded at foot',
    'Cushions: 2× in coordinating neutral tones. 50×50 cm.',
    'Curtains: Double system — sheer linen layer + block-out lining. Full drop, ceiling-mounted.',
  ],
}

// --- Lighting Programme ---

const LIGHTING_SPECS: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Bedside lamps: matched pair — ceramic or wood base, linen shade, E27 Edison bulb 2700K',
    'Ceiling: replace bulb only — warm white 2700K, same fitting',
  ],
  'medium-upgrade': [
    'Ceiling: pendant in coordinating material — rattan, ceramic, or metal depending on style. Dimmable E27.',
    'Bedside lamps: matched pair — base proportioned to new bed scale. Warm shade.',
    'Desk: directional task lamp — matte black or brass to match hardware programme.',
    'All bulbs: 2700K warm white. Dimmer on ceiling circuit.',
  ],
  'premium-redesign': [
    'Ambient: cove lighting behind headboard — 2700K LED strip, dimmable to 10%',
    'Ceiling: statement pendant — custom or curated, matching design language',
    'Bedside: integrated wall-mounted reading arms — retractable, directional',
    'Desk: quality task lamp — in hardware programme finish',
    'Floor lamp: one in reading or seating zone — statement piece',
    'All circuits on dimmer. Scene programming for: arrival, sleep, morning.',
  ],
}

export function runFurnitureConcept(
  input: ProjectInput,
  strategy: RedesignStrategy,
  style: StyleDirection
): FurnitureConcept {
  const bedFrame    = BED_FRAMES[input.style]
  const bedsideTable = BEDSIDE_TABLES[input.style]
  const desk        = DESKS[input.budgetTier]
  const accents     = ACCENT_PIECES[input.style]

  const heroPieces: FurniturePiece[] = input.budgetTier !== 'light-refresh'
    ? [bedFrame]
    : []

  const supportingPieces: FurniturePiece[] = [
    ...(input.budgetTier !== 'light-refresh' ? [bedsideTable, bedsideTable] : []),
    desk,
  ]

  const productionNotes = buildProductionNotes(input)

  return {
    heroPieces,
    supportingPieces,
    accentPieces: accents,
    textiles:     TEXTILE_SPECS[input.style],
    lighting:     LIGHTING_SPECS[input.budgetTier],
    practicalNotes: [
      'All dimensions are indicative — confirm against as-built room survey before production',
      'Bed frame to include anti-slip feet to protect floor finish',
      'All timber components to be inspected and approved by client before finishing',
      input.budgetTier === 'premium-redesign'
        ? 'Full installation by WALABI crew — delivery, assembly, positioning, punch list sign-off'
        : 'Installation can be completed by hotel maintenance team with WALABI delivery checklist',
    ],
    walabiProductionNotes: productionNotes,
  }
}

function buildProductionNotes(input: ProjectInput): string {
  const tierNotes: Record<BudgetTier, string> = {
    'light-refresh':
      'At light refresh scope, WALABI supplies and delivers accessories and textiles. No custom production required. Delivery within 5–7 business days of order confirmation.',
    'medium-upgrade':
      'Standard production programme. Lead time 4–6 weeks from confirmed specification. WALABI coordinates delivery and provides installation checklist. Site supervision available on request.',
    'premium-redesign':
      'Full bespoke programme. Production begins upon signed specification sheet and 50% deposit. WALABI project manager assigned at commission stage. Installation team manages full delivery, placement, and handover inspection.',
  }
  return tierNotes[input.budgetTier]
}
