import { cn } from '@/shared/utils'

type DashboardCardProps = {
  label: string
  value: string | number
  icon?: React.ReactNode
  className?: string
  valueClassName?: string
  onClick?: () => void
}

export const DashboardCard = ({
  label,
  value,
  icon,
  className,
  valueClassName,
  onClick,
}: DashboardCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg flex items-center justify-between',
        onClick && 'cursor-pointer transition hover:shadow-md hover:-translate-y-0.5',
        className,
      )}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>

        <p
          className={cn(
            'mt-1 text-lg font-semibold text-slate-900',
            valueClassName,
          )}
        >
          {value}
        </p>
      </div>

      {icon && (
        <div className="rounded-2xl bg-slate-100 p-3">
          {icon}
        </div>
      )}
    </div>
  )
}