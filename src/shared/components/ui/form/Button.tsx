import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/utils'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'outline'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  isLoading?: boolean
  loadingText?: string
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-[#0B1739] text-white hover:opacity-95',
  secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  info: 'bg-sky-600 text-white hover:bg-sky-700',
  warning: 'bg-amber-500 text-white hover:bg-amber-600',
  error: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  outline:
    'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  isLoading = false,
  loadingText,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'rounded-lg px-3 py-2 text-xs font-medium transition',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANT_STYLES[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? loadingText ?? 'Cargando...' : children}
    </button>
  )
}