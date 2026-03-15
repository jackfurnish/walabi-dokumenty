'use client'

import { cn } from '@/lib/utils/cn'

interface Option<T extends string> {
  value: T
  label: string
  description: string
  badge?: string
}

interface OptionSelectorProps<T extends string> {
  options: Option<T>[]
  value: T | undefined
  onChange: (value: T) => void
  columns?: 2 | 3 | 4
  error?: string
}

export function OptionSelector<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
  error,
}: OptionSelectorProps<T>) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns]

  return (
    <div className="space-y-1.5">
      <div className={cn('grid gap-3', gridClass)}>
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'relative text-left rounded-xl border p-4 transition-all duration-150',
                isSelected
                  ? 'border-stone-700 bg-stone-800 text-stone-50 shadow-sm'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
              )}
            >
              {option.badge && (
                <span className={cn(
                  'absolute top-3 right-3 text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                  isSelected
                    ? 'bg-stone-600 text-stone-200'
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                )}>
                  {option.badge}
                </span>
              )}
              <span className="block text-sm font-semibold mb-1">{option.label}</span>
              <span className={cn(
                'block text-xs leading-relaxed',
                isSelected ? 'text-stone-300' : 'text-stone-400'
              )}>
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
