'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { NewProjectFormSchema, type NewProjectFormValues } from '@/lib/schemas/project'
import { ROOM_TYPES, DESIGN_STYLES, BUDGET_TIERS } from '@/constants/options'
import { ImageUpload } from './ImageUpload'
import { OptionSelector } from './OptionSelector'
import { Button } from '@/components/ui/Button'
import { useProjectStore } from '@/store/projectStore'
import { toast } from '@/components/ui/Toaster'
import type { ProjectRecord } from '@/lib/schemas/project'

type FormStep = 'photo' | 'room' | 'style' | 'budget' | 'confirm'

const STEPS: { id: FormStep; label: string }[] = [
  { id: 'photo',   label: 'Room Photo' },
  { id: 'room',    label: 'Room Type' },
  { id: 'style',   label: 'Design Style' },
  { id: 'budget',  label: 'Budget Tier' },
  { id: 'confirm', label: 'Confirm' },
]

export function NewProjectForm() {
  const router = useRouter()
  const { createProject } = useProjectStore()

  const [currentStep, setCurrentStep] = useState<FormStep>('photo')
  const [imageDataUrls, setImageDataUrls] = useState<string[]>([])
  const [imageFileNames, setImageFileNames] = useState<string[]>([])
  const [imageError, setImageError] = useState<string | undefined>()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewProjectFormValues>({
    resolver: zodResolver(NewProjectFormSchema),
    defaultValues: {
      projectName: '',
      notes: '',
    },
  })

  const watchedValues = watch()
  const stepIndex = STEPS.findIndex(s => s.id === currentStep)

  const handleNext = () => {
    if (currentStep === 'photo' && imageDataUrls.length === 0) {
      setImageError('Please upload at least one room photo to continue.')
      return
    }
    setImageError(undefined)
    const nextStep = STEPS[stepIndex + 1]
    if (nextStep) setCurrentStep(nextStep.id)
  }

  const handleBack = () => {
    const prevStep = STEPS[stepIndex - 1]
    if (prevStep) setCurrentStep(prevStep.id)
  }

  const onSubmit = async (data: NewProjectFormValues) => {
    if (imageDataUrls.length === 0) {
      setImageError('At least one room photo is required.')
      setCurrentStep('photo')
      return
    }

    const projectName = data.projectName.trim() ||
      `${watchedValues.roomType?.replace('-', ' ')} · ${watchedValues.style?.replace('-', ' ')}`

    const record: ProjectRecord = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'idle',
      input: {
        projectName,
        roomType: data.roomType,
        style: data.style,
        budgetTier: data.budgetTier,
        imageDataUrls,
        imageFileNames,
        notes: data.notes,
      },
      output: null,
    }

    createProject(record)
    toast({ title: 'Project created', description: 'Running redesign pipeline…', variant: 'success' })
    router.push(`/project/${record.id}`)
  }

  const roomTypeOptions = ROOM_TYPES.map(r => ({
    value: r.value,
    label: r.label,
    description: r.description,
  }))

  const styleOptions = DESIGN_STYLES.map(s => ({
    value: s.value,
    label: s.label,
    description: s.description,
  }))

  const budgetOptions = BUDGET_TIERS.map(b => ({
    value: b.value,
    label: b.label,
    description: b.description,
    badge: b.rangeNote,
  }))

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step progress */}
      <div className="flex items-center gap-1 mb-10">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1 flex-1">
            <div className={`flex-1 h-1 rounded-full transition-colors ${
              i <= stepIndex ? 'bg-stone-700' : 'bg-stone-200'
            }`} />
            {i === STEPS.length - 1 && (
              <div className={`w-2 h-2 rounded-full transition-colors ${
                i <= stepIndex ? 'bg-stone-700' : 'bg-stone-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Step: Photo */}
        {currentStep === 'photo' && (
          <div className="space-y-6 animate-in">
            <div>
              <p className="label-overline mb-2">Step 1 of 5</p>
              <h2 className="font-display text-2xl font-medium text-stone-800 mb-2">Upload a Room Photo</h2>
              <p className="text-sm text-stone-500">
                Provide a clear photo of the existing hotel room. This will be analyzed for redesign opportunities.
              </p>
            </div>
            <ImageUpload
              onImagesChange={(urls, names) => {
                setImageDataUrls(urls)
                setImageFileNames(names)
                setImageError(undefined)
              }}
              values={imageDataUrls}
              fileNames={imageFileNames}
              error={imageError}
            />
          </div>
        )}

        {/* Step: Room Type */}
        {currentStep === 'room' && (
          <div className="space-y-6 animate-in">
            <div>
              <p className="label-overline mb-2">Step 2 of 5</p>
              <h2 className="font-display text-2xl font-medium text-stone-800 mb-2">Room Type</h2>
              <p className="text-sm text-stone-500">Select the type of space you want to redesign.</p>
            </div>
            <OptionSelector
              options={roomTypeOptions}
              value={watchedValues.roomType}
              onChange={(v) => setValue('roomType', v)}
              columns={3}
              error={errors.roomType?.message}
            />
          </div>
        )}

        {/* Step: Style */}
        {currentStep === 'style' && (
          <div className="space-y-6 animate-in">
            <div>
              <p className="label-overline mb-2">Step 3 of 5</p>
              <h2 className="font-display text-2xl font-medium text-stone-800 mb-2">Design Style</h2>
              <p className="text-sm text-stone-500">Choose the aesthetic direction for the redesign.</p>
            </div>
            <OptionSelector
              options={styleOptions}
              value={watchedValues.style}
              onChange={(v) => setValue('style', v)}
              columns={2}
              error={errors.style?.message}
            />
          </div>
        )}

        {/* Step: Budget */}
        {currentStep === 'budget' && (
          <div className="space-y-6 animate-in">
            <div>
              <p className="label-overline mb-2">Step 4 of 5</p>
              <h2 className="font-display text-2xl font-medium text-stone-800 mb-2">Budget Tier</h2>
              <p className="text-sm text-stone-500">Select the investment scope for this redesign.</p>
            </div>
            <OptionSelector
              options={budgetOptions}
              value={watchedValues.budgetTier}
              onChange={(v) => setValue('budgetTier', v)}
              columns={3}
              error={errors.budgetTier?.message}
            />
          </div>
        )}

        {/* Step: Confirm */}
        {currentStep === 'confirm' && (
          <div className="space-y-6 animate-in">
            <div>
              <p className="label-overline mb-2">Step 5 of 5</p>
              <h2 className="font-display text-2xl font-medium text-stone-800 mb-2">Confirm & Generate</h2>
              <p className="text-sm text-stone-500">Name your project and start the pipeline.</p>
            </div>

            {/* Summary */}
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-3">
              {imageDataUrls.length > 0 && (
                <div className={`grid gap-2 ${imageDataUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {imageDataUrls.map((url, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={i} src={url} alt={`Room ${i + 1}`} className="w-full max-h-36 object-cover rounded-lg" />
                  ))}
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Room', value: ROOM_TYPES.find(r => r.value === watchedValues.roomType)?.label },
                  { label: 'Style', value: DESIGN_STYLES.find(s => s.value === watchedValues.style)?.label },
                  { label: 'Budget', value: BUDGET_TIERS.find(b => b.value === watchedValues.budgetTier)?.label },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-stone-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-stone-800">{item.value ?? '—'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Project name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Project Name <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                {...register('projectName')}
                type="text"
                placeholder="e.g. Grand Majestic · Japandi Suite"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
              />
              {errors.projectName && (
                <p className="text-xs text-red-500 mt-1">{errors.projectName.message}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Notes <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                placeholder="Any specific constraints, client preferences, or context..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none transition"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-stone-100">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={stepIndex === 0}
          >
            Back
          </Button>

          {currentStep !== 'confirm' ? (
            <Button type="button" variant="primary" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="primary" size="lg">
              Generate Redesign Concept
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
