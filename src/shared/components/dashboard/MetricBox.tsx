import { cn } from '@/shared/utils'

export const MetricBox = ({
  label,
  value,
  valueClassName
}: {
  label: string
  value: string | number,
  valueClassName?: string
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={cn('mt-1 text-lg font-semibold text-slate-900', valueClassName)}>
        {value}
      </p>
    </div>
  )
}