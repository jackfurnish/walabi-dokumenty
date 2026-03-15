import { z } from 'zod'

// ============================================================
// Zod schemas for all pipeline module outputs
// ============================================================

export const SpaceAnalysisSchema = z.object({
  roomType: z.enum(['hotel-room', 'boutique-suite', 'apartment-bedroom']),
  detectedIssues: z.array(z.string()),
  focalPoint: z.string(),
  lightingQuality: z.enum(['poor', 'average', 'good', 'excellent']),
  lightingNotes: z.string(),
  redesignOpportunities: z.array(z.string()),
  existingStrengths: z.array(z.string()),
  confidenceScore: z.number().min(0).max(100),
  summary: z.string(),
})

export const RedesignActionSchema = z.enum(['keep', 'replace', 'add', 'remove'])

export const FurnitureRecommendationSchema = z.object({
  item: z.string(),
  action: RedesignActionSchema,
  reason: z.string(),
})

export const RedesignStrategySchema = z.object({
  designDirection: z.string(),
  targetGuestEmotion: z.string(),
  furnitureRecommendations: z.array(FurnitureRecommendationSchema),
  lightingRecommendations: z.array(z.string()),
  textileRecommendations: z.array(z.string()),
  costEffortRatio: z.enum(['low-cost-high-impact', 'medium-investment', 'premium-full-scope']),
  estimatedImpact: z.string(),
  priorityActions: z.array(z.string()),
  summary: z.string(),
})

export const ColorPaletteSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  neutral: z.string(),
  notes: z.string(),
})

export const MaterialPaletteSchema = z.object({
  wood: z.string(),
  textile: z.string(),
  metal: z.string(),
  stone: z.string(),
  notes: z.string(),
})

export const StyleDirectionSchema = z.object({
  styleFamily: z.string(),
  styleDescription: z.string(),
  colorPalette: ColorPaletteSchema,
  materialPalette: MaterialPaletteSchema,
  decorRules: z.array(z.string()),
  forbiddenPatterns: z.array(z.string()),
  keyReferences: z.array(z.string()),
  moodKeywords: z.array(z.string()),
})

export const FurniturePieceSchema = z.object({
  name: z.string(),
  role: z.enum(['hero', 'supporting', 'accent']),
  material: z.string(),
  finish: z.string(),
  dimensions: z.string(),
  notes: z.string(),
  manufacturabilityNote: z.string(),
})

export const FurnitureConceptSchema = z.object({
  heroPieces: z.array(FurniturePieceSchema),
  supportingPieces: z.array(FurniturePieceSchema),
  accentPieces: z.array(FurniturePieceSchema),
  textiles: z.array(z.string()),
  lighting: z.array(z.string()),
  practicalNotes: z.array(z.string()),
  walabiProductionNotes: z.string(),
})

export const RenderPromptPackageSchema = z.object({
  masterPrompt: z.string(),
  styleModifiers: z.array(z.string()),
  lightingInstructions: z.string(),
  cameraAngle: z.string(),
  negativePrompt: z.string(),
  technicalSpec: z.string(),
  promptVariants: z.array(z.string()),
})

export const InvestorSummarySchema = z.object({
  conceptTitle: z.string(),
  elevatorPitch: z.string(),
  designNarrative: z.string(),
  businessImpact: z.string(),
  proposedScope: z.array(z.string()),
  estimatedTimeline: z.string(),
  guestPerceptionUpgrade: z.string(),
  walabiRoleStatement: z.string(),
  callToAction: z.string(),
})

export const PipelineOutputSchema = z.object({
  spaceAnalysis: SpaceAnalysisSchema,
  redesignStrategy: RedesignStrategySchema,
  styleDirection: StyleDirectionSchema,
  furnitureConcept: FurnitureConceptSchema,
  renderPromptPackage: RenderPromptPackageSchema,
  investorSummary: InvestorSummarySchema,
})

// Type inference
export type FurniturePiece = z.infer<typeof FurniturePieceSchema>
export type FurnitureRecommendation = z.infer<typeof FurnitureRecommendationSchema>
export type SpaceAnalysis = z.infer<typeof SpaceAnalysisSchema>
export type RedesignStrategy = z.infer<typeof RedesignStrategySchema>
export type StyleDirection = z.infer<typeof StyleDirectionSchema>
export type FurnitureConcept = z.infer<typeof FurnitureConceptSchema>
export type RenderPromptPackage = z.infer<typeof RenderPromptPackageSchema>
export type InvestorSummary = z.infer<typeof InvestorSummarySchema>
export type PipelineOutput = z.infer<typeof PipelineOutputSchema>
