'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
  size?: 'sm' | 'md'
}

export function CopyButton({
  text,
  label,
  className,
  size = 'md',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const { lang } = useLanguage()

  const displayLabel = label ?? t('copy', 'copy', lang)
  const copiedLabel = t('copy', 'copied', lang)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-3 py-2 text-sm gap-2',
  }

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center font-medium rounded-lg border transition-all duration-150',
        copied
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800',
        sizeClasses[size],
        className
      )}
    >
      {copied ? (
        <>
          <Check className={iconSize[size]} />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className={iconSize[size]} />
          {displayLabel}
        </>
      )}
    </button>
  )
}
