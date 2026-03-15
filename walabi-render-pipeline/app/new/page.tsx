'use client'

import { PageWrapper } from '@/components/layout/PageWrapper'
import { NewProjectForm } from '@/components/forms/NewProjectForm'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { t } from '@/lib/i18n/translations'

export default function NewProjectPage() {
  const { lang } = useLanguage()

  return (
    <PageWrapper maxWidth="lg">
      <div className="mb-10">
        <p className="label-overline mb-3">{t('newProject', 'overline', lang)}</p>
        <h1 className="font-display text-4xl font-medium text-stone-800 mb-3">
          {t('newProject', 'heading', lang)}
        </h1>
        <p className="text-stone-500 text-base max-w-xl">
          {t('newProject', 'subheading', lang)}
        </p>
      </div>

      <NewProjectForm />
    </PageWrapper>
  )
}
