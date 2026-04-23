import { cn } from '@/shared/utils'

type Props = {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export const Checkbox = ({ label, checked, onChange }: Props) => {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={cn(
          'h-4 w-4 rounded border-slate-300',
          'text-[#0B1739] focus:ring-[#0B1739]/20',
        )}
      />
      {label}
    </label>
  )
}