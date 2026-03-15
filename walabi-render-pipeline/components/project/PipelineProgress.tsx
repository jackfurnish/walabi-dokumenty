import { cn } from '@/lib/utils/cn'
import type { PipelineStatus } from '@/lib/schemas/project'

interface PipelineProgressProps {
  status: PipelineStatus
}

const PIPELINE_STEPS: { key: PipelineStatus; label: string }[] = [
  { key: 'analyzing',    label: 'Analyzing space' },
  { key: 'strategizing', label: 'Building strategy' },
  { key: 'styling',      label: 'Defining style' },
  { key: 'concepting',   label: 'Concepting furniture' },
  { key: 'prompting',    label: 'Generating prompt' },
  { key: 'summarizing',  label: 'Writing summary' },
]

const ORDER = ['idle', 'analyzing', 'strategizing', 'styling', 'concepting', 'prompting', 'summarizing', 'complete']

function getStepIndex(status: PipelineStatus): number {
  return ORDER.indexOf(status)
}

export function PipelineProgress({ status }: PipelineProgressProps) {
  const currentIndex = getStepIndex(status)

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6">
      <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-5">
        Pipeline Running
      </p>
      <div className="space-y-3">
        {PIPELINE_STEPS.map((step) => {
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
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
