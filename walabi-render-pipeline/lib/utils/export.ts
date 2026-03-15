import { getRoomTypeLabel, getStyleLabel, getBudgetTierLabel } from '@/constants/options'
import { formatDateTime } from './helpers'
import type { ProjectRecord } from '@/lib/schemas/project'

// ============================================================
// Markdown Export Generator
// ============================================================

export function generateMarkdownExport(project: ProjectRecord): string {
  const { input, output, createdAt } = project

  if (!output) return `# ${input.projectName}\n\nNo output generated yet.`

  const {
    spaceAnalysis,
    redesignStrategy,
    styleDirection,
    furnitureConcept,
    renderPromptPackage,
    investorSummary,
  } = output

  const lines: string[] = []

  const h = (level: number, text: string) => lines.push(`${'#'.repeat(level)} ${text}`)
  const p = (text: string) => lines.push(text)
  const br = () => lines.push('')
  const hr = () => lines.push('---')
  const li = (text: string) => lines.push(`- ${text}`)
  const ol = (items: string[]) => items.forEach((item, i) => lines.push(`${i + 1}. ${item}`))

  // Header
  h(1, `WALABI Render Pipeline — ${input.projectName}`)
  br()
  p(`**Created:** ${formatDateTime(createdAt)}`)
  p(`**Room Type:** ${getRoomTypeLabel(input.roomType)}`)
  p(`**Style:** ${getStyleLabel(input.style)}`)
  p(`**Budget Tier:** ${getBudgetTierLabel(input.budgetTier)}`)
  if (input.notes) p(`**Notes:** ${input.notes}`)
  br()
  hr()

  // A — Space Analysis
  h(2, 'A. Space Analysis')
  br()
  p(spaceAnalysis.summary)
  br()
  p(`**Focal Point:** ${spaceAnalysis.focalPoint}`)
  p(`**Lighting Quality:** ${spaceAnalysis.lightingQuality} — ${spaceAnalysis.lightingNotes}`)
  p(`**Confidence Score:** ${spaceAnalysis.confidenceScore}%`)
  br()
  h(3, 'Detected Issues')
  spaceAnalysis.detectedIssues.forEach(i => li(i))
  br()
  h(3, 'Redesign Opportunities')
  spaceAnalysis.redesignOpportunities.forEach(i => li(i))
  br()
  h(3, 'Existing Strengths')
  spaceAnalysis.existingStrengths.forEach(i => li(i))
  br()
  hr()

  // B — Redesign Strategy
  h(2, 'B. Redesign Strategy')
  br()
  p(redesignStrategy.summary)
  br()
  p(`**Design Direction:** ${redesignStrategy.designDirection}`)
  p(`**Target Guest Emotion:** ${redesignStrategy.targetGuestEmotion}`)
  p(`**Cost-Effort Ratio:** ${redesignStrategy.costEffortRatio}`)
  p(`**Expected Impact:** ${redesignStrategy.estimatedImpact}`)
  br()
  h(3, 'Furniture Recommendations')
  redesignStrategy.furnitureRecommendations.forEach(r =>
    li(`[${r.action.toUpperCase()}] **${r.item}** — ${r.reason}`)
  )
  br()
  h(3, 'Priority Actions')
  ol(redesignStrategy.priorityActions)
  br()
  hr()

  // C — Style Direction
  h(2, 'C. WALABI Style Direction')
  br()
  p(`**Style Family:** ${styleDirection.styleFamily}`)
  br()
  p(styleDirection.styleDescription)
  br()
  h(3, 'Color Palette')
  p(`- Primary: ${styleDirection.colorPalette.primary}`)
  p(`- Secondary: ${styleDirection.colorPalette.secondary}`)
  p(`- Accent: ${styleDirection.colorPalette.accent}`)
  p(`- Neutral: ${styleDirection.colorPalette.neutral}`)
  br()
  h(3, 'Material Palette')
  p(`- Wood: ${styleDirection.materialPalette.wood}`)
  p(`- Textile: ${styleDirection.materialPalette.textile}`)
  p(`- Metal: ${styleDirection.materialPalette.metal}`)
  p(`- Stone: ${styleDirection.materialPalette.stone}`)
  br()
  h(3, 'Decor Rules')
  styleDirection.decorRules.forEach(r => li(r))
  br()
  h(3, 'Forbidden Patterns')
  styleDirection.forbiddenPatterns.forEach(r => li(r))
  br()
  hr()

  // D — Furniture Concept
  h(2, 'D. Furniture Concept')
  br()
  const allPieces = [
    ...furnitureConcept.heroPieces,
    ...furnitureConcept.supportingPieces,
    ...furnitureConcept.accentPieces,
  ]
  allPieces.forEach(piece => {
    h(3, `${piece.name} _(${piece.role})_`)
    p(`- Material: ${piece.material}`)
    p(`- Finish: ${piece.finish}`)
    p(`- Dimensions: ${piece.dimensions}`)
    if (piece.notes) p(`- Notes: ${piece.notes}`)
    if (piece.manufacturabilityNote) p(`- Production: ${piece.manufacturabilityNote}`)
    br()
  })
  if (furnitureConcept.textiles.length) {
    h(3, 'Textiles')
    furnitureConcept.textiles.forEach(t => li(t))
    br()
  }
  if (furnitureConcept.lighting.length) {
    h(3, 'Lighting')
    furnitureConcept.lighting.forEach(l => li(l))
    br()
  }
  p(`**WALABI Production Notes:** ${furnitureConcept.walabiProductionNotes}`)
  br()
  hr()

  // E — Render Prompt
  h(2, 'E. Render Master Prompt')
  br()
  lines.push('```')
  lines.push(renderPromptPackage.masterPrompt)
  lines.push('```')
  br()
  p(`**Camera Angle:** ${renderPromptPackage.cameraAngle}`)
  p(`**Lighting:** ${renderPromptPackage.lightingInstructions}`)
  p(`**Technical Spec:** ${renderPromptPackage.technicalSpec}`)
  br()
  h(3, 'Negative Prompt')
  lines.push('```')
  lines.push(renderPromptPackage.negativePrompt)
  lines.push('```')
  br()
  hr()

  // F — Investor Summary
  h(2, 'F. Investor Summary')
  br()
  h(3, investorSummary.conceptTitle)
  br()
  p(`> ${investorSummary.elevatorPitch}`)
  br()
  p(investorSummary.designNarrative)
  br()
  h(3, 'Business Impact')
  p(investorSummary.businessImpact)
  br()
  h(3, 'Proposed Scope')
  ol(investorSummary.proposedScope)
  br()
  p(`**Timeline:** ${investorSummary.estimatedTimeline}`)
  br()
  h(3, 'Guest Perception Upgrade')
  p(investorSummary.guestPerceptionUpgrade)
  br()
  p(`**WALABI Role:** ${investorSummary.walabiRoleStatement}`)
  br()
  p(`**Call to Action:** ${investorSummary.callToAction}`)
  br()
  hr()
  br()
  p('_Generated by WALABI Render Pipeline MVP — walabi.pl_')

  return lines.join('\n')
}
