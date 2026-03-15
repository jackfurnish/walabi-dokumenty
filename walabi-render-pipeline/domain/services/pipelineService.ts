'use client'

import { useProjectStore } from '@/store/projectStore'
import type { PipelineOutput } from '@/lib/schemas/pipeline'
import type {
  SpaceAnalysis,
  RedesignStrategy,
  StyleDirection,
  FurnitureConcept,
  RenderPromptPackage,
  InvestorSummary,
} from '@/lib/schemas/pipeline'
import type { PipelineStatus } from '@/lib/schemas/project'

// ============================================================
// Pipeline Service — client-side orchestrator
// Calls 6 sequential module endpoints to avoid Vercel 10s timeout.
// Each module runs as a separate serverless function (maxDuration=60).
// ============================================================

// Helper: call a single module endpoint and return its output
async function callModule<T>(endpoint: string, payload: unknown): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { detail?: string }
    throw new Error(err.detail ?? `API error ${response.status} from ${endpoint}`)
  }

  const data = await response.json() as { output: T; provider: string }
  return data.output
}

export function usePipeline() {
  const { getProject, setProjectStatus, setProjectOutput, updateProject } = useProjectStore()

  const runPipeline = async (projectId: string) => {
    const project = getProject(projectId)
    if (!project) return

    try {
      // ── Step 0: Analiza przestrzeni ──────────────────────
      setProjectStatus(projectId, 'analyzing')
      const spaceAnalysis = await callModule<SpaceAnalysis>(
        '/api/pipeline/space',
        { input: project.input }
      )

      // ── Step 1: Budowanie strategii ──────────────────────
      setProjectStatus(projectId, 'strategizing')
      const redesignStrategy = await callModule<RedesignStrategy>(
        '/api/pipeline/strategy',
        { input: project.input, spaceAnalysis }
      )

      // ── Step 2: Definiowanie stylu ───────────────────────
      setProjectStatus(projectId, 'styling')
      const styleDirection = await callModule<StyleDirection>(
        '/api/pipeline/style',
        { input: project.input }
      )

      // ── Step 3: Koncepcja mebli ──────────────────────────
      setProjectStatus(projectId, 'concepting')
      const furnitureConcept = await callModule<FurnitureConcept>(
        '/api/pipeline/furniture',
        { input: project.input, redesignStrategy, styleDirection }
      )

      // ── Steps 4+5: Render prompt + Investor summary (parallel) ──
      setProjectStatus(projectId, 'prompting')
      const [renderPromptPackage, investorSummary] = await Promise.all([
        callModule<RenderPromptPackage>(
          '/api/pipeline/render',
          { input: project.input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept }
        ),
        callModule<InvestorSummary>(
          '/api/pipeline/investor',
          { input: project.input, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept }
        ),
      ])
      setProjectStatus(projectId, 'summarizing')

      const output: PipelineOutput = {
        spaceAnalysis,
        redesignStrategy,
        styleDirection,
        furnitureConcept,
        renderPromptPackage,
        investorSummary,
      }

      console.info('[Pipeline] Completed — all 6 modules done')
      setProjectOutput(projectId, output)

    } catch (error) {
      console.error('[Pipeline] Error:', error)
      updateProject(projectId, { status: 'error' as PipelineStatus })
    }
  }

  return { runPipeline }
}
