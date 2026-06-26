import { cn } from '@/shared/utils'

type BadgeVariant = 'green' | 'red' | 'blue' | 'amber' | 'slate'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  green: 'border-green-200 bg-green-50 text-green-700',
  red: 'border-red-200 bg-red-50 text-red-700',
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  slate: 'border-slate-200 bg-slate-50 text-slate-600',
}

type Props = {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export const Badge = ({ children, variant = 'slate', className }: Props) => {
  return (
    <span className={cn(
      'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
      VARIANT_CLASSES[variant],
      className,
    )}>
      {children}
    </span>
  )
}
