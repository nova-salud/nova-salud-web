import { cn } from '@/shared/utils'

export const MetricCard = ({
  label,
  value,
  icon,
  bg,
  valueClassName,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  bg: string
  valueClassName?: string
}) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className={cn('mt-1 text-lg font-semibold', valueClassName ?? 'text-slate-900')}>
        {value}
      </p>
    </div>

    <div className={cn('rounded-2xl p-3', bg)}>
      {icon}
    </div>
  </div>
)