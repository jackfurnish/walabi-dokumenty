import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProjectRecord, PipelineStatus } from '@/lib/schemas/project'
import type { PipelineOutput } from '@/lib/schemas/pipeline'

// ============================================================
// WALABI Project Store — Zustand with localStorage persistence
// ============================================================

interface ProjectStore {
  projects: ProjectRecord[]
  _hasHydrated: boolean
  setHasHydrated: (v: boolean) => void

  // CRUD
  createProject: (project: ProjectRecord) => void
  updateProject: (id: string, updates: Partial<ProjectRecord>) => void
  deleteProject: (id: string) => void
  getProject: (id: string) => ProjectRecord | undefined

  // Pipeline state management
  setProjectStatus: (id: string, status: PipelineStatus) => void
  setProjectOutput: (id: string, output: PipelineOutput) => void
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),

      createProject: (project) =>
        set((state) => ({
          projects: [project, ...state.projects],
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      getProject: (id) => get().projects.find((p) => p.id === id),

      setProjectStatus: (id, status) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, status, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      setProjectOutput: (id, output) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? {
                  ...p,
                  output,
                  status: 'complete' as PipelineStatus,
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        })),
    }),
    {
      name: 'walabi-projects',
      version: 2,
      // v1→v2: renamed imageDataUrl→imageDataUrls, imageFileName→imageFileNames
      migrate: (stored: unknown) => {
        const s = stored as { projects?: unknown[] }
        if (!s?.projects) return { projects: [] }
        return {
          projects: s.projects.map((p: unknown) => {
            const proj = p as Record<string, unknown>
            const input = (proj.input ?? {}) as Record<string, unknown>
            return {
              ...proj,
              input: {
                ...input,
                imageDataUrls: (input.imageDataUrls as string[] | undefined) ?? [],
                imageFileNames: (input.imageFileNames as string[] | undefined) ?? [],
              },
            }
          }),
        }
      },
      // Strip images before saving to localStorage — base64 blows the 5MB quota
      partialize: (state) => ({
        projects: state.projects.map((p) => ({
          ...p,
          input: { ...p.input, imageDataUrls: [], imageFileNames: [] },
        })),
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
