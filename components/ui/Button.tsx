'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline-white' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const variants = {
      primary:
        'rounded-full bg-terracotta text-white hover:bg-terracotta-dark',
      secondary:
        'rounded-full border border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
      dark:
        'rounded-full bg-charcoal text-white hover:bg-charcoal-800',
      ghost:
        'text-charcoal hover:text-terracotta',
      'outline-white':
        'rounded-full border border-white text-white hover:bg-white hover:text-charcoal',
    }

    const sizes = {
      sm: 'px-6 py-2.5 text-xs',
      md: 'px-8 py-3.5 text-sm',
      lg: 'px-10 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
