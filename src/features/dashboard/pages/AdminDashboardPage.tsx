import PageContainer from '@/shared/components/ui/PageContainer'
import { MetricCard } from '@/shared/components/dashboard/MetricCard'
import { mockAdminDashboard } from '../types/admin-dashboard-response'
import {
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'

export const AdminDashboardPage = () => {
  const data = mockAdminDashboard

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
      icon: <Activity className="h-5 w-5 text-red-600" />,
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
      label: 'Atenciones hoy',
      value: data.summary.consultationsToday,
      icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
      valueClassName: 'text-indigo-600',
    },
  ]

  const alertCards = [
    {
      label: 'Follow-ups vencidos',
      value: data.alerts.overdueFollowUps,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Casos prolongados',
      value: data.alerts.longOpenCases,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Con restricciones',
      value: data.alerts.employeesWithRestrictions,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Medicamentos críticos',
      value: data.alerts.criticalMedications,
      valueClassName: 'text-red-600',
    },
  ]

  const maxArea = Math.max(...data.distribution.accidentsByArea.map(a => a.count))

  return (
    <PageContainer
      title="Dashboard Administrador"
      description="Visión global del sistema"
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
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Accidentes por área
            </h2>

            <div className="mt-4 space-y-4">
              {data.distribution.accidentsByArea.map((area) => {
                const percentage = (area.count / maxArea) * 100

                return (
                  <div key={area.area}>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700">{area.area}</span>
                      <span className="text-slate-500">{area.count}</span>
                    </div>

                    <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
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
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Indicadores SST
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Tasa por 100 empleados
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {data.sst.accidentRatePer100Employees}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Reincidencia
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {data.sst.recurrenceRate}%
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Casos prolongados
                </p>
                <p className="text-lg font-semibold text-red-600">
                  {data.sst.casesOverThresholdDays}
                </p>
              </div>
            </div>
          </div>

        </div>
        <div className="grid gap-6 xl:grid-cols-2">

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Sistema
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Usuarios activos</p>
                <p className="text-lg font-semibold text-slate-900">
                  {data.system.activeUsers}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Bloqueados</p>
                <p className="text-lg font-semibold text-red-600">
                  {data.system.blockedUsers}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 col-span-2">
                <p className="text-xs text-slate-400">Última sincronización</p>
                <p className="text-sm font-medium text-slate-700">
                  {data.system.lastSyncAt
                    ? new Date(data.system.lastSyncAt).toLocaleString()
                    : '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Indicadores médicos
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs text-slate-400">
                  Días promedio recuperación
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {data.medical.averageRecoveryDays}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-2">
                  Medicamentos más usados
                </p>

                <div className="space-y-2">
                  {data.medical.mostUsedMedications.map((m) => (
                    <div key={m.name} className="flex justify-between text-sm">
                      <span className="text-slate-700">{m.name}</span>
                      <span className="text-slate-500">{m.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-3xl bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Actividad reciente
            </h2>
          </div>

          <div className="divide-y">
            {data.recentActivity.map((item) => (
              <div key={item.id} className="px-6 py-4 flex justify-between border-b-slate-200">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.description}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.type}
                  </p>
                </div>

                <p className="text-xs text-slate-400">
                  {new Date(item.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageContainer>
  )
}