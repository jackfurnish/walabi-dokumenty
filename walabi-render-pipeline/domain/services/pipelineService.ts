'use client'

import { useProjectStore } from '@/store/projectStore'
import type { PipelineOutput } from '@/lib/schemas/pipeline'
import type { PipelineStatus } from '@/lib/schemas/project'

// ============================================================
// Pipeline Service — client-side orchestrator
// Calls /api/pipeline (server-side, has access to API key)
// Animates step progress while the request runs
// ============================================================

const STEP_SEQUENCE: PipelineStatus[] = [
  'analyzing',
  'strategizing',
  'styling',
  'concepting',
  'prompting',
  'summarizing',
]

async function animateSteps(
  projectId: string,
  setStatus: (id: string, s: PipelineStatus) => void,
  totalMs: number,
  abortSignal: { aborted: boolean }
): Promise<void> {
  const stepMs = totalMs / STEP_SEQUENCE.length
  for (const step of STEP_SEQUENCE) {
    if (abortSignal.aborted) break
    setStatus(projectId, step)
    await new Promise(r => setTimeout(r, stepMs))
  }
}

export function usePipeline() {
  const { getProject, setProjectStatus, setProjectOutput, updateProject } = useProjectStore()

  const runPipeline = async (projectId: string) => {
    const project = getProject(projectId)
    if (!project) return

    try {
      setProjectStatus(projectId, 'analyzing')

      // Animation runs independently — does not gate API response time.
      // 28s total = ~4.6s per step, appropriate for Claude Opus.
      // Once API responds (fast or slow), animation is aborted immediately.
      const abortSignal = { aborted: false }
      animateSteps(projectId, setProjectStatus, 28000, abortSignal).catch(() => {})

      const response = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: project.input }),
      })

      // Stop animation — results are in
      abortSignal.aborted = true

      if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { detail?: string }
        throw new Error(err.detail ?? `API error ${response.status}`)
      }

      const data = await response.json() as { output: PipelineOutput; provider: string }

      console.info(`[Pipeline] Completed — provider: ${data.provider}`)
      setProjectOutput(projectId, data.output)

    } catch (error) {
      console.error('[Pipeline] Error:', error)
      updateProject(projectId, { status: 'error' })
    }
  }

  return { runPipeline }
}
