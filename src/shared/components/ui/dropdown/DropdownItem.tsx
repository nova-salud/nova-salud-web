import { cn } from '@/shared/utils'
import { type ReactNode } from 'react'

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  danger?: boolean
  className?: string
}

export const DropdownItem = ({
  children,
  onClick,
  danger = false,
  className,
}: DropdownItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors',
        'focus:outline-none',
        danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-slate-700 hover:bg-slate-50',
        className,
      )}
    >
      {children}
    </button>
  )
}