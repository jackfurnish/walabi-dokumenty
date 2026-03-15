import { z } from 'zod'
import { PipelineOutputSchema } from './pipeline'

// ============================================================
// Project-level schemas
// ============================================================

export const RoomTypeSchema = z.enum(['hotel-room', 'boutique-suite', 'apartment-bedroom'])
export const DesignStyleSchema = z.enum([
  'organic-modern',
  'arhaus-luxury',
  'japandi-hospitality',
  'boutique-warm-minimalism',
])
export const BudgetTierSchema = z.enum(['light-refresh', 'medium-upgrade', 'premium-redesign'])
export const PipelineStatusSchema = z.enum([
  'idle',
  'analyzing',
  'strategizing',
  'styling',
  'concepting',
  'prompting',
  'summarizing',
  'complete',
  'error',
])

export const ProjectInputSchema = z.object({
  projectName: z.string().min(1, 'Project name is required').max(80),
  roomType: RoomTypeSchema,
  style: DesignStyleSchema,
  budgetTier: BudgetTierSchema,
  imageDataUrls: z.array(z.string()).default([]),
  imageFileNames: z.array(z.string()).default([]),
  notes: z.string().max(500).optional(),
})

export const ProjectRecordSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  input: ProjectInputSchema,
  output: PipelineOutputSchema.nullable(),
  status: PipelineStatusSchema,
})

// New project form — used in form validation (image not in form schema)
export const NewProjectFormSchema = z.object({
  projectName: z.string().min(1, 'Enter a project name').max(80, 'Max 80 characters'),
  roomType: RoomTypeSchema,
  style: DesignStyleSchema,
  budgetTier: BudgetTierSchema,
  notes: z.string().max(500).optional(),
})

export type ProjectInput = z.infer<typeof ProjectInputSchema>
export type ProjectRecord = z.infer<typeof ProjectRecordSchema>
export type NewProjectFormValues = z.infer<typeof NewProjectFormSchema>
export type RoomType = z.infer<typeof RoomTypeSchema>
export type DesignStyle = z.infer<typeof DesignStyleSchema>
export type BudgetTier = z.infer<typeof BudgetTierSchema>
export type PipelineStatus = z.infer<typeof PipelineStatusSchema>
