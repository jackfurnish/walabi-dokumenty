import type { RoomType, DesignStyle, BudgetTier } from '@/lib/schemas/project'
import type { Lang } from '@/lib/i18n/translations'

// ============================================================
// WALABI Render Pipeline — Option Sets
// ============================================================

export interface RoomTypeOption {
  value: RoomType
  label: string
  labelPl: string
  description: string
  descriptionPl: string
  icon: string
}

export interface DesignStyleOption {
  value: DesignStyle
  label: string
  labelPl: string
  description: string
  descriptionPl: string
  keywords: string[]
  colorHint: string
}

export interface BudgetTierOption {
  value: BudgetTier
  label: string
  labelPl: string
  description: string
  descriptionPl: string
  rangeNote: string
  impactLevel: 'subtle' | 'moderate' | 'transformative'
}

export const ROOM_TYPES: RoomTypeOption[] = [
  {
    value: 'hotel-room',
    label: 'Hotel Room',
    labelPl: 'Pokój hotelowy',
    description: 'Standard 3–4★ hotel room, 20–35 m²',
    descriptionPl: 'Standardowy pokój hotelowy 3–4★, 20–35 m²',
    icon: '🛏️',
  },
  {
    value: 'boutique-suite',
    label: 'Boutique Suite',
    labelPl: 'Boutique suite',
    description: 'Larger suite with sitting area, 40–70 m²',
    descriptionPl: 'Większy apartament z częścią wypoczynkową, 40–70 m²',
    icon: '🏨',
  },
  {
    value: 'apartment-bedroom',
    label: 'Apartment Bedroom',
    labelPl: 'Sypialnia apartamentowa',
    description: 'Apartment-style bedroom for hospitality use',
    descriptionPl: 'Sypialnia w stylu apartamentowym do użytku hotelowego',
    icon: '🏠',
  },
]

export const DESIGN_STYLES: DesignStyleOption[] = [
  {
    value: 'organic-modern',
    label: 'Organic Modern',
    labelPl: 'Organic modern',
    description: 'Natural materials, soft curves, biophilic accents. Warm and alive.',
    descriptionPl: 'Naturalne materiały, miękkie linie, akcenty biofilne. Ciepły i żywy.',
    keywords: ['walnut', 'linen', 'curves', 'warmth', 'organic forms', 'textured walls'],
    colorHint: '#C4A882',
  },
  {
    value: 'arhaus-luxury',
    label: 'Arhaus-Inspired Luxury',
    labelPl: 'Arhaus luxury',
    description: 'American luxury craftsmanship. Rich woods, plush upholstery, layered textiles.',
    descriptionPl: 'Amerykańskie rzemiosło luksusowe. Bogate drewno, pluszowe tapicerowanie, warstwowe tekstylia.',
    keywords: ['deep walnut', 'velvet', 'brass', 'aged leather', 'layered', 'crafted'],
    colorHint: '#8B6B4E',
  },
  {
    value: 'japandi-hospitality',
    label: 'Japandi Hospitality',
    labelPl: 'Japandi hospitality',
    description: 'Minimalism meets warmth. Precision craft, quiet palettes, functional beauty.',
    descriptionPl: 'Minimalizm spotyka ciepło. Precyzyjne rzemiosło, spokojne palety, funkcjonalne piękno.',
    keywords: ['wabi-sabi', 'matte finishes', 'linen', 'maple', 'quiet', 'precise'],
    colorHint: '#9E9B8F',
  },
  {
    value: 'boutique-warm-minimalism',
    label: 'Boutique Warm Minimalism',
    labelPl: 'Minimalizm ciepły boutique',
    description: 'Minimal clutter, maximal comfort. Curated pieces, warm neutrals, soft focus.',
    descriptionPl: 'Minimalny bałagan, maksymalny komfort. Wyselekcjonowane elementy, ciepłe neutralne, miękki focus.',
    keywords: ['white oak', 'cream', 'terracotta', 'soft geometry', 'clean lines', 'cozy'],
    colorHint: '#D4C4A8',
  },
]

export const BUDGET_TIERS: BudgetTierOption[] = [
  {
    value: 'light-refresh',
    label: 'Light Refresh',
    labelPl: 'Odświeżenie podstawowe',
    description: 'Textiles, lighting, and decor swap. No structural changes.',
    descriptionPl: 'Wymiana tekstyliów, oświetlenia i dekoracji. Bez zmian strukturalnych.',
    rangeNote: 'PLN 8,000 – 25,000 per room',
    impactLevel: 'subtle',
  },
  {
    value: 'medium-upgrade',
    label: 'Medium Upgrade',
    labelPl: 'Modernizacja średnia',
    description: 'Key furniture replacement, improved lighting, new textiles.',
    descriptionPl: 'Wymiana kluczowych mebli, ulepszone oświetlenie, nowe tekstylia.',
    rangeNote: 'PLN 25,000 – 70,000 per room',
    impactLevel: 'moderate',
  },
  {
    value: 'premium-redesign',
    label: 'Premium Redesign',
    labelPl: 'Transformacja premium',
    description: 'Full WALABI furniture concept. Custom pieces, complete visual transformation.',
    descriptionPl: 'Pełna koncepcja mebli WALABI. Elementy na zamówienie, kompletna transformacja wizualna.',
    rangeNote: 'PLN 70,000 – 180,000 per room',
    impactLevel: 'transformative',
  },
]

// ============================================================
// Label Helpers (bilingual)
// ============================================================

export function getRoomTypeLabel(value: RoomType, lang: Lang = 'en'): string {
  const option = ROOM_TYPES.find(r => r.value === value)
  if (!option) return value
  return lang === 'pl' ? option.labelPl : option.label
}

export function getStyleLabel(value: DesignStyle, lang: Lang = 'en'): string {
  const option = DESIGN_STYLES.find(s => s.value === value)
  if (!option) return value
  return lang === 'pl' ? option.labelPl : option.label
}

export function getBudgetTierLabel(value: BudgetTier, lang: Lang = 'en'): string {
  const option = BUDGET_TIERS.find(b => b.value === value)
  if (!option) return value
  return lang === 'pl' ? option.labelPl : option.label
}
