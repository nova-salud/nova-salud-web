import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/utils'
import { Label } from './Label'

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  label?: string
  error?: string

  onChange?: (value: string) => void
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, onChange, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <Label>{label}</Label>}

        <textarea
          {...props}
          ref={ref}
          className={cn(
            'w-full rounded-xl border px-3 py-2 text-sm outline-none transition',
            'border-slate-200 bg-white text-slate-900',
            'focus:border-[#0B1739] focus:ring-2 focus:ring-[#0B1739]/10',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
            className,
          )}
          onChange={(e) => {
            onChange?.(e.target.value)
          }}
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  },
)