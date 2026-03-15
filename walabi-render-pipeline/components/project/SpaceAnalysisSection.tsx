'use client'

import { ScanSearch, AlertCircle, Star, Zap } from 'lucide-react'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import type { SpaceAnalysis } from '@/lib/schemas/pipeline'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

interface SpaceAnalysisSectionProps {
  data: SpaceAnalysis
}

const lightingLabels = {
  poor:      { pl: 'Słabe',     en: 'Poor',      color: 'text-red-500' },
  average:   { pl: 'Średnie',   en: 'Average',   color: 'text-amber-500' },
  good:      { pl: 'Dobre',     en: 'Good',      color: 'text-emerald-500' },
  excellent: { pl: 'Doskonałe', en: 'Excellent', color: 'text-emerald-600' },
}

export function SpaceAnalysisSection({ data }: SpaceAnalysisSectionProps) {
  const { lang } = useLanguage()
  const lighting = lightingLabels[data.lightingQuality]

  return (
    <CollapsibleSection
      title={t('sections', 'spaceAnalysis', lang)}
      subtitle={data.summary}
      badge={`${data.confidenceScore}% confidence`}
      badgeVariant="neutral"
      icon={<ScanSearch className="w-4 h-4" />}
      defaultOpen
    >
      <div className="space-y-6">
        {/* Summary */}
        <p className="text-sm text-stone-600 leading-relaxed">{data.summary}</p>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Issues */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                {lang === 'pl' ? 'Problemy wizualne' : 'Visual Issues'}
              </span>
            </div>
            <ul className="space-y-1.5">
              {data.detectedIssues.map((issue, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">·</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                {lang === 'pl' ? 'Możliwości' : 'Opportunities'}
              </span>
            </div>
            <ul className="space-y-1.5">
              {data.redesignOpportunities.map((opp, i) => (
                <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">·</span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strengths */}
        {data.existingStrengths.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                {lang === 'pl' ? 'Istniejące atuty' : 'Existing Strengths'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.existingStrengths.map((s, i) => (
                <span key={i} className="tag-neutral">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-6 pt-3 border-t border-stone-100">
          <div>
            <p className="text-xs text-stone-400 mb-0.5">{lang === 'pl' ? 'Punkt centralny' : 'Focal Point'}</p>
            <p className="text-xs font-medium text-stone-700">{data.focalPoint}</p>
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-0.5">{lang === 'pl' ? 'Oświetlenie' : 'Lighting'}</p>
            <p className={`text-xs font-medium ${lighting.color}`}>{lighting[lang]}</p>
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-0.5">{lang === 'pl' ? 'Uwagi' : 'Notes'}</p>
            <p className="text-xs text-stone-600">{data.lightingNotes}</p>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
