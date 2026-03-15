import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
  {
    variants: {
      variant: {
        primary:   'bg-stone-800 text-stone-50 hover:bg-stone-700 active:bg-stone-900',
        secondary: 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200',
        outline:   'border border-stone-300 text-stone-700 hover:bg-stone-50 bg-white',
        ghost:     'text-stone-600 hover:bg-stone-100 hover:text-stone-800',
        danger:    'bg-red-600 text-white hover:bg-red-700',
        accent:    'bg-amber-700 text-white hover:bg-amber-800',
      },
      size: {
        sm:   'px-3 py-1.5 text-xs',
        md:   'px-4 py-2 text-sm',
        lg:   'px-6 py-3 text-sm',
        xl:   'px-8 py-4 text-base',
        icon: 'w-9 h-9 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Processing…
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { buttonVariants }
