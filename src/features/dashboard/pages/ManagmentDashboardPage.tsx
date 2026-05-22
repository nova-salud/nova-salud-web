import PageContainer from '@/shared/components/ui/PageContainer'
import { MetricCard } from '@/shared/components/dashboard/MetricCard'
import { cn } from '@/shared/utils'
import {
  Users,
  AlertTriangle,
  TrendingUp,
  ClipboardList,
  CheckCircle2,
} from 'lucide-react'
import { mockManagementDashboard } from '../types/managment-dashboard-response'
import { useNavigate } from 'react-router'

export const ManagementDashboardPage = () => {
  const navigate = useNavigate()
  const data = mockManagementDashboard

  const mainCards = [
    {
      label: 'Trabajadores',
      value: data.summary.totalEmployees,
      icon: <Users className="h-5 w-5 text-slate-600" />,
      bg: 'bg-slate-100',
      onClick: () => navigate('/employees'),
    },
    {
      label: 'Casos activos',
      value: data.summary.activeCases,
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      bg: 'bg-red-50',
      valueClassName: 'text-red-600',
    },
    {
      label: 'Accidentes',
      value: data.summary.totalAccidents,
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      bg: 'bg-amber-50',
      valueClassName: 'text-amber-600',
    },
    {
      label: 'Atenciones mes',
      value: data.summary.attentionsThisMonth,
      icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
      valueClassName: 'text-indigo-600',
    },
  ]

  const alertCards = [
    {
      label: 'Restricciones activas',
      value: data.alerts.employeesWithRestrictions,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Casos prolongados',
      value: data.alerts.longOpenCases,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Follow-ups vencidos',
      value: data.alerts.overdueFollowUps,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Req. pendientes',
      value: data.alerts.pendingRequirements,
      valueClassName: 'text-amber-600',
      onClick: () => navigate('/requirements'),
    },
  ]

  const maxArea = Math.max(...data.accidents.byArea.map(a => a.count))

  return (
    <PageContainer
      title="Dashboard HR / Gerencia"
      description="Visión operativa de personal y requerimientos"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mainCards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {alertCards.map((a, i) => (
            <MetricCard
              key={i}
              label={a.label}
              value={a.value}
              valueClassName={a.valueClassName}
              icon={<AlertTriangle className="h-5 w-5 text-slate-500" />}
              bg="bg-slate-100"
              onClick={a.onClick}
            />
          ))}
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Requerimientos
            </h2>

            <button
              onClick={() => navigate('/requirements')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Ver todos
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total"
              value={data.requirements.summary.total}
              icon={<ClipboardList className="h-5 w-5 text-slate-600" />}
              bg="bg-slate-100"
              onClick={() => navigate('/requirements')}
            />

            <MetricCard
              label="Pendientes"
              value={data.requirements.summary.pending}
              valueClassName="text-amber-600"
              icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
              bg="bg-amber-50"
              onClick={() => navigate('/requirements')}
            />

            <MetricCard
              label="En proceso"
              value={data.requirements.summary.inProgress}
              icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
              bg="bg-blue-50"
              onClick={() => navigate('/requirements')}
            />

            <MetricCard
              label="Entregados"
              value={data.requirements.summary.delivered}
              valueClassName="text-emerald-600"
              icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
              bg="bg-emerald-50"
              onClick={() => navigate('/requirements')}
            />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Accidentes por área
            </h2>

            <div className="mt-4 space-y-4">
              {data.accidents.byArea.map((area) => {
                const percentage = (area.count / maxArea) * 100

                return (
                  <div key={area.area}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{area.area}</span>
                      <span>{area.count}</span>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                Distribución de empleados
              </h2>

              <button
                onClick={() => navigate('/employees')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Ver empleados
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {data.employees.byArea.map((area) => (
                <div key={area.area} className="flex justify-between text-sm">
                  <span>{area.area}</span>
                  <span>{area.count}</span>
                </div>
              ))}

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">% externos</p>
                <p className="text-lg font-semibold text-slate-900">
                  {data.employees.externalRatio}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Productividad
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Promedio diario
              </p>

              <p className="text-lg font-semibold">
                {data.productivity.averagePerDay}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Atenciones hoy
              </p>

              <p className="text-lg font-semibold">
                {data.productivity.attentionsPerDay.at(-1)?.count ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Últimos requerimientos
            </h2>

            <button
              onClick={() => navigate('/requirements')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Ver todos
            </button>
          </div>

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
                {data.recentRequirements.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/requirements/${item.id}`)}
                    className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.code}
                    </td>

                    <td className="px-6 py-4">{item.requestedBy}</td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'rounded px-2 py-1 text-xs font-medium',
                          item.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-700'
                            : item.status === 'IN_PROGRESS'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                        )}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}