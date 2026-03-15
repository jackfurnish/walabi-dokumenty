'use client'

import { useState, useEffect } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProjectCard } from '@/components/project/ProjectCard'
import { useProjectStore } from '@/store/projectStore'
import Link from 'next/link'
import { PlusIcon, FlaskConical } from 'lucide-react'
import { toast } from '@/components/ui/Toaster'
import { buildDemoProject } from '@/lib/utils/demoProject'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

export default function ProjectsPage() {
  const { projects, deleteProject, createProject } = useProjectStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const { lang } = useLanguage()

  // Seed demo project on first visit if library is empty
  useEffect(() => {
    const hasDemo = projects.some(p => p.id === 'demo-project-walabi-001')
    if (projects.length === 0 && !hasDemo) {
      createProject(buildDemoProject())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id: string) => {
    if (confirm(t('projects', 'deleteConfirm', lang))) {
      deleteProject(id)
      toast({ title: t('projects', 'projectDeleted', lang), variant: 'default' })
    }
  }

  const handleLoadDemo = () => {
    const hasDemo = projects.some(p => p.id === 'demo-project-walabi-001')
    if (!hasDemo) {
      createProject(buildDemoProject())
      toast({ title: t('projects', 'demoLoaded', lang), description: 'Grand Majestic Hotel · Japandi Suite', variant: 'success' })
    } else {
      toast({ title: t('projects', 'demoAlreadyIn', lang), variant: 'default' })
    }
  }

  if (!mounted) return (
    <PageWrapper>
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="w-6 h-6 rounded-full border-2 border-stone-300 border-t-stone-700 animate-spin" />
      </div>
    </PageWrapper>
  )

  const projectCountLabel = projects.length === 1
    ? `1 ${t('projects', 'projectSaved', lang)}`
    : `${projects.length} ${t('projects', 'projectsSaved', lang)}`

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="label-overline mb-3">{t('projects', 'overline', lang)}</p>
          <h1 className="font-display text-4xl font-medium text-stone-800">
            {t('projects', 'heading', lang)}
          </h1>
          <p className="text-stone-500 mt-2">
            {projects.length === 0
              ? t('projects', 'noProjectsYet', lang)
              : projectCountLabel}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLoadDemo}
            className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 bg-white text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            <FlaskConical className="w-4 h-4" />
            {t('projects', 'loadDemo', lang)}
          </button>
          <Link
            href="/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-stone-50 rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            {t('projects', 'newProject', lang)}
          </Link>
        </div>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="border-2 border-dashed border-stone-200 rounded-2xl py-24 flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-2xl">
            🏨
          </div>
          <div className="text-center">
            <p className="text-stone-600 font-medium mb-1">{t('projects', 'emptyTitle', lang)}</p>
            <p className="text-sm text-stone-400 max-w-sm">
              {t('projects', 'emptyBody', lang)}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleLoadDemo}
              className="flex items-center gap-2 px-5 py-2.5 border border-stone-300 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
            >
              <FlaskConical className="w-4 h-4" />
              {t('projects', 'viewDemoProject', lang)}
            </button>
            <Link
              href="/new"
              className="flex items-center gap-2 px-6 py-3 bg-stone-800 text-stone-50 rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              {t('projects', 'startRedesign', lang)}
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
