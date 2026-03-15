'use client'

import { use } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ResultsWorkspace } from '@/components/project/ResultsWorkspace'
import { useProjectStore } from '@/store/projectStore'
import { ArrowLeft } from 'lucide-react'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params)
  const hasHydrated = useProjectStore((s) => s._hasHydrated)
  const project = useProjectStore((s) => s.projects.find((p) => p.id === id))

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf9f7]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-stone-300 border-t-stone-700 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf9f7]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
          <p className="text-stone-400 text-sm">Project not found</p>
          <Link href="/projects" className="text-sm font-medium text-stone-700 underline underline-offset-2">
            Back to Projects
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Projects
          </Link>
          <h1 className="font-display text-3xl font-medium text-stone-800 mt-3">
            {project.input.projectName}
          </h1>
        </div>

        <ResultsWorkspace project={project} />
      </main>
      <Footer />
    </div>
  )
}
