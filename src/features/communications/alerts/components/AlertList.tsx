import { User } from 'lucide-react'
import { cn } from '@/shared/utils'
import { Button, DataTablePagination, type Pagination } from '@/shared/components'
import { AlertPriority } from '../types/alert-priority.enum'
import { ALERT_LABELS } from '../types/alert-type.enum'
import type { AlertResponseDto } from '../types/alert-response.dto'
import { AlertListSkeleton } from './AlertListSkeleton'

const PRIORITY_STYLES = {
  [AlertPriority.HIGH]: {
    badge: 'bg-red-50 text-red-500',
    border: 'border-l-4 border-l-red-500',
  },
  [AlertPriority.MEDIUM]: {
    badge: 'bg-amber-50 text-amber-500',
    border: 'border-l-4 border-l-amber-400',
  },
  [AlertPriority.LOW]: {
    badge: 'bg-slate-100 text-slate-500',
    border: 'border-l-4 border-l-slate-300',
  },
}

type Props = {
  alerts: AlertResponseDto[]
  isLoading: boolean
  pagination: Pagination
  onNavigate: (alert: AlertResponseDto) => void
  onResolve: (alert: AlertResponseDto) => void
}

export const AlertList = ({ alerts, isLoading, pagination, onNavigate, onResolve }: Props) => {
  if (isLoading) {
    return <AlertListSkeleton />
  }

  if (alerts.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 text-sm text-slate-400 shadow-lg">
        No hay alertas activas
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const style = PRIORITY_STYLES[alert.priority]

        return (
          <div
            key={alert.id}
            className={cn(
              'rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-lg transition hover:bg-slate-50 hover:shadow-md',
              style.border,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                {/* Badges: prioridad + tipo */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn('rounded-full px-2 py-1 text-xs font-medium', style.badge)}>
                    {alert.priority}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                    {ALERT_LABELS[alert.type]}
                  </span>
                </div>

                {/* Título y mensaje */}
                <div>
                  <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
                  <p className="text-sm text-slate-600">{alert.message}</p>
                </div>

                {/* Empleado */}
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <User size={14} className="shrink-0 text-slate-400" />
                  {alert.employeeName ?? '—'}
                </div>

                {/* Fecha */}
                <p className="text-xs text-slate-400">
                  {new Date(alert.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Estado + acciones */}
              <div className="flex shrink-0 flex-col items-end gap-3">
                {alert.isResolved ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Resuelta
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                    Pendiente
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => onNavigate(alert)}>
                    Ver
                  </Button>
                  {!alert.isResolved && (
                    <Button variant="secondary" onClick={() => onResolve(alert)}>
                      Resolver
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <DataTablePagination {...pagination} />
    </div>
  )
}
