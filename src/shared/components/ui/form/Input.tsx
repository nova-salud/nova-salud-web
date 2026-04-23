import { useId } from 'react'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils'
import { Label } from './Label'

type Props = Omit<ComponentProps<'input'>, 'onChange'> & {
  label?: string
  error?: string
  onChange?: (value: string | number) => void
}

export const Input = ({ label, error, id, placeholder, onChange, className, type, ...props }: Props) => {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    if (type === 'number') {
      onChange?.(val === '' ? 0 : val)
    } else {
      onChange?.(val)
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <input
        id={inputId}
        placeholder={placeholder}
        onChange={handleChange}
        className={cn(
          'h-11 w-full rounded-xl border px-3 text-sm outline-none transition',
          'border-slate-200 bg-white text-slate-900',
          'focus:border-[#0B1739] focus:ring-2 focus:ring-[#0B1739]/10',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
          className
        )}
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}