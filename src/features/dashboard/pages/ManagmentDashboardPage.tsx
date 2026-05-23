import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  ShieldAlert,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import { cn } from '@/shared/utils'
import PageContainer from '@/shared/components/ui/PageContainer'
import { MetricCard } from '@/shared/components/dashboard/MetricCard'
import { useManagementDashboard } from '../hooks/useManagementDashboard'
import { ManagementDashboardSkeleton } from '../components/management/ManagementDashboardSkeleton'

const REQ_STATUS_LABEL: Record<string, string> = {
  PENDING: 'Pendiente',
  IN_PROCESS: 'En proceso',
  DELIVERED: 'Entregado',
  RECEIVED_PARTIAL: 'Recibido parcial',
  RECEIVED_COMPLETE: 'Recibido',
  CANCELLED: 'Cancelado',
}

const REQ_STATUS_CLASS: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  IN_PROCESS: 'bg-blue-100 text-blue-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
  RECEIVED_PARTIAL: 'bg-indigo-100 text-indigo-700',
  RECEIVED_COMPLETE: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-slate-100 text-slate-500',
}

export const ManagementDashboardPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useManagementDashboard()

  if (isLoading) {
    return (
      <PageContainer title="Dashboard HR / Gerencia" description="Visión operativa de personal y requerimientos">
        <ManagementDashboardSkeleton />
      </PageContainer>
    )
  }

  if (error || !data) {
    return (
      <PageContainer title="Dashboard HR / Gerencia" description="Visión operativa de personal y requerimientos">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error ?? 'No se pudo cargar el dashboard.'}
        </div>
      </PageContainer>
    )
  }

  const mainCards = [
    {
      label: 'Trabajadores activos',
      value: data.summary.totalEmployees,
      icon: <Users className="h-5 w-5 text-slate-600" />,
      bg: 'bg-slate-100',
      onClick: () => navigate('/employees'),
    },
    {
      label: 'Ciclos EMO activos',
      value: data.summary.activeCycles,
      icon: <Activity className="h-5 w-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
      valueClassName: 'text-indigo-600',
      onClick: () => navigate('/clinical-histories'),
    },
    {
      label: 'Accidentes totales',
      value: data.summary.totalAccidents,
      icon: <ShieldAlert className="h-5 w-5 text-amber-600" />,
      bg: 'bg-amber-50',
      valueClassName: 'text-amber-600',
      onClick: () => navigate('/accidents'),
    },
    {
      label: 'Atenciones este mes',
      value: data.summary.attentionsThisMonth,
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      valueClassName: 'text-emerald-600',
    },
  ]

  const alertCards = [
    {
      label: 'Con restricciones',
      value: data.alerts.employeesWithRestrictions,
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      bg: 'bg-amber-50',
      valueClassName: data.alerts.employeesWithRestrictions > 0 ? 'text-amber-600' : undefined,
      onClick: () => navigate('/clinical-histories'),
    },
    {
      label: 'Follow-ups vencidos',
      value: data.alerts.overdueFollowUps,
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      bg: 'bg-red-50',
      valueClassName: data.alerts.overdueFollowUps > 0 ? 'text-red-600' : undefined,
    },
    {
      label: 'Req. pendientes',
      value: data.alerts.pendingRequirements,
      icon: <ClipboardList className="h-5 w-5 text-slate-500" />,
      bg: 'bg-slate-100',
      valueClassName: data.alerts.pendingRequirements > 0 ? 'text-slate-700' : undefined,
      onClick: () => navigate('/requirements'),
    },
  ]

  const maxEmployees = Math.max(...data.employeesByArea.map(a => a.count), 1)
  const maxAccidents = Math.max(...data.accidentsByArea.map(a => a.count), 1)

  return (
    <PageContainer
      title="Dashboard HR / Gerencia"
      description="Visión operativa de personal y requerimientos"
    >
      <div className="space-y-6">
        {/* Cards principales */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mainCards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
        </div>

        {/* Alertas */}
        <div className="grid gap-4 sm:grid-cols-3">
          {alertCards.map((a, i) => (
            <MetricCard key={i} {...a} />
          ))}
        </div>

        {/* Requerimientos */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Requerimientos</h2>
            <button
              onClick={() => navigate('/requirements')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver todos
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total"
              value={data.requirementsSummary.total}
              icon={<ClipboardList className="h-5 w-5 text-slate-600" />}
              bg="bg-slate-100"
              onClick={() => navigate('/requirements')}
            />
            <MetricCard
              label="Pendientes"
              value={data.requirementsSummary.pending}
              icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
              bg="bg-amber-50"
              valueClassName="text-amber-600"
              onClick={() => navigate('/requirements')}
            />
            <MetricCard
              label="En proceso"
              value={data.requirementsSummary.inProgress}
              icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
              bg="bg-blue-50"
              onClick={() => navigate('/requirements')}
            />
            <MetricCard
              label="Entregados"
              value={data.requirementsSummary.delivered}
              icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
              bg="bg-emerald-50"
              valueClassName="text-emerald-600"
              onClick={() => navigate('/requirements')}
            />
          </div>
        </div>

        {/* Distribución por área */}
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Empleados por área</h2>
              <button
                onClick={() => navigate('/employees')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver empleados
              </button>
            </div>

            {data.employeesByArea.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">Sin datos</p>
            ) : (
              <div className="space-y-4">
                {data.employeesByArea.map(item => (
                  <div key={item.area}>
                    <div className="flex justify-between text-sm font-medium text-slate-700">
                      <span className="truncate pr-2">{item.area}</span>
                      <span className="shrink-0 text-slate-500">{item.count}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${(item.count / maxEmployees) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Accidentes por área</h2>
              <button
                onClick={() => navigate('/accidents')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver accidentes
              </button>
            </div>

            {data.accidentsByArea.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">Sin accidentes registrados</p>
            ) : (
              <div className="space-y-4">
                {data.accidentsByArea.map(item => (
                  <div key={item.area}>
                    <div className="flex justify-between text-sm font-medium text-slate-700">
                      <span className="truncate pr-2">{item.area}</span>
                      <span className="shrink-0 text-slate-500">{item.count}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${(item.count / maxAccidents) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Últimos requerimientos */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">Últimos requerimientos</h2>
            <button
              onClick={() => navigate('/requirements')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver todos
            </button>
          </div>

          {data.recentRequirements.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-sm text-slate-400">
              No hay requerimientos registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-400">
                    <th className="px-6 py-3">Código</th>
                    <th className="px-6 py-3">Solicitante</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentRequirements.map(item => (
                    <tr
                      key={item.id}
                      onClick={() => navigate(`/requirements/${item.id}`)}
                      className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{item.code}</td>
                      <td className="px-6 py-4 text-slate-600">{item.requestedBy}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'rounded-xl px-2 py-1 text-xs font-medium',
                          REQ_STATUS_CLASS[item.status] ?? 'bg-slate-100 text-slate-600',
                        )}>
                          {REQ_STATUS_LABEL[item.status] ?? item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
