import { cn } from '@/shared/utils'
import { Label } from './Label'

type Option = {
  label: string
  value: string | number
}

type Props = {
  label?: string
  error?: string
  value: string | number
  options: Option[]
  onChange: (value: string) => void
}

export const Select = ({ label, error, value, options, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label>{label}</Label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-11 w-full rounded-xl border px-3 text-sm outline-none transition',
          'border-slate-200 bg-white text-slate-900',
          'focus:border-[#0B1739] focus:ring-2 focus:ring-[#0B1739]/10',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
        )}
      >
        <option value="">Seleccione</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}