import { PageWrapper } from '@/components/layout/PageWrapper'
import { NewProjectForm } from '@/components/forms/NewProjectForm'

export const metadata = {
  title: 'New Project — WALABI Render Pipeline',
}

export default function NewProjectPage() {
  return (
    <PageWrapper maxWidth="lg">
      <div className="mb-10">
        <p className="label-overline mb-3">New Project</p>
        <h1 className="font-display text-4xl font-medium text-stone-800 mb-3">
          Start a Redesign Concept
        </h1>
        <p className="text-stone-500 text-base max-w-xl">
          Upload a photo of the hotel room and configure the redesign parameters.
          The pipeline will generate a complete concept package in seconds.
        </p>
      </div>

      <NewProjectForm />
    </PageWrapper>
  )
}
