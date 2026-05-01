import { cn } from '@/shared/utils'

export const AlertBox = ({ title, value }: { title: string, value:  number}) => {
  const isCritical = value >= 5

  return (
    <div
      className={cn(
        'rounded-3xl border p-5 shadow-sm',
        isCritical
          ? 'border-red-200 bg-red-50'
          : 'border-amber-200 bg-amber-50'
      )}
    >
      <p className="text-xs text-slate-500">{title}</p>

      <p
        className={cn(
          'mt-2 text-lg font-semibold',
          isCritical ? 'text-red-600' : 'text-amber-600'
        )}
      >
        {value}
      </p>
    </div>
  )
}