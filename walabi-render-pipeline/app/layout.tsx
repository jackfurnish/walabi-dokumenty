import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils/cn'
import { Toaster } from '@/components/ui/Toaster'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)}>
      <body className="min-h-screen bg-[#faf9f7] text-stone-800">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
