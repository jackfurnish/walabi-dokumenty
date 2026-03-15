'use client'

import { Lightbulb, ArrowRight } from 'lucide-react'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import { cn } from '@/lib/utils/cn'
import type { RedesignStrategy } from '@/lib/schemas/pipeline'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

interface RedesignStrategySectionProps {
  data: RedesignStrategy
}

const actionStyles: Record<string, { label: { pl: string; en: string }; classes: string }> = {
  keep:    { label: { pl: 'Zachowaj',  en: 'Keep' },    classes: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  replace: { label: { pl: 'Wymień',    en: 'Replace' }, classes: 'bg-red-50 text-red-600 border-red-100' },
  add:     { label: { pl: 'Dodaj',     en: 'Add' },     classes: 'bg-blue-50 text-blue-600 border-blue-100' },
  remove:  { label: { pl: 'Usuń',      en: 'Remove' },  classes: 'bg-stone-100 text-stone-500 border-stone-200' },
}

const costLabels: Record<string, { pl: string; en: string }> = {
  'low-cost-high-impact': { pl: 'Niski koszt · Wysoki efekt',  en: 'Low Cost · High Impact' },
  'medium-investment':    { pl: 'Średnia inwestycja',          en: 'Medium Investment' },
  'premium-full-scope':   { pl: 'Premium · Pełny zakres',      en: 'Premium Full Scope' },
}

export function RedesignStrategySection({ data }: RedesignStrategySectionProps) {
  const { lang } = useLanguage()

  return (
    <CollapsibleSection
      title={t('sections', 'redesignStrategy', lang)}
      subtitle={data.designDirection}
      icon={<Lightbulb className="w-4 h-4" />}
    >
      <div className="space-y-6">
        <p className="text-sm text-stone-600 leading-relaxed">{data.summary}</p>

        {/* Direction & Emotion */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4">
            <p className="text-xs text-stone-400 mb-1">{lang === 'pl' ? 'Kierunek designu' : 'Design Direction'}</p>
            <p className="text-sm font-semibold text-stone-800">{data.designDirection}</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4">
            <p className="text-xs text-stone-400 mb-1">{lang === 'pl' ? 'Docelowe odczucie gościa' : 'Target Guest Emotion'}</p>
            <p className="text-sm font-semibold text-stone-800">{data.targetGuestEmotion}</p>
          </div>
        </div>

        {/* Furniture Recommendations */}
        <div>
          <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-3">
            {lang === 'pl' ? 'Rekomendacje mebli' : 'Furniture Recommendations'}
          </p>
          <div className="space-y-2">
            {data.furnitureRecommendations.map((rec, i) => {
              const style = actionStyles[rec.action] ?? actionStyles.keep
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg border border-stone-100 bg-white"
                >
                  <span className={cn(
                    'flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded border',
                    style.classes
                  )}>
                    {style.label[lang]}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-stone-800">{rec.item}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{rec.reason}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Priority Actions */}
        <div>
          <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-3">
            {lang === 'pl' ? 'Priorytetowe działania' : 'Priority Actions'}
          </p>
          <ol className="space-y-2">
            {data.priorityActions.map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-stone-600">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-semibold text-stone-500">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ol>
        </div>

        {/* Lighting + Textiles */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
              {lang === 'pl' ? 'Oświetlenie' : 'Lighting'}
            </p>
            <ul className="space-y-1">
              {data.lightingRecommendations.map((r, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 mt-0.5 text-stone-300 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
              {lang === 'pl' ? 'Tekstylia' : 'Textiles'}
            </p>
            <ul className="space-y-1">
              {data.textileRecommendations.map((r, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 mt-0.5 text-stone-300 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-6 pt-3 border-t border-stone-100">
          <div>
            <p className="text-xs text-stone-400 mb-0.5">{lang === 'pl' ? 'Logika kosztów' : 'Cost-Effort Logic'}</p>
            <p className="text-xs font-medium text-stone-700">
              {costLabels[data.costEffortRatio]?.[lang] ?? data.costEffortRatio}
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-0.5">{lang === 'pl' ? 'Oczekiwany efekt' : 'Expected Impact'}</p>
            <p className="text-xs font-medium text-stone-700">{data.estimatedImpact}</p>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
