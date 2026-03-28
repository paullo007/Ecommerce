import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'new' | 'sale' | 'bestseller' | 'dark' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-cream-200 text-charcoal-600',
    new: 'bg-forest text-white',
    sale: 'bg-terracotta text-white',
    bestseller: 'bg-stone text-charcoal',
    dark: 'bg-charcoal text-white',
    outline: 'border border-charcoal text-charcoal',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.1em] uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
