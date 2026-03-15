import type { ProjectRecord } from '@/lib/schemas/project'
import { runSpaceAnalyzer } from '@/lib/pipeline/spaceAnalyzer'
import { runRedesignStrategist } from '@/lib/pipeline/redesignStrategist'
import { runStyleDirector } from '@/lib/pipeline/styleDirector'
import { runFurnitureConcept } from '@/lib/pipeline/furnitureConcept'
import { runRenderPromptGenerator } from '@/lib/pipeline/renderPromptGenerator'
import { runInvestorSummary } from '@/lib/pipeline/investorSummary'
import type { ProjectInput } from '@/lib/schemas/project'

// ============================================================
// Demo project — seeded for first-time visitors
// Shows a complete pipeline output without requiring a photo upload
// ============================================================

const DEMO_INPUT: ProjectInput = {
  projectName: 'Grand Majestic Hotel · Japandi Suite Concept',
  roomType: 'boutique-suite',
  style: 'japandi-hospitality',
  budgetTier: 'medium-upgrade',
  imageDataUrls: [],
  imageFileNames: [],
  notes: 'Client is considering a soft relaunch of their suite category. No structural work permitted.',
}

export function buildDemoProject(): ProjectRecord {
  const spaceAnalysis    = runSpaceAnalyzer(DEMO_INPUT)
  const redesignStrategy = runRedesignStrategist(DEMO_INPUT, spaceAnalysis)
  const styleDirection   = runStyleDirector(DEMO_INPUT)
  const furnitureConcept = runFurnitureConcept(DEMO_INPUT, redesignStrategy, styleDirection)
  const renderPrompt     = runRenderPromptGenerator(DEMO_INPUT, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)
  const investorSummary  = runInvestorSummary(DEMO_INPUT, spaceAnalysis, redesignStrategy, styleDirection, furnitureConcept)

  return {
    id: 'demo-project-walabi-001',
    createdAt: '2026-03-15T09:00:00.000Z',
    updatedAt: '2026-03-15T09:00:30.000Z',
    status: 'complete',
    input: DEMO_INPUT,
    output: {
      spaceAnalysis,
      redesignStrategy,
      styleDirection,
      furnitureConcept,
      renderPromptPackage: renderPrompt,
      investorSummary,
    },
  }
}
