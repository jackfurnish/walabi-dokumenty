import type { ProjectInput, DesignStyle } from '@/lib/schemas/project'
import type { StyleDirection } from '@/lib/schemas/pipeline'

// ============================================================
// Style Director — Module C
// WALABI's 4 design families — each with full palette definition
// Tone: brand creative director, not trend blogger
// ============================================================

type StyleLibrary = Record<DesignStyle, Omit<StyleDirection, 'styleFamily'>>

const STYLE_LIBRARY: StyleLibrary = {

  'organic-modern': {
    styleDescription:
      'Organic Modern channels the material warmth of the natural world through considered, contemporary form. It is not rustic, not Scandinavian, not \"boho\" — it is a grown-up design language that uses texture, weight, and biological curve as its primary tools. In a hotel context, it communicates that someone with taste, not a procurement team, designed this room.',

    colorPalette: {
      primary:   'Warm White — off-white with a faint yellow undertone, never clinical',
      secondary: 'Oat / Greige — warm mid-tone that reads as beige in low light, stone in daylight',
      accent:    'Terracotta or Ochre — one warm earth tone used sparingly as a material moment',
      neutral:   'Warm Charcoal — deep brown-tinted charcoal for grounding elements',
      notes:     'No cool whites, no greys without warmth, no black. Every tone should read as found in nature.',
    },

    materialPalette: {
      wood:    'White Oak — open grain, wire-brushed or natural oil finish. Never varnished or gloss.',
      textile: 'Linen and waffle-weave cotton. Slub texture visible. Pre-washed finish. Earth tones.',
      metal:   'Warm Brass — unlacquered or satin, not mirror-polished. Aged patina acceptable.',
      stone:   'Travertine or Sandstone — honed, not polished. Tactile surface visible.',
      notes:   'Every material should have a story. If it could be in a hardware store catalogue, choose again.',
    },

    decorRules: [
      'Curves over right angles wherever structure allows — arched headboard, rounded table edge',
      'One organic form object per zone: a thrown ceramic, a natural wood object, a stone piece',
      'Plants as considered design elements, not fillers — one architectural specimen over multiple small pots',
      'Layered textiles: base layer, throw, one or two cushions. Never more.',
      'Artwork: one considered piece per wall, not a gallery grid. Photography or abstract preferred.',
      'Surfaces should breathe — not decorated, but not bare',
      'Hardware in consistent warm brass — no chrome mixing',
    ],

    forbiddenPatterns: [
      'High-gloss lacquer furniture in any form',
      'Chrome or cool-toned metal finishes',
      'Pattern-heavy textiles (geometric, floral, stripe)',
      'Matching furniture sets from a single manufacturer (\"suite\" look)',
      'Artificial plants or dried florals',
      'Hotel-white, bright white, or cool-toned linen',
      'Symmetrical twin table lamp clichés without considered placement',
    ],

    keyReferences: [
      'Aesop retail interiors — material discipline',
      'Noma restaurant, Copenhagen — tactile warmth without decoration',
      'Nobu Hotel interiors — natural material luxury',
    ],

    moodKeywords: ['tactile', 'grounded', 'warm', 'considered', 'alive', 'unhurried'],
  },

  // ---------------------------------------------------------------

  'arhaus-luxury': {
    styleDescription:
      'Arhaus-inspired luxury translates the American craft furniture tradition into a hospitality context: deep wood tones, plush upholstery, layered textiles, and the kind of material weight that communicates generosity. This is a room where the guest immediately understands the budget tier without being told. It is not showy — it is self-assured.',

    colorPalette: {
      primary:   'Deep Ivory — warm white with a faint amber depth, not cream, not yellow',
      secondary: 'Cognac / Caramel — warm mid-brown used in upholstery and leather accents',
      accent:    'Forest Green or Plum — a rich, darkened accent tone for cushions or throws',
      neutral:   'Dark Walnut — the furniture wood tone anchors the palette as the dominant dark',
      notes:     'The palette should feel like a gentlemen\'s club edited for the 21st century. Rich without red-tone excess.',
    },

    materialPalette: {
      wood:    'Dark Walnut or Blackened Oak — substantial grain, smooth to matte finish, not wax.',
      textile: 'Velvet and performance bouclé — upholstery in cognac, cream, or forest. Full-weight curtains.',
      metal:   'Aged Brass or Oil-Rubbed Bronze — visible, but used with intention. Not decorative excess.',
      stone:   'Marble — Calacatta or similar veined white for surface accents only. Not flooring.',
      notes:   'Weight is everything. Every element should feel like it took effort to source and install.',
    },

    decorRules: [
      'Headboard must be oversized and upholstered — it is the room\'s primary architectural statement',
      'Layered textiles are non-negotiable: base sheet, coverlet or duvet, throw, minimum two cushions',
      'Artwork framed in dark or gilded frame — adds to the sense of permanence',
      'Books or objects on surfaces — the room should suggest a life lived, not a showroom staged',
      'Full-length curtains to ceiling only — nothing that hovers above floor level',
      'One statement lighting piece — oversized pendant or sculptural floor lamp',
      'Brass hardware programme: door handle, towel hook, picture rail — consistent throughout',
    ],

    forbiddenPatterns: [
      'Flat-pack or laminate furniture of any kind',
      'Chrome fittings — entirely incompatible with this palette',
      'Minimalist restraint — this style requires generous layering',
      'White or cool-toned upholstery as primary fabric',
      'Roller blinds or synthetic curtains',
      'Bare walls — artwork, mirror, or feature treatment required',
      'Corporate \"business hotel\" desk configuration',
    ],

    keyReferences: [
      'Arhaus flagship stores — upholstery weight and layering',
      'The NoMad Hotel, New York — plush layered luxury',
      'Rosewood properties — craft material story',
    ],

    moodKeywords: ['generous', 'plush', 'self-assured', 'crafted', 'weighty', 'layered'],
  },

  // ---------------------------------------------------------------

  'japandi-hospitality': {
    styleDescription:
      'Japandi Hospitality is not minimalism — it is intentional restraint. Every element present is present because it earned its place. The material language is precise: natural wood, linen, matte stone, and quiet metal. In a hotel context, this style speaks to a guest who finds luxury in the absence of noise — and who will write reviews mentioning \"the quality of calm\" rather than the size of the TV.',

    colorPalette: {
      primary:   'Stone White — a warm, slightly greyed white. Architectural, not domestic.',
      secondary: 'Warm Ash — the primary wood tone; pale, matte, never yellow-toned',
      accent:    'Sage or Muted Clay — a single warm or cool accent tone used once per room',
      neutral:   'Charcoal Matte — deep, dry charcoal for a single grounding element (frame, lamp base)',
      notes:     'The palette is quiet. If a colour is asking for attention, it does not belong here.',
    },

    materialPalette: {
      wood:    'Ash or Maple — light, straight grain, matte oil finish. Joinery-precise edges.',
      textile: 'Stone-washed linen — no pattern, no sheen. Dried herbs, warm sand, aged slate tones.',
      metal:   'Matte Black or Gunmetal — used sparingly. Visible only as a precise detail, not decor.',
      stone:   'Honed Concrete or Slate tile — matte surface, no gloss. Texture visible but not rough.',
      notes:   'Every material should look like it was chosen after five others were rejected.',
    },

    decorRules: [
      'One object per surface — if there are two, one must be removed',
      'Asymmetry preferred over symmetry wherever structure permits',
      'Bed height low to ground — platform or minimal-leg frame reinforces horizontal calm',
      'Curtains to ceiling in monochrome linen — no pattern, no hardware visible',
      'Artwork: one piece, considered placement, significant breathing room around it',
      'Ceramic or stone object for bedside — replaces flower arrangement or decorative excess',
      'All storage concealed — visible clutter is a design failure at this tier',
    ],

    forbiddenPatterns: [
      'Excessive decoration — if in doubt, remove it',
      'Warm brass or gold hardware — incompatible with this palette',
      'Pattern on any primary textile surface',
      'Upholstered headboards in rich or bright tones',
      'Multiple artwork pieces on one wall',
      'Matching lamp sets that read as hotel-catalogue symmetry',
      'Warm wood tones (walnut, oak with yellow undertone)',
    ],

    keyReferences: [
      'Muji Hotel, Tokyo — material honesty',
      'Ace Hotel Kyoto — Japanese craft meeting hospitality restraint',
      'Zaborin Ryokan — considered object placement',
    ],

    moodKeywords: ['precise', 'still', 'honest', 'unhurried', 'earned', 'quiet'],
  },

  // ---------------------------------------------------------------

  'boutique-warm-minimalism': {
    styleDescription:
      'Boutique Warm Minimalism occupies the commercially accessible centre of the premium design spectrum. It is warm enough for guests who find pure minimalism cold, restrained enough for guests who find maximalism exhausting. In a hotel context, it is the style most likely to generate strong photography and positive online reviews — because it photographs clean, reads as premium, and feels genuinely comfortable to inhabit.',

    colorPalette: {
      primary:   'Warm Cream — softer than white, lighter than ivory. Reads as fresh, not aged.',
      secondary: 'White Oak (material colour) — the pale warm wood tone as visual anchor',
      accent:    'Terracotta or Dusty Rose — one warm accent, used in textile only',
      neutral:   'Warm Stone — mid-tone beige-grey for balancing surfaces',
      notes:     'The palette must work well in daylight photography. Nothing that reads cold or clinical on camera.',
    },

    materialPalette: {
      wood:    'White Oak — clean grain, light, matte finish. The most commercially versatile warm wood.',
      textile: 'Cotton percale and linen-cotton mix. Smooth base layers, textured accent pieces.',
      metal:   'Brushed Brass or Satin Nickel — soft, not shiny. Subtle hardware programme.',
      stone:   'Limestone or Terrazzo — warm tone, honed finish. Used as a material moment, not throughout.',
      notes:   'This palette should be easy to source and deliver — commercial availability is a feature, not a compromise.',
    },

    decorRules: [
      'Clean surfaces with one considered object — do not over-style, do not leave bare',
      'Headboard present and scaled correctly — upholstered in cream, oat, or warm white',
      'Bedding smooth, crisp, and properly pressed — photography quality is a key deliverable',
      'One plant or organic element — adds life without visual complexity',
      'Artwork: one piece per wall, simple frame, calm subject',
      'Curtains in full drop — sheer layer for light softening, block-out behind',
      'Timber flooring or warm-toned carpet visible — cold tile should be covered where possible',
    ],

    forbiddenPatterns: [
      'High-contrast bold patterns on any surface',
      'Cold-toned greys, blues, or purples — palette must stay warm',
      'Industrial elements: exposed pipe, bare concrete, raw metal',
      'Overly ornate or decorative hardware',
      'Dark, heavy furniture that compresses the room visually',
      'Neon or strongly coloured artwork',
      'Overly curated \"Instagram-trap\" styling — must feel genuine, not performed',
    ],

    keyReferences: [
      '1 Hotels — warm material simplicity',
      'The LINE Hotel — approachable premium',
      'Scandic Hotels premium tier — warm Scandinavian hospitality',
    ],

    moodKeywords: ['clean', 'warm', 'approachable', 'fresh', 'genuine', 'comfortable'],
  },
}

export function runStyleDirector(input: ProjectInput): StyleDirection {
  const styleData = STYLE_LIBRARY[input.style]
  const styleFamilyLabel: Record<DesignStyle, string> = {
    'organic-modern':           'Organic Modern',
    'arhaus-luxury':            'Arhaus-Inspired Luxury',
    'japandi-hospitality':      'Japandi Hospitality',
    'boutique-warm-minimalism': 'Boutique Warm Minimalism',
  }

  return {
    styleFamily:    styleFamilyLabel[input.style],
    ...styleData,
  }
}
