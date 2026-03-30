import type { PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{
  title?: string
  description?: string
  action?: ReactNode
}>

const PageContainer = ({ title, description, action, children }: Props) => {
  return (
    <div className="space-y-4">
      {title || description || action ? (
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center">
          <div>
            {title ? (
              <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
            ) : null}

            {description ? (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            ) : null}
          </div>

          {action ? <div>{action}</div> : null}
        </div>
      ) : null}

      <div>{children}</div>
    </div>
  )
}

export default PageContainer