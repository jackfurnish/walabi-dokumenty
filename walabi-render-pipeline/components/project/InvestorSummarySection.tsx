import { TrendingUp } from 'lucide-react'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import { CopyButton } from '@/components/ui/CopyButton'
import type { InvestorSummary } from '@/lib/schemas/pipeline'

interface InvestorSummarySectionProps {
  data: InvestorSummary
}

export function InvestorSummarySection({ data }: InvestorSummarySectionProps) {
  const summaryText = [
    data.conceptTitle,
    '',
    data.elevatorPitch,
    '',
    data.designNarrative,
    '',
    'Business Impact',
    data.businessImpact,
    '',
    'Proposed Scope',
    data.proposedScope.map((s) => `• ${s}`).join('\n'),
    '',
    `Timeline: ${data.estimatedTimeline}`,
    '',
    'Guest Perception Upgrade',
    data.guestPerceptionUpgrade,
    '',
    data.walabiRoleStatement,
    '',
    data.callToAction,
  ].join('\n')

  return (
    <CollapsibleSection
      title="Investor Summary"
      subtitle={data.conceptTitle}
      badge="Presentation-ready"
      badgeVariant="success"
      icon={<TrendingUp className="w-4 h-4" />}
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-medium text-stone-800">
            {data.conceptTitle}
          </h3>
          <CopyButton text={summaryText} label="Copy summary" size="sm" />
        </div>

        {/* Elevator Pitch */}
        <div className="bg-stone-800 text-stone-100 rounded-xl px-6 py-5">
          <p className="label-overline text-stone-400 mb-3">Elevator Pitch</p>
          <p className="text-sm leading-relaxed">{data.elevatorPitch}</p>
        </div>

        {/* Narrative */}
        <div>
          <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
            Design Narrative
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">{data.designNarrative}</p>
        </div>

        {/* Business Impact */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-5">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
            Business Impact
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">{data.businessImpact}</p>
        </div>

        {/* Proposed Scope */}
        <div>
          <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-3">
            Proposed Scope of Work
          </p>
          <ul className="space-y-2">
            {data.proposedScope.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-semibold text-stone-500 flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Meta Row */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stone-100">
          <div>
            <p className="text-xs text-stone-400 mb-1">Estimated Timeline</p>
            <p className="text-sm font-medium text-stone-800">{data.estimatedTimeline}</p>
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-1">Guest Perception Upgrade</p>
            <p className="text-sm text-stone-700">{data.guestPerceptionUpgrade}</p>
          </div>
        </div>

        {/* WALABI Role */}
        <div className="border-t border-stone-100 pt-4">
          <p className="text-xs text-stone-400 mb-1">WALABI Role</p>
          <p className="text-sm font-medium text-stone-700">{data.walabiRoleStatement}</p>
        </div>

        {/* CTA */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4">
          <p className="text-sm font-semibold text-amber-800">{data.callToAction}</p>
        </div>
      </div>
    </CollapsibleSection>
  )
}
