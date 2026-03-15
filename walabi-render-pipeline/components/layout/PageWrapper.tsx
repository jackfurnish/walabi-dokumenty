import { Header } from './Header'
import { Footer } from './Footer'
import { cn } from '@/lib/utils/cn'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '7xl' | 'full'
}

const widthMap = {
  sm:   'max-w-2xl',
  md:   'max-w-4xl',
  lg:   'max-w-5xl',
  xl:   'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-none',
}

export function PageWrapper({
  children,
  className,
  maxWidth = '7xl',
}: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <Header />
      <main
        className={cn(
          'flex-1 mx-auto w-full px-6 py-10',
          widthMap[maxWidth],
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
