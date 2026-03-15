// ============================================================
// WALABI Render Pipeline — Core Domain Types
// ============================================================

// --- Enumerations ---

export type RoomType =
  | 'hotel-room'
  | 'boutique-suite'
  | 'apartment-bedroom'

export type DesignStyle =
  | 'organic-modern'
  | 'arhaus-luxury'
  | 'japandi-hospitality'
  | 'boutique-warm-minimalism'

export type BudgetTier =
  | 'light-refresh'
  | 'medium-upgrade'
  | 'premium-redesign'

export type PipelineStatus =
  | 'idle'
  | 'analyzing'
  | 'strategizing'
  | 'styling'
  | 'concepting'
  | 'prompting'
  | 'summarizing'
  | 'complete'
  | 'error'

// --- A. Space Analysis ---

export interface SpaceAnalysis {
  roomType: RoomType
  detectedIssues: string[]
  focalPoint: string
  lightingQuality: 'poor' | 'average' | 'good' | 'excellent'
  lightingNotes: string
  redesignOpportunities: string[]
  existingStrengths: string[]
  confidenceScore: number // 0–100
  summary: string
}

// --- B. Redesign Strategy ---

export type RedesignAction = 'keep' | 'replace' | 'add' | 'remove'

export interface FurnitureRecommendation {
  item: string
  action: RedesignAction
  reason: string
}

export interface RedesignStrategy {
  designDirection: string
  targetGuestEmotion: string
  furnitureRecommendations: FurnitureRecommendation[]
  lightingRecommendations: string[]
  textileRecommendations: string[]
  costEffortRatio: 'low-cost-high-impact' | 'medium-investment' | 'premium-full-scope'
  estimatedImpact: string
  priorityActions: string[]
  summary: string
}

// --- C. WALABI Style Direction ---

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  neutral: string
  notes: string
}

export interface MaterialPalette {
  wood: string
  textile: string
  metal: string
  stone: string
  notes: string
}

export interface StyleDirection {
  styleFamily: string
  styleDescription: string
  colorPalette: ColorPalette
  materialPalette: MaterialPalette
  decorRules: string[]
  forbiddenPatterns: string[]
  keyReferences: string[]
  moodKeywords: string[]
}

// --- D. Furniture Concept ---

export interface FurniturePiece {
  name: string
  role: 'hero' | 'supporting' | 'accent'
  material: string
  finish: string
  dimensions: string
  notes: string
  manufacturabilityNote: string
}

export interface FurnitureConcept {
  heroPieces: FurniturePiece[]
  supportingPieces: FurniturePiece[]
  accentPieces: FurniturePiece[]
  textiles: string[]
  lighting: string[]
  practicalNotes: string[]
  walabiProductionNotes: string
}

// --- E. Render Prompt Package ---

export interface RenderPromptPackage {
  masterPrompt: string
  styleModifiers: string[]
  lightingInstructions: string
  cameraAngle: string
  negativePrompt: string
  technicalSpec: string
  promptVariants: string[]
}

// --- F. Investor Summary ---

export interface InvestorSummary {
  conceptTitle: string
  elevatorPitch: string
  designNarrative: string
  businessImpact: string
  proposedScope: string[]
  estimatedTimeline: string
  guestPerceptionUpgrade: string
  walabiRoleStatement: string
  callToAction: string
}

// --- G. Full Pipeline Output ---

export interface PipelineOutput {
  spaceAnalysis: SpaceAnalysis
  redesignStrategy: RedesignStrategy
  styleDirection: StyleDirection
  furnitureConcept: FurnitureConcept
  renderPromptPackage: RenderPromptPackage
  investorSummary: InvestorSummary
}

// --- H. Project Input ---

export interface ProjectInput {
  projectName: string
  roomType: RoomType
  style: DesignStyle
  budgetTier: BudgetTier
  imageDataUrl: string | null
  imageFileName: string | null
  notes?: string
}

// --- I. Stored Project Record ---

export interface ProjectRecord {
  id: string
  createdAt: string
  updatedAt: string
  input: ProjectInput
  output: PipelineOutput | null
  status: PipelineStatus
}
