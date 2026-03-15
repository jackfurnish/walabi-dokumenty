import type { ProjectInput, DesignStyle, BudgetTier, RoomType } from '@/lib/schemas/project'
import type {
  SpaceAnalysis,
  RedesignStrategy,
  StyleDirection,
  FurnitureConcept,
  RenderPromptPackage,
} from '@/lib/schemas/pipeline'

// ============================================================
// Render Prompt Generator — Module E
// Production-ready prompts for Midjourney, DALL·E 3, SD XL
// Tone: professional architectural visualisation brief
// ============================================================

const ROOM_CONTEXT: Record<RoomType, string> = {
  'hotel-room':        'hotel room interior, 25 square meters, single floor, standard ceiling height 2.6m',
  'boutique-suite':    'boutique hotel suite interior, separate sleeping and sitting zone, generous proportions',
  'apartment-bedroom': 'upscale apartment bedroom, residential scale and warmth, hospitality-quality finish',
}

const STYLE_PROMPT_CORE: Record<DesignStyle, string> = {
  'organic-modern': [
    'organic modern interior design',
    'white oak furniture with wire-brushed natural oil finish',
    'arched headboard upholstered in stone-washed linen',
    'warm off-white walls with subtle texture',
    'terracotta and warm earth accent tones',
    'layered linen textiles, waffle-weave throw',
    'ceramic lamp base with linen shade',
    'travertine surface accents',
    'dried botanicals in stoneware vessel',
    'biophilic warmth without rustic references',
  ].join(', '),

  'arhaus-luxury': [
    'arhaus-inspired luxury interior design',
    'oversized button-tufted headboard in cognac velvet',
    'dark walnut furniture with satin lacquer finish',
    'aged brass hardware and light fixtures',
    'layered bedding programme with matelassé coverlet',
    'full-length lined curtains in warm ivory',
    'sculptural brass floor lamp',
    'marble surface accents',
    'rich warm palette of deep ivory, cognac and forest green',
    'american craft luxury, generously proportioned',
  ].join(', '),

  'japandi-hospitality': [
    'japandi hospitality interior design',
    'low ash platform bed with slatted headboard',
    'wall-mounted floating bedside shelves',
    'stone-washed linen bedding in warm grey',
    'honed concrete or slate surface accents',
    'matte black hardware details',
    'linen pinch-pleat curtains to ceiling',
    'single honed travertine object on bedside',
    'asymmetric composition, disciplined restraint',
    'wabi-sabi material honesty, quiet luxury',
  ].join(', '),

  'boutique-warm-minimalism': [
    'boutique warm minimalism interior design',
    'white oak bed frame with channelled linen headboard in warm cream',
    'clean lines with warm material moments',
    'cotton percale bedding, smooth and well-pressed',
    'brushed brass hardware details',
    'terracotta ceramic accent',
    'sheer linen curtains with block-out backing',
    'warm cream, oak, and terracotta palette',
    'approachable premium, genuinely comfortable',
    'photography-ready staging, no clutter',
  ].join(', '),
}

const LIGHTING_PROMPTS: Record<BudgetTier, string> = {
  'light-refresh':    'warm bedside lamp light 2700K, soft natural daylight from window, no harsh overhead shadows',
  'medium-upgrade':   'considered lighting design: warm pendant ambient, matched bedside lamps, soft window daylight, 2700K throughout',
  'premium-redesign': 'sophisticated layered lighting: cove wash behind headboard, pendant ambient, directional bedside arms, all at 2700K warm, no visible light sources in frame',
}

const CAMERA_ANGLES: Record<RoomType, string> = {
  'hotel-room':        'eye-level wide angle, camera at 100cm height, 24mm equivalent lens, bed wall as primary composition axis',
  'boutique-suite':    'elevated three-quarter view from entry, 28mm equivalent lens capturing both sleeping and sitting zones',
  'apartment-bedroom': 'eye-level corner shot, 24mm equivalent, showing bed + window + atmospheric light in single composition',
}

const TECHNICAL_SPECS: Record<DesignStyle, string> = {
  'organic-modern':           '--ar 16:9 --q 2 --s 650 --v 6 --style raw',
  'arhaus-luxury':            '--ar 16:9 --q 2 --s 750 --v 6',
  'japandi-hospitality':      '--ar 16:9 --q 2 --s 500 --v 6 --style raw',
  'boutique-warm-minimalism': '--ar 16:9 --q 2 --s 600 --v 6',
}

const NEGATIVE_PROMPTS: Record<DesignStyle, string> = {
  'organic-modern':
    'cartoon, illustration, CGI rendering, dark room, harsh shadows, over-saturated, rustic farmhouse, boho clutter, artificial plants, plastic surfaces, cold white walls, chrome fixtures, generic hotel',

  'arhaus-luxury':
    'cartoon, illustration, minimalist, cold grey tones, industrial, sparse, modern Scandinavian, harsh lighting, oversaturated, cheap hotel, chrome fixtures, laminate furniture',

  'japandi-hospitality':
    'cartoon, clutter, warm brass fixtures, ornate details, patterned textiles, dark walnut furniture, oversaturated, warm yellow lighting, rustic, farmhouse, generic hotel, over-decorated',

  'boutique-warm-minimalism':
    'cartoon, clutter, cold grey tones, industrial, dark heavy furniture, neon colours, bold patterns, harsh lighting, oversaturated, cheap hotel, generic corporate design',
}

const STYLE_MODIFIERS: Record<DesignStyle, string[]> = {
  'organic-modern':           ['photorealistic', 'architectural photography', 'natural material detail', 'warm film grain', 'soft depth of field'],
  'arhaus-luxury':            ['photorealistic', 'luxury interior photography', 'rich tones', 'editorial quality', 'deep shadows', 'high contrast detail'],
  'japandi-hospitality':      ['photorealistic', 'architectural photography', 'magazine quality', 'matte surfaces', 'soft light', 'precise composition'],
  'boutique-warm-minimalism': ['photorealistic', 'hospitality photography', 'clean staging', 'warm natural light', 'instagram-ready composition'],
}

function buildMasterPrompt(
  input: ProjectInput,
  style: StyleDirection,
  budget: BudgetTier,
): string {
  const parts = [
    `Photorealistic interior photography of a ${ROOM_CONTEXT[input.roomType]}`,
    STYLE_PROMPT_CORE[input.style],
    `Lighting: ${LIGHTING_PROMPTS[budget]}`,
    `Camera: ${CAMERA_ANGLES[input.roomType]}`,
    'Shot for luxury hotel brand editorial use, publication quality',
    '8K resolution, high dynamic range, no visible lens distortion',
    TECHNICAL_SPECS[input.style],
  ]
  return parts.join('. ')
}

function buildPromptVariants(
  masterPrompt: string,
  input: ProjectInput,
): string[] {
  const base = masterPrompt
    .replace(/\. Shot for luxury hotel brand editorial use.*/, '')
    .replace(/\. --.*/, '')

  return [
    `${base}, golden hour sunlight streaming through curtains, long shadows, warm cinematic quality. ${TECHNICAL_SPECS[input.style]}`,
    `${base}, evening ambience, all lamps lit, exterior darkness through window, intimate atmosphere. ${TECHNICAL_SPECS[input.style]}`,
    `Close-up detail shot of bedside composition — lamp, ceramic object, book, folded linen. Macro depth of field. Material texture focus. Photorealistic, editorial quality. ${TECHNICAL_SPECS[input.style]}`,
  ]
}

export function runRenderPromptGenerator(
  input: ProjectInput,
  spaceAnalysis: SpaceAnalysis,
  strategy: RedesignStrategy,
  style: StyleDirection,
  furniture: FurnitureConcept
): RenderPromptPackage {
  const masterPrompt = buildMasterPrompt(input, style, input.budgetTier)

  return {
    masterPrompt,
    styleModifiers:       STYLE_MODIFIERS[input.style],
    lightingInstructions: LIGHTING_PROMPTS[input.budgetTier],
    cameraAngle:          CAMERA_ANGLES[input.roomType],
    negativePrompt:       NEGATIVE_PROMPTS[input.style],
    technicalSpec:        TECHNICAL_SPECS[input.style],
    promptVariants:       buildPromptVariants(masterPrompt, input),
  }
}
