import { cn } from '@/shared/utils'
import { AlertCircle } from 'lucide-react'
import { Button } from '../ui/form'

type Props = {
  title: string
  description: string
  actionText?: string
  onAction?: () => void
  className?: string
}

export const EntityState = ({
  title,
  description,
  actionText,
  onAction,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white px-6 py-12 shadow-sm',
        className,
      )}
    >
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <AlertCircle
            size={26}
            className="text-slate-500"
          />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>

        {actionText && onAction && (
          <div className="mt-6">
            <Button
              type="button"
              className="w-auto"
              onClick={onAction}
            >
              {actionText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}