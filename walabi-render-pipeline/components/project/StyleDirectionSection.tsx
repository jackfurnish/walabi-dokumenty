import { Palette } from 'lucide-react'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import type { StyleDirection } from '@/lib/schemas/pipeline'

interface StyleDirectionSectionProps {
  data: StyleDirection
}

export function StyleDirectionSection({ data }: StyleDirectionSectionProps) {
  return (
    <CollapsibleSection
      title="WALABI Style Direction"
      subtitle={data.styleFamily}
      icon={<Palette className="w-4 h-4" />}
    >
      <div className="space-y-6">
        <p className="text-sm text-stone-600 leading-relaxed">{data.styleDescription}</p>

        {/* Palettes */}
        <div className="grid grid-cols-2 gap-6">
          {/* Color Palette */}
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-3">
              Color Palette
            </p>
            <div className="space-y-2">
              {Object.entries({
                Primary:   data.colorPalette.primary,
                Secondary: data.colorPalette.secondary,
                Accent:    data.colorPalette.accent,
                Neutral:   data.colorPalette.neutral,
              }).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-xs text-stone-400 w-16 flex-shrink-0">{key}</span>
                  <span className="text-xs font-medium text-stone-700">{value}</span>
                </div>
              ))}
            </div>
            {data.colorPalette.notes && (
              <p className="text-xs text-stone-400 mt-2 italic">{data.colorPalette.notes}</p>
            )}
          </div>

          {/* Material Palette */}
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-3">
              Materials
            </p>
            <div className="space-y-2">
              {Object.entries({
                Wood:    data.materialPalette.wood,
                Textile: data.materialPalette.textile,
                Metal:   data.materialPalette.metal,
                Stone:   data.materialPalette.stone,
              }).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-xs text-stone-400 w-16 flex-shrink-0">{key}</span>
                  <span className="text-xs font-medium text-stone-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mood Keywords */}
        <div>
          <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-3">
            Mood Keywords
          </p>
          <div className="flex flex-wrap gap-2">
            {data.moodKeywords.map((kw, i) => (
              <span key={i} className="tag-accent">{kw}</span>
            ))}
          </div>
        </div>

        {/* Decor Rules */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
              Decor Rules
            </p>
            <ul className="space-y-1.5">
              {data.decorRules.map((rule, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
              Forbidden Patterns
            </p>
            <ul className="space-y-1.5">
              {data.forbiddenPatterns.map((fp, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  {fp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
