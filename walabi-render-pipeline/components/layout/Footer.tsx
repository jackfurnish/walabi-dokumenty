'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

export function Footer() {
  const { lang } = useLanguage()

  return (
    <footer className="border-t border-stone-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xs text-stone-400">
          © {new Date().getFullYear()} WALABI — {t('footer', 'tagline', lang)}
        </span>
        <span className="text-xs text-stone-400">
          {t('footer', 'version', lang)}
        </span>
      </div>
    </footer>
  )
}
