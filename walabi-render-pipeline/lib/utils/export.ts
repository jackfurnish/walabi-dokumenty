import { getRoomTypeLabel, getStyleLabel, getBudgetTierLabel } from '@/constants/options'
import { formatDateTime } from './helpers'
import type { ProjectRecord } from '@/lib/schemas/project'

// ============================================================
// Markdown Export Generator
// ============================================================

export function generateMarkdownExport(project: ProjectRecord): string {
  const { input, output, createdAt } = project

  if (!output) return `# ${input.projectName}\n\nBrak wygenerowanego wyniku.`

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
  p(`**Utworzono:** ${formatDateTime(createdAt)}`)
  p(`**Typ pokoju:** ${getRoomTypeLabel(input.roomType)}`)
  p(`**Styl:** ${getStyleLabel(input.style)}`)
  p(`**Budżet:** ${getBudgetTierLabel(input.budgetTier)}`)
  if (input.notes) p(`**Notatki:** ${input.notes}`)
  br()
  hr()

  // A — Space Analysis
  h(2, 'A. Analiza Przestrzeni')
  br()
  p(spaceAnalysis.summary)
  br()
  p(`**Punkt Centralny:** ${spaceAnalysis.focalPoint}`)
  p(`**Jakość Oświetlenia:** ${spaceAnalysis.lightingQuality} — ${spaceAnalysis.lightingNotes}`)
  p(`**Wskaźnik Pewności:** ${spaceAnalysis.confidenceScore}%`)
  br()
  h(3, 'Wykryte Problemy')
  spaceAnalysis.detectedIssues.forEach(i => li(i))
  br()
  h(3, 'Możliwości Redesignu')
  spaceAnalysis.redesignOpportunities.forEach(i => li(i))
  br()
  h(3, 'Istniejące Mocne Strony')
  spaceAnalysis.existingStrengths.forEach(i => li(i))
  br()
  hr()

  // B — Redesign Strategy
  h(2, 'B. Strategia Redesignu')
  br()
  p(redesignStrategy.summary)
  br()
  p(`**Kierunek Projektowy:** ${redesignStrategy.designDirection}`)
  p(`**Docelowe Emocje Gości:** ${redesignStrategy.targetGuestEmotion}`)
  p(`**Wskaźnik Kosztów i Nakładu:** ${redesignStrategy.costEffortRatio}`)
  p(`**Oczekiwany Wpływ:** ${redesignStrategy.estimatedImpact}`)
  br()
  h(3, 'Rekomendacje Meblowe')
  redesignStrategy.furnitureRecommendations.forEach(r =>
    li(`[${r.action.toUpperCase()}] **${r.item}** — ${r.reason}`)
  )
  br()
  h(3, 'Działania Priorytetowe')
  ol(redesignStrategy.priorityActions)
  br()
  hr()

  // C — Style Direction
  h(2, 'C. Kierunek Stylistyczny WALABI')
  br()
  p(`**Rodzina Stylistyczna:** ${styleDirection.styleFamily}`)
  br()
  p(styleDirection.styleDescription)
  br()
  h(3, 'Paleta Kolorów')
  p(`- Główny: ${styleDirection.colorPalette.primary}`)
  p(`- Drugorzędny: ${styleDirection.colorPalette.secondary}`)
  p(`- Akcentowy: ${styleDirection.colorPalette.accent}`)
  p(`- Neutralny: ${styleDirection.colorPalette.neutral}`)
  br()
  h(3, 'Paleta Materiałów')
  p(`- Drewno: ${styleDirection.materialPalette.wood}`)
  p(`- Tkanina: ${styleDirection.materialPalette.textile}`)
  p(`- Metal: ${styleDirection.materialPalette.metal}`)
  p(`- Kamień: ${styleDirection.materialPalette.stone}`)
  br()
  h(3, 'Zasady Dekoracji')
  styleDirection.decorRules.forEach(r => li(r))
  br()
  h(3, 'Zakazane Wzorce')
  styleDirection.forbiddenPatterns.forEach(r => li(r))
  br()
  hr()

  // D — Furniture Concept
  h(2, 'D. Koncepcja Mebli')
  br()
  const allPieces = [
    ...furnitureConcept.heroPieces,
    ...furnitureConcept.supportingPieces,
    ...furnitureConcept.accentPieces,
  ]
  allPieces.forEach(piece => {
    h(3, `${piece.name} _(${piece.role})_`)
    p(`- Materiał: ${piece.material}`)
    p(`- Wykończenie: ${piece.finish}`)
    p(`- Wymiary: ${piece.dimensions}`)
    if (piece.notes) p(`- Notatki: ${piece.notes}`)
    if (piece.manufacturabilityNote) p(`- Produkcja: ${piece.manufacturabilityNote}`)
    br()
  })
  if (furnitureConcept.textiles.length) {
    h(3, 'Tkaniny')
    furnitureConcept.textiles.forEach(t => li(t))
    br()
  }
  if (furnitureConcept.lighting.length) {
    h(3, 'Oświetlenie')
    furnitureConcept.lighting.forEach(l => li(l))
    br()
  }
  p(`**Notatki Produkcyjne WALABI:** ${furnitureConcept.walabiProductionNotes}`)
  br()
  hr()

  // E — Render Prompt
  h(2, 'E. Prompty Renderowania')
  br()
  lines.push('```')
  lines.push(renderPromptPackage.masterPrompt)
  lines.push('```')
  br()
  p(`**Kąt Kamery:** ${renderPromptPackage.cameraAngle}`)
  p(`**Oświetlenie:** ${renderPromptPackage.lightingInstructions}`)
  p(`**Specyfikacja Techniczna:** ${renderPromptPackage.technicalSpec}`)
  br()
  h(3, 'Prompt Negatywny')
  lines.push('```')
  lines.push(renderPromptPackage.negativePrompt)
  lines.push('```')
  br()
  hr()

  // F — Investor Summary
  h(2, 'F. Podsumowanie Inwestorskie')
  br()
  h(3, investorSummary.conceptTitle)
  br()
  p(`> ${investorSummary.elevatorPitch}`)
  br()
  p(investorSummary.designNarrative)
  br()
  h(3, 'Wpływ Biznesowy')
  p(investorSummary.businessImpact)
  br()
  h(3, 'Proponowany Zakres')
  ol(investorSummary.proposedScope)
  br()
  p(`**Harmonogram:** ${investorSummary.estimatedTimeline}`)
  br()
  h(3, 'Modernizacja Percepcji Gości')
  p(investorSummary.guestPerceptionUpgrade)
  br()
  p(`**Rola WALABI:** ${investorSummary.walabiRoleStatement}`)
  br()
  p(`**Wezwanie do Działania:** ${investorSummary.callToAction}`)
  br()
  hr()
  br()
  p('_Wygenerowane przez WALABI Render Pipeline — walabi.pl_')

  return lines.join('\n')
}
