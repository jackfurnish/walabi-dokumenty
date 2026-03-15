import { cn } from '@/lib/utils/cn'
import type { PipelineStatus } from '@/lib/schemas/project'

interface StatusBadgeProps {
  status: PipelineStatus
  className?: string
}

const statusConfig: Record<
  PipelineStatus,
  { label: string; classes: string }
> = {
  idle:         { label: 'Draft',      classes: 'bg-stone-100 text-stone-500 border-stone-200' },
  analyzing:    { label: 'Analyzing',  classes: 'bg-blue-50 text-blue-600 border-blue-100' },
  strategizing: { label: 'Planning',   classes: 'bg-violet-50 text-violet-600 border-violet-100' },
  styling:      { label: 'Styling',    classes: 'bg-amber-50 text-amber-600 border-amber-100' },
  concepting:   { label: 'Concepting', classes: 'bg-orange-50 text-orange-600 border-orange-100' },
  prompting:    { label: 'Prompting',  classes: 'bg-teal-50 text-teal-600 border-teal-100' },
  summarizing:  { label: 'Finalizing', classes: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  complete:     { label: 'Complete',   classes: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  error:        { label: 'Error',      classes: 'bg-red-50 text-red-600 border-red-100' },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.classes,
        className
      )}
    >
      {status !== 'complete' && status !== 'idle' && status !== 'error' && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {config.label}
    </span>
  )
}
