import type { RoomType, DesignStyle, BudgetTier } from '@/lib/schemas/project'

// ============================================================
// WALABI Render Pipeline — Option Sets
// ============================================================

export interface RoomTypeOption {
  value: RoomType
  label: string
  description: string
  icon: string
}

export interface DesignStyleOption {
  value: DesignStyle
  label: string
  description: string
  keywords: string[]
  colorHint: string
}

export interface BudgetTierOption {
  value: BudgetTier
  label: string
  description: string
  rangeNote: string
  impactLevel: 'subtle' | 'moderate' | 'transformative'
}

export const ROOM_TYPES: RoomTypeOption[] = [
  {
    value: 'hotel-room',
    label: 'Hotel Room',
    description: 'Standard 3–4★ hotel room, 20–35 m²',
    icon: '🛏️',
  },
  {
    value: 'boutique-suite',
    label: 'Boutique Suite',
    description: 'Larger suite with sitting area, 40–70 m²',
    icon: '🏨',
  },
  {
    value: 'apartment-bedroom',
    label: 'Apartment Bedroom',
    description: 'Apartment-style bedroom for hospitality use',
    icon: '🏠',
  },
]

export const DESIGN_STYLES: DesignStyleOption[] = [
  {
    value: 'organic-modern',
    label: 'Organic Modern',
    description: 'Natural materials, soft curves, biophilic accents. Warm and alive.',
    keywords: ['walnut', 'linen', 'curves', 'warmth', 'organic forms', 'textured walls'],
    colorHint: '#C4A882',
  },
  {
    value: 'arhaus-luxury',
    label: 'Arhaus-Inspired Luxury',
    description: 'American luxury craftsmanship. Rich woods, plush upholstery, layered textiles.',
    keywords: ['deep walnut', 'velvet', 'brass', 'aged leather', 'layered', 'crafted'],
    colorHint: '#8B6B4E',
  },
  {
    value: 'japandi-hospitality',
    label: 'Japandi Hospitality',
    description: 'Minimalism meets warmth. Precision craft, quiet palettes, functional beauty.',
    keywords: ['wabi-sabi', 'matte finishes', 'linen', 'maple', 'quiet', 'precise'],
    colorHint: '#9E9B8F',
  },
  {
    value: 'boutique-warm-minimalism',
    label: 'Boutique Warm Minimalism',
    description: 'Minimal clutter, maximal comfort. Curated pieces, warm neutrals, soft focus.',
    keywords: ['white oak', 'cream', 'terracotta', 'soft geometry', 'clean lines', 'cozy'],
    colorHint: '#D4C4A8',
  },
]

export const BUDGET_TIERS: BudgetTierOption[] = [
  {
    value: 'light-refresh',
    label: 'Light Refresh',
    description: 'Textiles, lighting, and decor swap. No structural changes.',
    rangeNote: 'PLN 8,000 – 25,000 per room',
    impactLevel: 'subtle',
  },
  {
    value: 'medium-upgrade',
    label: 'Medium Upgrade',
    description: 'Key furniture replacement, improved lighting, new textiles.',
    rangeNote: 'PLN 25,000 – 70,000 per room',
    impactLevel: 'moderate',
  },
  {
    value: 'premium-redesign',
    label: 'Premium Redesign',
    description: 'Full WALABI furniture concept. Custom pieces, complete visual transformation.',
    rangeNote: 'PLN 70,000 – 180,000 per room',
    impactLevel: 'transformative',
  },
]

// ============================================================
// Label Helpers
// ============================================================

export function getRoomTypeLabel(value: RoomType): string {
  return ROOM_TYPES.find(r => r.value === value)?.label ?? value
}

export function getStyleLabel(value: DesignStyle): string {
  return DESIGN_STYLES.find(s => s.value === value)?.label ?? value
}

export function getBudgetTierLabel(value: BudgetTier): string {
  return BUDGET_TIERS.find(b => b.value === value)?.label ?? value
}
