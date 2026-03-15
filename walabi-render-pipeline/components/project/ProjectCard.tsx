'use client'

import Link from 'next/link'
import { Trash2, ArrowRight, Calendar } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { getRoomTypeLabel, getStyleLabel, getBudgetTierLabel } from '@/constants/options'
import { formatDate } from '@/lib/utils/helpers'
import type { ProjectRecord } from '@/lib/schemas/project'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

interface ProjectCardProps {
  project: ProjectRecord
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const { input } = project
  const { lang } = useLanguage()

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="aspect-[16/9] bg-stone-100 overflow-hidden">
        {input.imageDataUrls[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={input.imageDataUrls[0]}
            alt={input.projectName}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-stone-400">{t('card', 'noImage', lang)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-stone-800 leading-snug line-clamp-2">
            {input.projectName}
          </h3>
          <StatusBadge status={project.status} className="flex-shrink-0" />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            getRoomTypeLabel(input.roomType, lang),
            getStyleLabel(input.style, lang),
            getBudgetTierLabel(input.budgetTier, lang),
          ].map((tag) => (
            <span key={tag} className="tag-neutral">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(project.createdAt)}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                onDelete(project.id)
              }}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label={t('card', 'delete', lang)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <Link
              href={`/project/${project.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 text-stone-50 rounded-lg text-xs font-medium hover:bg-stone-700 transition-colors"
            >
              {t('card', 'open', lang)}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
