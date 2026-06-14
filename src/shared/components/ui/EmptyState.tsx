import { type ReactNode } from 'react'
import { Inbox } from 'lucide-react'

type Props = {
  icon?: ReactNode
  title: string
  description?: string
}

export const EmptyState = ({ icon, title, description }: Props) => (
  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
      {icon ?? <Inbox className="h-5 w-5" />}
    </div>
    <p className="text-sm font-medium text-slate-500">{title}</p>
    {description && <p className="text-xs text-slate-400">{description}</p>}
  </div>
)
