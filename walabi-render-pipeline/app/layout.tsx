import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils/cn'
import { Toaster } from '@/components/ui/Toaster'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WALABI Render Pipeline',
  description:
    'AI-assisted hotel room redesign tool for generating photorealistic concept packages and investor-facing summaries.',
  keywords: ['WALABI', 'hotel redesign', 'interior design', 'render pipeline', 'hospitality'],
  robots: 'noindex, nofollow',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%232D2E2E'/><text x='16' y='22' font-size='18' text-anchor='middle' fill='%23E8D5B0' font-family='serif' font-weight='bold'>W</text></svg>",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)}>
      <body className="min-h-screen bg-[#faf9f7] text-stone-800">
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
