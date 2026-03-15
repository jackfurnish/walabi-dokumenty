'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { PlusIcon, FolderOpenIcon } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

export function Header() {
  const pathname = usePathname()
  const { lang, setLang } = useLanguage()

  const navLinks = [
    { href: '/projects', label: t('nav', 'projects', lang), icon: FolderOpenIcon },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f7]/90 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-stone-800 rounded flex items-center justify-center">
            <span className="text-[10px] font-bold text-stone-100 tracking-widest">W</span>
          </div>
          <div className="leading-none">
            <span className="text-sm font-semibold text-stone-800 tracking-wide">WALABI</span>
            <span className="block text-[10px] text-stone-400 tracking-widest uppercase">
              {t('header', 'renderPipeline', lang)}
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-stone-100 text-stone-800'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          <Link
            href="/new"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2',
              pathname === '/new'
                ? 'bg-stone-800 text-stone-50'
                : 'bg-stone-800 text-stone-50 hover:bg-stone-700'
            )}
          >
            <PlusIcon className="w-4 h-4" />
            {t('nav', 'newProject', lang)}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-0 ml-3 border border-stone-200 rounded-lg overflow-hidden text-xs font-medium">
            <button
              onClick={() => setLang('pl')}
              className={cn(
                'px-2.5 py-1.5 transition-colors',
                lang === 'pl'
                  ? 'bg-stone-800 text-stone-50'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              )}
            >
              PL
            </button>
            <span className="text-stone-200 select-none">|</span>
            <button
              onClick={() => setLang('en')}
              className={cn(
                'px-2.5 py-1.5 transition-colors',
                lang === 'en'
                  ? 'bg-stone-800 text-stone-50'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              )}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
