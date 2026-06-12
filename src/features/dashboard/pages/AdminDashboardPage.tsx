import {
  Activity,
  AlertTriangle,
  Bell,
  CalendarDays,
  ClipboardList,
  Package,
  ShieldAlert,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { PageContainer, Select } from '@/shared/components'
import { DateRangeFilter, toISODate } from '@/shared/components/dashboard/DateRangeFilter'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { useAdminDashboard } from '../hooks/useAdminDashboard'
import { AdminDashboardSkeleton } from '../components/admin/AdminDashboardSkeleton'
import { MetricPanel } from '@/shared/components/dashboard/MetricPanel'
import { AdminActivityChart } from '../components/admin/AdminActivityChart'
import { PERSONAL_PANEL, ACCIDENTAL_PANEL, ALERTAS_PANEL, SISTEMA_PANEL } from '../constants/admin-dashboard.constants'

const EVENT_TYPE_OPTIONS = [
  { label: 'Solo accidentes', value: 'ACCIDENT' },
  { label: 'Solo incidentes', value: 'INCIDENT' },
]

export const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [defaults] = useState<DateRange>(() => ({
    startDate: toISODate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
    endDate: toISODate(new Date()),
  }))

  const dateRange: DateRange = {
    startDate: searchParams.get('startDate') ?? defaults.startDate,
    endDate: searchParams.get('endDate') ?? defaults.endDate,
  }

  const eventType = searchParams.get('eventType') ?? undefined

  const handleDateChange = (range: DateRange) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set('startDate', range.startDate)
      next.set('endDate', range.endDate)
      return next
    })
  }

  const handleEventTypeChange = (value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (value) next.set('eventType', value)
      else next.delete('eventType')
      return next
    })
  }

  const { data, isLoading, error } = useAdminDashboard(dateRange, eventType)

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
          {error?.message ?? 'No se pudo cargar el dashboard.'}
        </div>
      </PageContainer>
    )
  }

  const maxArea = Math.max(...data.accidentsByArea.map(a => a.count), 1)
  const maxClassification = Math.max(...(data.accidentsByClassification?.map(a => a.count) ?? []), 1)
  const maxMeds = Math.max(...data.mostUsedMedications.map(m => m.count), 1)
  const hasClassification = (data.accidentsByClassification?.length ?? 0) > 0

  const principalMetrics = [
    {
      info: PERSONAL_PANEL,
      rows: [
        { label: 'Trabajadores activos', value: data.summary.totalEmployees, icon: <Users className="h-4 w-4 text-slate-600" />, path: '/employees' },
        { label: 'Empleados internos', value: data.summary.internalEmployees, icon: <Users className="h-4 w-4 text-indigo-500" />, path: '/employees' },
        { label: 'Empleados externos', value: data.summary.externalEmployees, icon: <Users className="h-4 w-4 text-slate-400" />, path: '/externos' },
      ]
    },
    {
      info: ACCIDENTAL_PANEL,
      rows: [
        { label: 'Casos activos', value: data.summary.activeCases, icon: <Activity className="h-4 w-4 text-red-500" />, valueClassName: data.summary.activeCases > 0 ? 'text-red-600' : undefined, path: '/accidents' },
        { label: 'Accidentes totales', value: data.summary.totalAccidents, icon: <ShieldAlert className="h-4 w-4 text-amber-500" />, valueClassName: 'text-amber-600', path: '/accidents' },
        { label: 'Casos prolongados +30d', value: data.sst.casesOverThresholdDays, icon: <AlertTriangle className="h-4 w-4 text-orange-500" />, valueClassName: data.sst.casesOverThresholdDays > 0 ? 'text-orange-600' : undefined, path: '/accidents' },
        { label: 'Tasa por 100 emp.', value: data.sst.accidentRatePer100Employees, icon: <TrendingUp className="h-4 w-4 text-slate-400" /> },
      ]
    },
    {
      info: ALERTAS_PANEL,
      rows: [
        { label: 'Follow-ups vencidos', value: data.alerts.overdueFollowUps, icon: <AlertTriangle className="h-4 w-4 text-red-500" />, valueClassName: data.alerts.overdueFollowUps > 0 ? 'text-red-600' : undefined, path: '/attentions' },
        { label: 'Con restricciones', value: data.alerts.employeesWithRestrictions, icon: <AlertTriangle className="h-4 w-4 text-amber-500" />, valueClassName: data.alerts.employeesWithRestrictions > 0 ? 'text-amber-600' : undefined, path: '/employees' },
        { label: 'Medicamentos críticos', value: data.alerts.criticalMedications, icon: <Package className="h-4 w-4 text-rose-500" />, valueClassName: data.alerts.criticalMedications > 0 ? 'text-rose-600' : undefined, path: '/medications' },
        { label: 'Más de 21 días DM', value: data.alerts.workersWithOver21DmDays, icon: <AlertTriangle className="h-4 w-4 text-red-400" />, valueClassName: data.alerts.workersWithOver21DmDays > 0 ? 'text-red-600' : undefined },
        { label: 'DM por vencer', value: data.alerts.dmDaysExpiringSoon, icon: <AlertTriangle className="h-4 w-4 text-amber-400" />, valueClassName: data.alerts.dmDaysExpiringSoon > 0 ? 'text-amber-600' : undefined },
        { label: 'Lotes por vencer (30d)', value: data.alerts.lotsExpiringSoon, icon: <CalendarDays className="h-4 w-4 text-orange-500" />, valueClassName: data.alerts.lotsExpiringSoon > 0 ? 'text-orange-600' : undefined, path: '/medications' },
      ]
    }
  ]

  const secondaryMetrics = [
    {
      info: SISTEMA_PANEL,
      rows: [
        { label: 'Usuarios activos', value: data.system.activeUsers, icon: <Users className="h-4 w-4 text-slate-600" /> },
        { label: 'Bloqueados', value: data.system.blockedUsers, icon: <AlertTriangle className="h-4 w-4 text-red-500" />, iconBg: 'bg-red-50', valueClassName: data.system.blockedUsers > 0 ? 'text-red-600' : undefined },
        { label: 'Última sync', value: data.system.lastSyncAt ? new Date(data.system.lastSyncAt).toLocaleString('es-PE') : '—', icon: <TrendingUp className="h-4 w-4 text-slate-400" /> },
      ]
    }
  ]

  return (
    <PageContainer title="Dashboard Administrador" description="Visión global del sistema">
      <div className="space-y-6">

        <div className="flex flex-wrap items-end gap-3">
          <DateRangeFilter value={dateRange} onChange={handleDateChange} />
          <Select
            name="eventType"
            placeholder="Todos los eventos"
            showDefaultOption
            value={eventType ?? ''}
            options={EVENT_TYPE_OPTIONS}
            onChange={handleEventTypeChange}
            className="w-52"
          />
        </div>

        {/* Range-dependent: 4 cards apiladas + gráfico de actividad */}
        <div className="grid gap-4 xl:grid-cols-4">
          <div className="flex flex-col gap-3">
            {[
              { label: 'Atenciones en rango', value: data.summary.consultationsInRange, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <TrendingUp className="h-5 w-5 text-indigo-600" />, path: '/attentions' },
              { label: 'Follow-ups en rango', value: data.summary.followUpsInRange, color: 'text-blue-600', bg: 'bg-blue-50', icon: <ClipboardList className="h-5 w-5 text-blue-600" />, path: '/attentions' },
              { label: 'Accidentes en rango', value: data.accidentsInRange, color: 'text-amber-600', bg: 'bg-amber-50', icon: <ShieldAlert className="h-5 w-5 text-amber-600" />, path: '/accidents' },
              { label: 'Dispensaciones en rango', value: data.dispensationsInRange, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Package className="h-5 w-5 text-emerald-600" />, path: '/dispensations' },
            ].map(card => (
              <div
                key={card.label}
                onClick={() => card.path && navigate(card.path)}
                className={`flex flex-1 ${card.path ? 'cursor-pointer' : ''} items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md`}
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.label}</p>
                  <p className={`mt-1 text-2xl font-semibold ${card.color}`}>{card.value}</p>
                </div>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bg}`}>
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm xl:col-span-3">
            <p className="mb-3 text-sm font-semibold text-slate-700">Actividad del período</p>
            {data.activityTrend.length === 0 ? (
              <div className="flex h-55 items-center justify-center text-sm text-slate-400 xl:h-68.75">
                Sin datos en el período
              </div>
            ) : (
              <AdminActivityChart data={data.activityTrend} />
            )}
          </div>
        </div>

        {/* Accidentes por área */}
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
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
              <p className="py-6 text-center text-sm text-slate-400">Sin accidentes en el rango</p>
            ) : (
              <div className="space-y-4">
                {data.accidentsByArea.map(item => (
                  <div key={item.area} onClick={() => navigate(`/accidents?areaName=${encodeURIComponent(item.area)}`)} className="cursor-pointer">
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
              <h2 className="text-base font-semibold text-slate-900">Medicamentos más usados</h2>
              <button
                onClick={() => navigate('/medications')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Gestionar farmacia
              </button>
            </div>
            {data.mostUsedMedications.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">Sin dispensaciones en el rango</p>
            ) : (
              <div className="space-y-4">
                {data.mostUsedMedications.map(m => (
                  <div key={m.name} onClick={() => navigate('/medications')} className="cursor-pointer">
                    <div className="flex justify-between text-sm font-medium text-slate-700">
                      <span className="truncate pr-2">{m.name}</span>
                      <span className="shrink-0 text-slate-500">{m.count} uds</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-400"
                        style={{ width: `${(m.count / maxMeds) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {hasClassification && (
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Accidentes por clasificación</h2>
              <button
                onClick={() => navigate('/accidents')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver accidentes
              </button>
            </div>
            <div className="space-y-4">
              {data.accidentsByClassification.map(item => (
                <div key={item.classification} onClick={() => navigate(`/accidents?formClassification=${encodeURIComponent(item.classification)}`)} className="cursor-pointer">
                  <div className="flex justify-between text-sm font-medium text-slate-700">
                    <span className="truncate pr-2">{item.classification}</span>
                    <span className="shrink-0 text-slate-500">{item.count}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{ width: `${(item.count / maxClassification) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-4">
          {principalMetrics.map(({ info, rows }) => (
            <MetricPanel
              key={info.title}
              {...info}
              onAction={() => info.path ? navigate(info.path) : null}
              rows={rows}
            />
          ))}
          <MetricPanel
            title="Salud"
            actionLabel="Ver ciclos EMO"
            onAction={() => navigate('/emo-cycles')}
            rows={[
              {
                label: 'En descanso médico',
                icon: <Activity className="h-4 w-4 text-amber-500" />,
                value: data.employeesOnMedicalRest,
                iconBg: 'bg-amber-50',
                valueClassName: data.employeesOnMedicalRest > 0 ? 'text-amber-600' : undefined,
              },
              {
                label: 'EMOs por vencer (30d)',
                icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                value: data.emosExpiringSoon,
                iconBg: 'bg-amber-50',
                valueClassName: data.emosExpiringSoon > 0 ? 'text-amber-600' : undefined,
                path: '/emo-cycles',
              },
              {
                label: 'Conf. pendiente empleado',
                icon: <ClipboardList className="h-4 w-4 text-amber-500" />,
                value: data.pendingEmployeeConformity,
                iconBg: 'bg-amber-50',
                valueClassName: data.pendingEmployeeConformity > 0 ? 'text-amber-600' : undefined,
                path: '/emo-cycles',
              },
              {
                label: 'Alertas inventario',
                icon: <Bell className="h-4 w-4 text-red-500" />,
                value: data.unresolvedInventoryAlerts,
                iconBg: 'bg-red-50',
                valueClassName: data.unresolvedInventoryAlerts > 0 ? 'text-red-600' : undefined,
                path: '/alerts',
              },
            ]}
          />
        </div>

        {secondaryMetrics.map(({ info, rows }) => (
          <MetricPanel
            key={info.title}
            {...info}
            onAction={() => info.path ? navigate(info.path) : null}
            rows={rows}
          />
        ))}

      </div>
    </PageContainer>
  )
}
