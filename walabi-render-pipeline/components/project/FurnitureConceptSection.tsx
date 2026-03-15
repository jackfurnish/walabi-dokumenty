'use client'

import { Armchair } from 'lucide-react'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import { cn } from '@/lib/utils/cn'
import type { FurnitureConcept, FurniturePiece } from '@/lib/schemas/pipeline'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'
import type { Lang } from '@/lib/i18n/translations'

interface FurnitureConceptSectionProps {
  data: FurnitureConcept
}

const roleStyles: Record<string, string> = {
  hero:       'bg-amber-50 text-amber-700 border-amber-100',
  supporting: 'bg-stone-100 text-stone-600 border-stone-200',
  accent:     'bg-violet-50 text-violet-600 border-violet-100',
}

const roleLabels: Record<string, { pl: string; en: string }> = {
  hero:       { pl: 'Główny',     en: 'hero' },
  supporting: { pl: 'Wspierający', en: 'supporting' },
  accent:     { pl: 'Akcent',     en: 'accent' },
}

function PieceCard({ piece, lang }: { piece: FurniturePiece; lang: Lang }) {
  return (
    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="text-xs font-semibold text-stone-800">{piece.name}</h4>
        <span className={cn(
          'text-[10px] font-semibold px-1.5 py-0.5 rounded border capitalize',
          roleStyles[piece.role]
        )}>
          {roleLabels[piece.role]?.[lang] ?? piece.role}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
        <div>
          <span className="text-[10px] text-stone-400">{lang === 'pl' ? 'Materiał' : 'Material'}</span>
          <p className="text-xs text-stone-700">{piece.material}</p>
        </div>
        <div>
          <span className="text-[10px] text-stone-400">{lang === 'pl' ? 'Wykończenie' : 'Finish'}</span>
          <p className="text-xs text-stone-700">{piece.finish}</p>
        </div>
        <div>
          <span className="text-[10px] text-stone-400">{lang === 'pl' ? 'Wymiary' : 'Dimensions'}</span>
          <p className="text-xs text-stone-700">{piece.dimensions}</p>
        </div>
      </div>
      {piece.notes && (
        <p className="text-[11px] text-stone-500 italic">{piece.notes}</p>
      )}
      {piece.manufacturabilityNote && (
        <p className="text-[11px] text-emerald-600 mt-1">↳ {piece.manufacturabilityNote}</p>
      )}
    </div>
  )
}

export function FurnitureConceptSection({ data }: FurnitureConceptSectionProps) {
  const { lang } = useLanguage()
  const allPieces = [
    ...data.heroPieces,
    ...data.supportingPieces,
    ...data.accentPieces,
  ]

  return (
    <CollapsibleSection
      title={t('sections', 'furnitureConcept', lang)}
      subtitle={`${allPieces.length} ${lang === 'pl' ? 'elementów' : 'pieces'} · ${data.heroPieces.length} ${lang === 'pl' ? 'głównych' : 'hero'}`}
      icon={<Armchair className="w-4 h-4" />}
    >
      <div className="space-y-6">
        {/* Pieces */}
        <div className="grid grid-cols-2 gap-3">
          {allPieces.map((piece, i) => (
            <PieceCard key={i} piece={piece} lang={lang} />
          ))}
        </div>

        {/* Textiles + Lighting */}
        <div className="grid grid-cols-2 gap-6">
          {data.textiles.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                {lang === 'pl' ? 'Tekstylia' : 'Textiles'}
              </p>
              <ul className="space-y-1">
                {data.textiles.map((t, i) => (
                  <li key={i} className="text-xs text-stone-600">· {t}</li>
                ))}
              </ul>
            </div>
          )}
          {data.lighting.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                {lang === 'pl' ? 'Oświetlenie' : 'Lighting'}
              </p>
              <ul className="space-y-1">
                {data.lighting.map((l, i) => (
                  <li key={i} className="text-xs text-stone-600">· {l}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* WALABI Production Note */}
        {data.walabiProductionNotes && (
          <div className="bg-amber-50/80 border border-amber-100 rounded-xl px-4 py-3">
            <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide mb-1">
              WALABI {lang === 'pl' ? 'Notatki produkcyjne' : 'Production Notes'}
            </p>
            <p className="text-xs text-amber-800">{data.walabiProductionNotes}</p>
          </div>
        )}
      </div>
    </CollapsibleSection>
  )
}
