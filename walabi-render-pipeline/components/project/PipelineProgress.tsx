'use client'

import { cn } from '@/lib/utils/cn'
import type { PipelineStatus } from '@/lib/schemas/project'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t, translations } from '@/lib/i18n/translations'

interface PipelineProgressProps {
  status: PipelineStatus
}

type PipelineLabelKey = keyof typeof translations['pipeline']

const PIPELINE_STEP_KEYS: { key: PipelineStatus; labelKey: PipelineLabelKey }[] = [
  { key: 'analyzing',    labelKey: 'analyzing' },
  { key: 'strategizing', labelKey: 'strategizing' },
  { key: 'styling',      labelKey: 'styling' },
  { key: 'concepting',   labelKey: 'concepting' },
  { key: 'prompting',    labelKey: 'prompting' },
  { key: 'summarizing',  labelKey: 'summarizing' },
]

const ORDER = ['idle', 'analyzing', 'strategizing', 'styling', 'concepting', 'prompting', 'summarizing', 'complete']

function getStepIndex(status: PipelineStatus): number {
  return ORDER.indexOf(status)
}

export function PipelineProgress({ status }: PipelineProgressProps) {
  const currentIndex = getStepIndex(status)
  const { lang } = useLanguage()

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6">
      <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-5">
        {t('pipeline', 'running', lang)}
      </p>
      <div className="space-y-3">
        {PIPELINE_STEP_KEYS.map((step) => {
          const stepIndex = getStepIndex(step.key)
          const isDone    = stepIndex < currentIndex
          const isActive  = step.key === status
          const isPending = stepIndex > currentIndex

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border transition-all',
                isDone    && 'bg-emerald-500 border-emerald-500',
                isActive  && 'border-stone-600 bg-white',
                isPending && 'border-stone-200 bg-stone-50',
              )}>
                {isDone && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                )}
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-stone-600 animate-pulse" />
                )}
              </div>

              <span className={cn(
                'text-sm transition-colors',
                isDone    && 'text-stone-400 line-through decoration-stone-300',
                isActive  && 'text-stone-800 font-medium',
                isPending && 'text-stone-400',
              )}>
                {t('pipeline', step.labelKey, lang)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
