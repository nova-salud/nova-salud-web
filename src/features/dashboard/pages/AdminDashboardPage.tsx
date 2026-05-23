import {
  Activity,
  AlertTriangle,
  Package,
  ShieldAlert,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { MetricCard } from '@/shared/components/dashboard/MetricCard'
import { useAdminDashboard } from '../hooks/useAdminDashboard'
import { AdminDashboardSkeleton } from '../components/admin/AdminDashboardSkeleton'

export const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useAdminDashboard()

  if (isLoading) {
    return (
      <PageContainer title="Dashboard Administrador" description="Visión global del sistema">
        <AdminDashboardSkeleton />
      </PageContainer>
    )
  }

  if (error || !data) {
    return (
      <PageContainer title="Dashboard Administrador" description="Visión global del sistema">
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
      label: 'Casos activos',
      value: data.summary.activeCases,
      icon: <Activity className="h-5 w-5 text-red-600" />,
      bg: 'bg-red-50',
      valueClassName: 'text-red-600',
      onClick: () => navigate('/accidents'),
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
      label: 'Atenciones hoy',
      value: data.summary.consultationsToday,
      icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
      valueClassName: 'text-indigo-600',
      onClick: () => navigate('/clinical-attention'),
    },
  ]

  const alertCards = [
    {
      label: 'Follow-ups vencidos',
      value: data.alerts.overdueFollowUps,
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      bg: 'bg-red-50',
      valueClassName: data.alerts.overdueFollowUps > 0 ? 'text-red-600' : undefined,
      onClick: () => navigate('/clinical-attention'),
    },
    {
      label: 'Casos prolongados',
      value: data.alerts.longOpenCases,
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      bg: 'bg-orange-50',
      valueClassName: data.alerts.longOpenCases > 0 ? 'text-orange-600' : undefined,
      onClick: () => navigate('/accidents'),
    },
    {
      label: 'Con restricciones',
      value: data.alerts.employeesWithRestrictions,
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      bg: 'bg-amber-50',
      valueClassName: data.alerts.employeesWithRestrictions > 0 ? 'text-amber-600' : undefined,
      onClick: () => navigate('/clinical-histories'),
    },
    {
      label: 'Medicamentos críticos',
      value: data.alerts.criticalMedications,
      icon: <Package className="h-5 w-5 text-rose-500" />,
      bg: 'bg-rose-50',
      valueClassName: data.alerts.criticalMedications > 0 ? 'text-rose-600' : undefined,
      onClick: () => navigate('/medications'),
    },
  ]

  const maxArea = Math.max(...data.accidentsByArea.map(a => a.count), 1)

  return (
    <PageContainer title="Dashboard Administrador" description="Visión global del sistema">
      <div className="space-y-6">
        {/* Main cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mainCards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
        </div>

        {/* Alert cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {alertCards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
        </div>

        {/* Accidents by area + SST */}
        <div className="grid gap-6 xl:grid-cols-2">
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
                        style={{ width: `${(item.count / maxArea) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Indicadores SST</h2>
              <button
                onClick={() => navigate('/accidents')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver detalle
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Tasa por 100 empleados</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {data.sst.accidentRatePer100Employees}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Casos prolongados (+30 días)</p>
                <p className={`mt-1 text-lg font-semibold ${data.sst.casesOverThresholdDays > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                  {data.sst.casesOverThresholdDays}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System + Medical */}
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Sistema</h2>
              <button
                onClick={() => navigate('/system-settings/employee-sync')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ir a sync
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Usuarios activos"
                value={data.system.activeUsers}
                icon={<Users className="h-5 w-5 text-slate-600" />}
                bg="bg-slate-100"
                onClick={() => navigate('/users')}
              />
              <MetricCard
                label="Bloqueados"
                value={data.system.blockedUsers}
                valueClassName={data.system.blockedUsers > 0 ? 'text-red-600' : undefined}
                icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                bg="bg-red-50"
                onClick={() => navigate('/users')}
              />
              <div className="col-span-2 rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Última sincronización</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700">
                  {data.system.lastSyncAt
                    ? new Date(data.system.lastSyncAt).toLocaleString('es-PE')
                    : '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Medicamentos más usados</h2>
              <button
                onClick={() => navigate('/medications')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Gestionar farmacia
              </button>
            </div>

            {data.mostUsedMedications.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">Sin dispensaciones registradas</p>
            ) : (
              <div className="space-y-3">
                {data.mostUsedMedications.map(m => (
                  <div key={m.name} className="flex items-center justify-between text-sm">
                    <span className="truncate pr-4 text-slate-700">{m.name}</span>
                    <span className="shrink-0 font-medium text-slate-500">{m.count} uds</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
