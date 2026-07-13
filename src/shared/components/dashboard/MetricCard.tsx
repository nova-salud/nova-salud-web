import { cn } from '@/shared/utils'

export const MetricCard = ({
  label,
  value,
  icon,
  bg,
  valueClassName,
  onClick,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  bg: string
  valueClassName?: string
  onClick?: () => void
}) => (
  <div
    onClick={onClick}
    className={cn(
      'rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg flex items-center justify-between',
      onClick && 'cursor-pointer transition hover:shadow-md hover:-translate-y-0.5'
    )}
  >
    <div>
      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className={cn(
        'mt-1 text-lg font-semibold',
        valueClassName ?? 'text-slate-900',
      )}>
        {value}
      </p>
    </div>

    <div className={cn('rounded-2xl p-3', bg)}>
      {icon}
    </div>
  </div>
)