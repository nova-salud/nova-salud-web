import { cn } from '@/shared/utils'
import type { ComponentProps } from 'react'

type Props = ComponentProps<'label'> &{
  children: React.ReactNode
}

export const Label = ({ children, className, ...props }: Props) => {
  return (
    <label {...props} className={cn('text-xs font-medium text-slate-500', className)}>
      {children}
    </label>
  )
}