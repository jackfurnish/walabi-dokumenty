'use client'

import { FileCode } from 'lucide-react'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import { CopyButton } from '@/components/ui/CopyButton'
import type { RenderPromptPackage } from '@/lib/schemas/pipeline'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

interface RenderPromptSectionProps {
  data: RenderPromptPackage
}

export function RenderPromptSection({ data }: RenderPromptSectionProps) {
  const { lang } = useLanguage()

  return (
    <CollapsibleSection
      title={t('sections', 'renderPrompt', lang)}
      subtitle="Ready for Midjourney, DALL·E, Stable Diffusion"
      badge={lang === 'pl' ? 'Gotowy do kopiowania' : 'Copy-ready'}
      badgeVariant="accent"
      icon={<FileCode className="w-4 h-4" />}
    >
      <div className="space-y-5">
        {/* Master Prompt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
              {lang === 'pl' ? 'Master Prompt' : 'Master Prompt'}
            </p>
            <CopyButton text={data.masterPrompt} label={t('copy', 'copyPrompt', lang)} size="sm" />
          </div>
          <div className="bg-stone-900 rounded-xl p-4 font-mono text-xs text-stone-300 leading-relaxed whitespace-pre-wrap">
            {data.masterPrompt}
          </div>
        </div>

        {/* Style Modifiers */}
        {data.styleModifiers.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
              {lang === 'pl' ? 'Modyfikatory stylu' : 'Style Modifiers'}
            </p>
            <div className="flex flex-wrap gap-2">
              {data.styleModifiers.map((mod, i) => (
                <code
                  key={i}
                  className="text-[11px] px-2 py-1 bg-stone-100 text-stone-700 rounded-lg border border-stone-200 font-mono"
                >
                  {mod}
                </code>
              ))}
            </div>
          </div>
        )}

        {/* Technical */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-stone-400 mb-1">{lang === 'pl' ? 'Kąt kamery' : 'Camera Angle'}</p>
            <p className="text-xs font-medium text-stone-700">{data.cameraAngle}</p>
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-1">{lang === 'pl' ? 'Oświetlenie' : 'Lighting'}</p>
            <p className="text-xs font-medium text-stone-700">{data.lightingInstructions}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-stone-400 mb-1">{lang === 'pl' ? 'Specyfikacja techniczna' : 'Technical Spec'}</p>
            <p className="text-xs font-mono text-stone-600 bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
              {data.technicalSpec}
            </p>
          </div>
        </div>

        {/* Negative Prompt */}
        {data.negativePrompt && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                {lang === 'pl' ? 'Prompt negatywny' : 'Negative Prompt'}
              </p>
              <CopyButton text={data.negativePrompt} label={t('copy', 'copy', lang)} size="sm" />
            </div>
            <div className="bg-red-50/50 border border-red-100 rounded-xl p-3 font-mono text-xs text-red-700 leading-relaxed">
              {data.negativePrompt}
            </div>
          </div>
        )}

        {/* Variants */}
        {data.promptVariants.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
              {lang === 'pl' ? 'Warianty promptu' : 'Prompt Variants'}
            </p>
            <div className="space-y-2">
              {data.promptVariants.map((variant, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-stone-50 rounded-xl p-3 border border-stone-100"
                >
                  <span className="text-[10px] font-mono text-stone-400 mt-0.5 flex-shrink-0">
                    V{i + 1}
                  </span>
                  <p className="text-xs text-stone-600 font-mono leading-relaxed flex-1">
                    {variant}
                  </p>
                  <CopyButton text={variant} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CollapsibleSection>
  )
}
