'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { SpaceAnalysisSection } from './SpaceAnalysisSection'
import { RedesignStrategySection } from './RedesignStrategySection'
import { StyleDirectionSection } from './StyleDirectionSection'
import { FurnitureConceptSection } from './FurnitureConceptSection'
import { RenderPromptSection } from './RenderPromptSection'
import { InvestorSummarySection } from './InvestorSummarySection'
import { PipelineProgress } from './PipelineProgress'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { getRoomTypeLabel, getStyleLabel, getBudgetTierLabel } from '@/constants/options'
import { formatDateTime } from '@/lib/utils/helpers'
import { Download } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'
import type { ProjectRecord } from '@/lib/schemas/project'
import { usePipeline } from '@/domain/services/pipelineService'
import { generateMarkdownExport } from '@/lib/utils/export'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

interface ResultsWorkspaceProps {
  project: ProjectRecord
}

export function ResultsWorkspace({ project }: ResultsWorkspaceProps) {
  const { runPipeline } = usePipeline()
  const { lang } = useLanguage()

  // Auto-run pipeline on first load if not yet complete
  useEffect(() => {
    if (project.status === 'idle') {
      runPipeline(project.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id])

  const handleDownload = () => {
    const md = generateMarkdownExport(project)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.input.projectName.replace(/[^a-z0-9]/gi, '-')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const { input, output, status } = project

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
      {/* Left panel — image + meta */}
      <div className="lg:w-80 xl:w-96 flex-shrink-0">
        <div className="sticky top-24 space-y-4">
          {/* Images */}
          {input.imageDataUrls.length > 0 ? (
            <div className={`grid gap-2 ${input.imageDataUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {input.imageDataUrls.map((url, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Room ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-[4/3]">
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-stone-50">
                <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-xl">🏨</div>
                <span className="text-xs text-stone-400">{t('workspace', 'noRoomPhoto', lang)}</span>
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-display text-lg font-medium text-stone-800 leading-snug">
                {input.projectName}
              </h1>
              <StatusBadge status={status} />
            </div>

            <div className="space-y-2">
              {[
                { label: t('workspace', 'roomLabel', lang),   value: getRoomTypeLabel(input.roomType, lang) },
                { label: t('workspace', 'styleLabel', lang),  value: getStyleLabel(input.style, lang) },
                { label: t('workspace', 'budgetLabel', lang), value: getBudgetTierLabel(input.budgetTier, lang) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-stone-400">{item.label}</span>
                  <span className="text-xs font-medium text-stone-700">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-stone-400 pt-2 border-t border-stone-100">
              {formatDateTime(project.createdAt)}
            </div>

            {input.notes && (
              <p className="text-xs text-stone-500 italic border-t border-stone-100 pt-3">
                {input.notes}
              </p>
            )}
          </div>

          {/* Actions */}
          {status === 'complete' && output && (
            <div className="space-y-2">
              <Button
                variant="outline"
                size="md"
                onClick={handleDownload}
                className="w-full"
              >
                <Download className="w-4 h-4" />
                {t('workspace', 'exportMarkdown', lang)}
              </Button>
              <CopyButton
                text={generateMarkdownExport(project)}
                label={t('copy', 'copyFullPackage', lang)}
                size="md"
                className="w-full justify-center"
              />
            </div>
          )}
        </div>
      </div>

      {/* Right panel — results */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* Pipeline running */}
        {status !== 'complete' && status !== 'error' && (
          <PipelineProgress status={status} />
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-sm font-medium text-red-700 mb-2">{t('workspace', 'pipelineFailed', lang)}</p>
            <p className="text-xs text-red-500 mb-4">
              {t('workspace', 'pipelineError', lang)}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => runPipeline(project.id)}
            >
              {t('workspace', 'retry', lang)}
            </Button>
          </div>
        )}

        {/* Results */}
        {status === 'complete' && output && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-3"
          >
            <SpaceAnalysisSection data={output.spaceAnalysis} />
            <RedesignStrategySection data={output.redesignStrategy} />
            <StyleDirectionSection data={output.styleDirection} />
            <FurnitureConceptSection data={output.furnitureConcept} />
            <RenderPromptSection data={output.renderPromptPackage} />
            <InvestorSummarySection data={output.investorSummary} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
