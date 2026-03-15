import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ArrowRight, ScanSearch, Layers, Lightbulb, FileText, TrendingUp } from 'lucide-react'

const PIPELINE_STEPS = [
  {
    icon: ScanSearch,
    step: '01',
    title: 'Upload & Configure',
    description: 'Provide a photo of the existing hotel room. Choose room type, target style, and budget tier.',
  },
  {
    icon: Layers,
    step: '02',
    title: 'Space Analysis',
    description: 'The pipeline identifies visual issues, focal points, lighting quality, and redesign opportunities.',
  },
  {
    icon: Lightbulb,
    step: '03',
    title: 'Redesign Strategy',
    description: 'A structured plan is generated — what to keep, replace, or add — with cost-effort logic.',
  },
  {
    icon: FileText,
    step: '04',
    title: 'Render Prompt Package',
    description: 'A complete, production-ready render master prompt for photorealistic image generation.',
  },
  {
    icon: TrendingUp,
    step: '05',
    title: 'Investor Summary',
    description: 'A concise, persuasive narrative explaining business impact and guest perception upgrade.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="max-w-3xl">
            <p className="label-overline mb-6">WALABI · Render Pipeline</p>
            <h1 className="font-display text-5xl font-medium text-stone-800 leading-tight mb-6 text-balance">
              Transform Hotel Rooms
              <br />
              <span className="text-stone-500">into Investment-Ready Concepts</span>
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed mb-10 max-w-2xl">
              Upload one existing room photo. Receive a complete redesign strategy, bespoke furniture concept,
              photorealistic render prompt, and investor-facing summary — all generated through a structured
              AI pipeline aligned with WALABI's design standards.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/new"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-800 text-stone-50 rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors"
              >
                Start a Redesign
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-stone-300 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Abstract visual — room concept strip */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-4xl">
            {[
              { bg: 'bg-stone-200', label: 'Existing Room' },
              { bg: 'bg-amber-100', label: 'Strategy Layer' },
              { bg: 'bg-stone-100', label: 'Redesign Concept' },
            ].map((item) => (
              <div key={item.label} className="aspect-[4/3] rounded-2xl overflow-hidden">
                <div className={`w-full h-full ${item.bg} flex items-end p-4`}>
                  <span className="label-overline text-stone-600">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scope Statement */}
        <section className="border-y border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <p className="label-overline mb-2">Scope</p>
                <h2 className="font-display text-2xl font-medium text-stone-800">
                  One focused use case
                </h2>
              </div>
              <div className="flex-1 max-w-2xl">
                <p className="text-stone-600 leading-relaxed">
                  This tool is designed for a single, commercially valuable scenario:{' '}
                  <strong className="text-stone-800">redesigning 3–4★ hotel rooms without structural renovation.</strong>{' '}
                  It is not a generic interior design platform. It is a sales and pre-production tool
                  for WALABI to support hotel clients, demonstrate expertise, and accelerate project conversations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline Steps */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="label-overline mb-3">How it works</p>
            <h2 className="font-display text-3xl font-medium text-stone-800">
              Five-module pipeline
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {PIPELINE_STEPS.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="relative">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-stone-400">{step}</span>
                    <div className="flex-1 h-px bg-stone-200" />
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-stone-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-stone-800">{title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-stone-800 rounded-2xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-2xl font-medium text-stone-50 mb-2">
                Ready to generate your first concept?
              </h2>
              <p className="text-stone-400 text-sm">
                Upload a room photo and receive a complete investor-ready package in under a minute.
              </p>
            </div>
            <Link
              href="/new"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-stone-50 text-stone-800 rounded-xl text-sm font-semibold hover:bg-white transition-colors"
            >
              Start a Redesign
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
