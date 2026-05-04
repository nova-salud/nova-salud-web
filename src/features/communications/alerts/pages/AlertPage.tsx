import PageContainer from '@/shared/components/ui/PageContainer'
import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import { useAlerts } from '../hooks/useAlerts'
import { AlertPriority } from '../types/alert-priority.enum'
import { ALERT_LABELS } from '../types/alert-type.enum'

const styles = {
  [AlertPriority.HIGH]: {
    priority: 'bg-red-50 text-red-500',
    border: 'border-l-4 border-l-red-500',
  },
  [AlertPriority.MEDIUM]: {
    priority: 'bg-amber-50 text-amber-500',
    border: 'border-l-4 border-l-amber-400',
  },
  [AlertPriority.LOW]: {
    priority: 'bg-slate-100 text-slate-500',
    border: 'border-l-4 border-l-slate-300',
  },
}

const priorityOrder = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
}

const AlertsPage = () => {
  const { data, isLoading } = useAlerts()

  const sorted = [...data].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  )

  const summary = {
    high: data.filter(a => a.priority === 'HIGH').length,
    medium: data.filter(a => a.priority === 'MEDIUM').length,
    low: data.filter(a => a.priority === 'LOW').length,
  }

  return (
    <PageContainer
      title="Alertas"
      description="Monitoreo operativo del sistema"
    >
      <div className="space-y-6">

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-red-50 p-4">
            <p className="text-xs text-red-500">Críticas</p>
            <p className="text-xl font-semibold text-red-600">
              {summary.high}
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-xs text-amber-500">Pendientes</p>
            <p className="text-xl font-semibold text-amber-600">
              {summary.medium}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-xs text-slate-500">Informativas</p>
            <p className="text-xl font-semibold text-slate-600">
              {summary.low}
            </p>
          </div>
        </div>

        <div className="">
          {isLoading ? (
            <div className="p-6 text-sm text-slate-400">
              Cargando alertas...
            </div>
          ) : sorted.length === 0 ? (
            <div className="p-6 text-sm text-slate-400">
              No hay alertas activas
            </div>
          ) : (
            <div className="space-y-4">
              {sorted.map(alert => {
                const style = styles[alert.priority]

                return (
                  <div
                    key={alert.id}
                    className={cn(
                      'flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:bg-slate-50 hover:shadow-md',
                      style.border,
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'text-xs px-2 py-1 rounded-full font-medium',
                            style.priority,
                          )}
                        >
                          {alert.priority}
                        </span>

                        <p className="text-sm font-semibold text-slate-900">
                          {ALERT_LABELS[alert.type]}
                        </p>
                      </div>

                      <p className="text-sm text-slate-600">
                        {alert.message}
                      </p>

                      <p className="text-xs text-slate-400">
                        {new Date(alert.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost">
                        Ver
                      </Button>

                      <Button variant="secondary">
                        Resolver
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </PageContainer>
  )
}

export default AlertsPage