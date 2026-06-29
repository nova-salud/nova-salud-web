import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

export interface MetricPanelRow {
  label: string
  icon: ReactNode
  value: string | number
  valueClassName?: string
  iconBg?: string
  path?: string
}

interface MetricPanelProps {
  title: string
  actionLabel?: string
  onAction?: () => void
  rows: MetricPanelRow[]
  panelHeight?: string
  rowHeight?: 'sm' | 'md' | 'lg'
}

const ROW_HEIGHT: Record<NonNullable<MetricPanelProps['rowHeight']>, string> = {
  sm: 'min-h-9',
  md: 'min-h-11',
  lg: 'min-h-14',
}

export function MetricPanel({
  title,
  actionLabel,
  onAction,
  rows,
  panelHeight,
  rowHeight = 'md',
}: MetricPanelProps) {
  const navigate = useNavigate()
  const rowClass = panelHeight ? 'flex-1' : ROW_HEIGHT[rowHeight]

  return (
    <div
      className="flex flex-col rounded-3xl bg-white p-5 shadow-sm"
      style={panelHeight ? { height: panelHeight } : undefined}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            {actionLabel}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col divide-y divide-slate-100">
        {rows.map(row => (
          <div
            key={row.label}
            onClick={row.path ? () => navigate(row.path!) : undefined}
            className={[
              'group flex items-center gap-3 rounded-xl px-1 transition-colors',
              rowClass,
              row.path ? 'cursor-pointer hover:bg-slate-50' : '',
            ].join(' ')}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${row.iconBg ?? 'bg-slate-100'}`}
            >
              {row.icon}
            </div>
            <span className="flex-1 text-sm text-slate-500">{row.label}</span>
            <span className={`text-sm font-semibold ${row.valueClassName ?? 'text-slate-900'}`}>
              {row.value}
            </span>
            {row.path && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
