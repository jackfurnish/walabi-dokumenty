'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'

interface CollapsibleSectionProps {
  title: string
  subtitle?: string
  badge?: string
  badgeVariant?: 'neutral' | 'accent' | 'success'
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function CollapsibleSection({
  title,
  subtitle,
  badge,
  badgeVariant = 'neutral',
  icon,
  defaultOpen = false,
  children,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const badgeClasses = {
    neutral: 'tag-neutral',
    accent:  'tag-accent',
    success: 'tag-success',
  }

  return (
    <div className={cn('card-premium overflow-hidden', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-stone-50/80 transition-colors"
      >
        {icon && (
          <span className="text-stone-400 flex-shrink-0">{icon}</span>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-stone-800">{title}</span>
            {badge && (
              <span className={badgeClasses[badgeVariant]}>{badge}</span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-stone-400 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>

        <ChevronDown
          className={cn(
            'w-4 h-4 text-stone-400 flex-shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-stone-100 px-6 py-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
