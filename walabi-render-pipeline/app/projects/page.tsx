'use client'

import { useEffect } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProjectCard } from '@/components/project/ProjectCard'
import { useProjectStore } from '@/store/projectStore'
import Link from 'next/link'
import { PlusIcon, FlaskConical } from 'lucide-react'
import { toast } from '@/components/ui/Toaster'
import { buildDemoProject } from '@/lib/utils/demoProject'

export default function ProjectsPage() {
  const { projects, deleteProject, createProject } = useProjectStore()

  // Seed demo project on first visit if library is empty
  useEffect(() => {
    const hasDemo = projects.some(p => p.id === 'demo-project-walabi-001')
    if (projects.length === 0 && !hasDemo) {
      createProject(buildDemoProject())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('Delete this project? This cannot be undone.')) {
      deleteProject(id)
      toast({ title: 'Project deleted', variant: 'default' })
    }
  }

  const handleLoadDemo = () => {
    const hasDemo = projects.some(p => p.id === 'demo-project-walabi-001')
    if (!hasDemo) {
      createProject(buildDemoProject())
      toast({ title: 'Demo project loaded', description: 'Grand Majestic Hotel · Japandi Suite', variant: 'success' })
    } else {
      toast({ title: 'Demo project already in library', variant: 'default' })
    }
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="label-overline mb-3">Project Library</p>
          <h1 className="font-display text-4xl font-medium text-stone-800">
            Your Redesign Concepts
          </h1>
          <p className="text-stone-500 mt-2">
            {projects.length === 0
              ? 'No projects yet. Start by creating your first redesign concept.'
              : `${projects.length} project${projects.length !== 1 ? 's' : ''} saved locally`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLoadDemo}
            className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 bg-white text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            <FlaskConical className="w-4 h-4" />
            Load Demo
          </button>
          <Link
            href="/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-stone-50 rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            New Project
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
            <p className="text-stone-600 font-medium mb-1">No redesign concepts yet</p>
            <p className="text-sm text-stone-400 max-w-sm">
              Upload a hotel room photo and configure the redesign parameters
              to generate your first concept package.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleLoadDemo}
              className="flex items-center gap-2 px-5 py-2.5 border border-stone-300 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
            >
              <FlaskConical className="w-4 h-4" />
              View Demo Project
            </button>
            <Link
              href="/new"
              className="flex items-center gap-2 px-6 py-3 bg-stone-800 text-stone-50 rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Start a Redesign
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
