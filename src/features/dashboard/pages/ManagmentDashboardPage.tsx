import PageContainer from '@/shared/components/ui/PageContainer'
import { MetricCard } from '@/shared/components/dashboard/MetricCard'
import { cn } from '@/shared/utils'
import {
  Users,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'
import { mockManagementDashboard } from '../types/managment-dashboard-response'

export const ManagementDashboardPage = () => {
  const data = mockManagementDashboard

  const mainCards = [
    {
      label: 'Trabajadores',
      value: data.summary.totalEmployees,
      icon: <Users className="h-5 w-5 text-slate-600" />,
      bg: 'bg-slate-100',
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
    },
  ]

  const maxArea = Math.max(...data.accidents.byArea.map(a => a.count))

  return (
    <PageContainer
      title="Dashboard HR / Gerencia"
      description="Visión operativa de personal y requerimientos"
    >
      <div className="space-y-6">

        {/* MAIN */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mainCards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
        </div>

        {/* ALERTS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {alertCards.map((a, i) => (
            <MetricCard
              key={i}
              label={a.label}
              value={a.value}
              valueClassName={a.valueClassName}
              icon={<AlertTriangle className="h-5 w-5 text-slate-500" />}
              bg="bg-slate-100"
            />
          ))}
        </div>

        {/* REQUIREMENTS */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Requerimientos
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-lg font-semibold">{data.requirements.summary.total}</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400">Pendientes</p>
              <p className="text-lg font-semibold text-amber-600">
                {data.requirements.summary.pending}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400">En proceso</p>
              <p className="text-lg font-semibold">
                {data.requirements.summary.inProgress}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400">Entregados</p>
              <p className="text-lg font-semibold text-emerald-600">
                {data.requirements.summary.delivered}
              </p>
            </div>
          </div>
        </div>

        {/* AREAS + EMPLOYEES */}
        <div className="grid gap-6 xl:grid-cols-2">

          {/* ACCIDENTES POR AREA */}
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

                    <div className="mt-2 h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* EMPLEADOS */}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Distribución de empleados
            </h2>

            <div className="mt-4 space-y-4">
              {data.employees.byArea.map((area) => (
                <div key={area.area} className="flex justify-between text-sm">
                  <span>{area.area}</span>
                  <span>{area.count}</span>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400">
                  % externos
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {data.employees.externalRatio}%
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* PRODUCTIVIDAD */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Productividad
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400">
                Promedio diario
              </p>
              <p className="text-lg font-semibold">
                {data.productivity.averagePerDay}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400">
                Atenciones hoy
              </p>
              <p className="text-lg font-semibold">
                {data.productivity.attentionsPerDay.at(-1)?.count ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Últimos requerimientos
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-3">Código</th>
                  <th className="px-6 py-3">Solicitante</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Fecha</th>
                </tr>
              </thead>

              <tbody>
                {data.recentRequirements.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">{item.code}</td>
                    <td className="px-6 py-4">{item.requestedBy}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium',
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