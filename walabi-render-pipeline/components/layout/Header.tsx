'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { PlusIcon, FolderOpenIcon } from 'lucide-react'

const navLinks = [
  { href: '/projects', label: 'Projects', icon: FolderOpenIcon },
]

export function Header() {
  const pathname = usePathname()

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
              Render Pipeline
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
            New Project
          </Link>
        </nav>
      </div>
    </header>
  )
}
