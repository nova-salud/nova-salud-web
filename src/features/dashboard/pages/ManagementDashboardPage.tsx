import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BedDouble,
  Bell,
  CheckCircle2,
  ClipboardList,
  Eye,
  Package,
  ShieldAlert,
  Timer,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import { cn } from '@/shared/utils'
import { EmptyState, PageContainer } from '@/shared/components'
import { DateRangeFilter, toISODate } from '@/shared/components/dashboard/DateRangeFilter'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { LastUpdatedLabel } from '@/shared/components/dashboard/LastUpdatedLabel'
import { MetricPanel } from '@/shared/components/dashboard/MetricPanel'
import { useManagementDashboard } from '../hooks/useManagementDashboard'
import { ManagementDashboardSkeleton } from '../components/management/ManagementDashboardSkeleton'
import { RequirementsTrendChart } from '../components/management/RequirementsTrendChart'
import { AbsenteeismTrendChart } from '../components/management/AbsenteeismTrendChart'
import { ACCIDENT_STATUS_CLASSNAME, ACCIDENT_STATUS_LABEL, ACCIDENT_TYPE_LABEL } from '@/features/accidents/accidents/types'

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
  const [searchParams, setSearchParams] = useSearchParams()
  const [defaults] = useState<DateRange>(() => ({
    startDate: toISODate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
    endDate: toISODate(new Date()),
  }))

  const dateRange: DateRange = {
    startDate: searchParams.get('startDate') ?? defaults.startDate,
    endDate: searchParams.get('endDate') ?? defaults.endDate,
  }

  const handleDateChange = (range: DateRange) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set('startDate', range.startDate)
      next.set('endDate', range.endDate)
      return next
    })
  }

  const { data, isLoading, error, dataUpdatedAt } = useManagementDashboard(dateRange)

  if (isLoading) {
    return (
      <PageContainer title="Dashboard RRHH" description="Visión operativa de personal y requerimientos">
        <ManagementDashboardSkeleton />
      </PageContainer>
    )
  }

  if (error || !data) {
    return (
      <PageContainer title="Dashboard RRHH" description="Visión operativa de personal y requerimientos">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error?.message ?? 'No se pudo cargar el dashboard.'}
        </div>
      </PageContainer>
    )
  }

  const maxEmployees = Math.max(...data.employeesByArea.map(a => a.count), 1)
  const maxAccidents = Math.max(...data.accidentsByArea.map(a => a.count), 1)

  return (
    <PageContainer
      title="Dashboard RRHH"
      description="Visión operativa de personal y requerimientos"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <DateRangeFilter value={dateRange} onChange={handleDateChange} />
          <LastUpdatedLabel timestamp={dataUpdatedAt} />
        </div>

        {/* Quick stat cards + tendencia requerimientos */}
        <div className="grid gap-4 xl:grid-cols-4">
          <div className="flex flex-col gap-3">
            {[
              { label: 'Atenciones en rango', value: data.summary.attentionsInRange, color: 'text-emerald-600', bg: 'bg-emerald-50', Icon: TrendingUp, path: '/clinical-attention' },
              { label: 'Seguimientos en rango', value: data.summary.followUpsInRange, color: 'text-blue-600', bg: 'bg-blue-50', Icon: ClipboardList, path: '/clinical-attention' },
              { label: 'Requerimientos en rango', value: data.requirementsInRange, color: 'text-indigo-600', bg: 'bg-indigo-50', Icon: Package, path: '/requirements' },
            ].map(card => (
              <div
                key={card.label}
                className="flex flex-1 cursor-pointer items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                onClick={() => navigate(card.path)}
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.label}</p>
                  <p className={cn('mt-1 text-2xl font-semibold', card.color)}>{card.value}</p>
                </div>
                <div className={cn('relative flex h-9 w-9 items-center justify-center rounded-xl', card.bg)}>
                  <card.Icon className={cn('h-5 w-5', card.color)} />
                  <ArrowUpRight className="absolute -right-1 -top-1 h-3 w-3 text-slate-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm xl:col-span-3">
            <p className="mb-3 text-sm font-semibold text-slate-700">Tendencia de requerimientos</p>
            {data.requirementsTrend.length === 0 ? (
              <EmptyState title="Sin datos en el período" />
            ) : (
              <RequirementsTrendChart
                data={data.requirementsTrend}
                onDateClick={(date) => navigate(`/requirements?createdAtFrom=${date}&createdAtTo=${date}`)}
              />
            )}
          </div>
        </div>

        {/* Tendencia de ausentismo */}
        <div className="grid gap-4 xl:grid-cols-4">
          <div className="flex flex-col gap-3">
            <div
              className="flex flex-1 cursor-pointer items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              onClick={() => navigate('/medical-rests')}
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">En descanso médico</p>
                <p className="mt-1 text-2xl font-semibold text-amber-600">{data.workersOnMedicalRest}</p>
              </div>
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
                <BedDouble className="h-5 w-5 text-amber-600" />
                <ArrowUpRight className="absolute -right-1 -top-1 h-3 w-3 text-slate-400" />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">+21 días en DM</p>
                <p className={cn('mt-1 text-2xl font-semibold', data.workersWithOver21DmDays > 0 ? 'text-red-600' : 'text-slate-700')}>
                  {data.workersWithOver21DmDays}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle className={cn('h-5 w-5', data.workersWithOver21DmDays > 0 ? 'text-red-500' : 'text-slate-400')} />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm xl:col-span-3">
            <p className="mb-3 text-sm font-semibold text-slate-700">Tendencia de ausentismo</p>
            {data.absenteeismTrend.length === 0 ? (
              <EmptyState title="Sin descansos médicos en el período" />
            ) : (
              <AbsenteeismTrendChart
                data={data.absenteeismTrend}
                onDateClick={(date) => navigate(`/medical-rests?startDateFrom=${date}`)}
              />
            )}
          </div>
        </div>

        {/* Estado de requerimientos */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Estado de requerimientos</h2>
            <button
              onClick={() => navigate('/requirements')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver todos
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Total', value: data.requirementsSummary.total, color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' },
              { label: 'Pendientes', value: data.requirementsSummary.pending, color: data.requirementsSummary.pending > 0 ? 'text-amber-600' : 'text-slate-700', bg: 'bg-amber-50', border: 'border-amber-100' },
              { label: 'En proceso', value: data.requirementsSummary.inProgress, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
              { label: 'Entregados', value: data.requirementsSummary.delivered, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
            ].map(item => (
              <div
                key={item.label}
                onClick={() => navigate('/requirements')}
                className={cn('cursor-pointer rounded-2xl border p-4 transition hover:shadow-sm', item.bg, item.border)}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className={cn('mt-1 text-2xl font-semibold', item.color)}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

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
              <EmptyState title="Sin empleados por área" />
            ) : (
              <div className="space-y-4">
                {data.employeesByArea.map(item => (
                  <div key={item.area} onClick={() => navigate(`/employees?areaName=${encodeURIComponent(item.area)}`)} className="cursor-pointer group">
                    <div className="flex justify-between text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-600">
                      <span className="truncate pr-2">{item.area}</span>
                      <span className="shrink-0 text-slate-500">{item.count}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-opacity group-hover:opacity-80"
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
              <EmptyState title="Sin accidentes en el período" />
            ) : (
              <div className="space-y-4">
                {data.accidentsByArea.map(item => (
                  <div key={item.area} onClick={() => navigate(`/accidents?areaName=${encodeURIComponent(item.area)}`)} className="cursor-pointer group">
                    <div className="flex justify-between text-sm font-medium text-slate-700 transition-colors group-hover:text-indigo-600">
                      <span className="truncate pr-2">{item.area}</span>
                      <span className="shrink-0 text-slate-500">{item.count}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500 transition-opacity group-hover:opacity-80"
                        style={{ width: `${(item.count / maxAccidents) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Accidentes — resumen + últimos */}
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Casos abiertos', value: data.accidentSummary.openAccidents, color: data.accidentSummary.openAccidents > 0 ? 'text-red-600' : 'text-slate-700', bg: 'bg-red-50', Icon: ShieldAlert, path: '/accidents' },
              { label: 'Con restricciones', value: data.accidentSummary.withActiveRestrictions, color: data.accidentSummary.withActiveRestrictions > 0 ? 'text-amber-600' : 'text-slate-700', bg: 'bg-amber-50', Icon: AlertTriangle, path: '/employees' },
              { label: 'Altas pendientes', value: data.accidentSummary.pendingDischarges, color: data.accidentSummary.pendingDischarges > 0 ? 'text-orange-600' : 'text-slate-700', bg: 'bg-orange-50', Icon: Activity, path: '/accidents' },
            ].map(card => (
              <div
                key={card.label}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                onClick={() => navigate(card.path)}
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.label}</p>
                  <p className={cn('mt-1 text-xl font-semibold', card.color)}>{card.value}</p>
                </div>
                <div className={cn('relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl', card.bg)}>
                  <card.Icon className={cn('h-4 w-4', card.color)} />
                  <ArrowUpRight className="absolute -right-1 -top-1 h-3 w-3 text-slate-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">Últimos accidentes</h2>
              <button
                onClick={() => navigate('/accidents')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver todos
              </button>
            </div>
            {data.recentAccidents.length === 0 ? (
              <div className="flex items-center justify-center py-10 text-sm text-slate-400">
                No hay accidentes registrados
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-400">
                      <th className="px-6 py-3">Trabajador</th>
                      <th className="px-6 py-3">Área</th>
                      <th className="px-6 py-3">Fecha</th>
                      <th className="px-6 py-3">Tipo</th>
                      <th className="px-6 py-3">Estado</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentAccidents.map(item => (
                      <tr
                        key={item.id}
                        onClick={() => navigate(`/accidents/${item.id}`)}
                        className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">{item.employeeName}</td>
                        <td className="px-6 py-4 text-slate-600">{item.areaName ?? '—'}</td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(item.occurredAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {ACCIDENT_TYPE_LABEL[item.type as keyof typeof ACCIDENT_TYPE_LABEL] ?? item.type}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'rounded-xl px-2 py-1 text-xs font-medium',
                            ACCIDENT_STATUS_CLASSNAME[item.status as keyof typeof ACCIDENT_STATUS_CLASSNAME] ?? 'bg-slate-100 text-slate-600',
                          )}>
                            {ACCIDENT_STATUS_LABEL[item.status as keyof typeof ACCIDENT_STATUS_LABEL] ?? item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <Eye className="h-3.5 w-3.5 text-slate-300" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <MetricPanel
            title="Personal"
            actionLabel="Ver empleados"
            onAction={() => navigate('/employees')}
            rows={[
              {
                label: 'Trabajadores activos',
                icon: <Users className="h-4 w-4 text-slate-600" />,
                value: data.summary.totalEmployees,
                iconBg: 'bg-slate-100',
                path: '/employees',
              },
              {
                label: 'Internos',
                icon: <Users className="h-4 w-4 text-indigo-600" />,
                value: data.summary.internalEmployees,
                iconBg: 'bg-indigo-50',
                path: '/employees',
              },
              {
                label: 'Externos',
                icon: <Users className="h-4 w-4 text-blue-600" />,
                value: data.summary.externalEmployees,
                iconBg: 'bg-blue-50',
                path: '/externos',
              },
              {
                label: 'Ciclos EMO activos',
                icon: <Activity className="h-4 w-4 text-indigo-600" />,
                value: data.summary.activeCycles,
                iconBg: 'bg-indigo-50',
                path: '/emo-cycles',
              },
              {
                label: 'Con restricciones',
                icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                value: data.alerts.employeesWithRestrictions,
                iconBg: 'bg-amber-50',
                valueClassName: data.alerts.employeesWithRestrictions > 0 ? 'text-amber-600' : undefined,
                path: '/employees',
              },
              {
                label: 'En descanso médico',
                icon: <BedDouble className="h-4 w-4 text-amber-500" />,
                value: data.workersOnMedicalRest,
                iconBg: 'bg-amber-50',
                valueClassName: data.workersOnMedicalRest > 0 ? 'text-amber-600' : undefined,
                path: '/medical-rests',
              },
            ]}
          />

          <MetricPanel
            title="Alertas"
            actionLabel="Ver requerimientos"
            onAction={() => navigate('/requirements')}
            rows={[
              {
                label: 'Seguimientos vencidos',
                icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
                value: data.alerts.overdueFollowUps,
                iconBg: 'bg-red-50',
                valueClassName: data.alerts.overdueFollowUps > 0 ? 'text-red-600' : undefined,
                path: '/attentions',
              },
              {
                label: 'Req. pendientes',
                icon: <ClipboardList className="h-4 w-4 text-amber-500" />,
                value: data.alerts.pendingRequirements,
                iconBg: 'bg-amber-50',
                valueClassName: data.alerts.pendingRequirements > 0 ? 'text-amber-600' : undefined,
                path: '/requirements',
              },
              {
                label: 'Alertas inventario',
                icon: <Bell className="h-4 w-4 text-red-500" />,
                value: data.unresolvedInventoryAlerts,
                iconBg: 'bg-red-50',
                valueClassName: data.unresolvedInventoryAlerts > 0 ? 'text-red-600' : undefined,
                path: '/alerts',
              },
              {
                label: 'Trabajadores +21 días DM',
                icon: <BedDouble className="h-4 w-4 text-red-500" />,
                value: data.workersWithOver21DmDays,
                iconBg: 'bg-red-50',
                valueClassName: data.workersWithOver21DmDays > 0 ? 'text-red-600' : undefined,
              },
              {
                label: 'Prom. días de entrega',
                icon: <Timer className="h-4 w-4 text-slate-500" />,
                value: data.avgDeliveryDays > 0 ? `${data.avgDeliveryDays.toFixed(1)} días` : '—',
                iconBg: 'bg-slate-100',
              },
            ]}
          />

          <MetricPanel
            title="Requerimientos"
            actionLabel="Ver todos"
            onAction={() => navigate('/requirements')}
            rows={[
              {
                label: 'Total histórico',
                icon: <ClipboardList className="h-4 w-4 text-slate-600" />,
                value: data.requirementsSummary.total,
                iconBg: 'bg-slate-100',
                path: '/requirements',
              },
              {
                label: 'Pendientes',
                icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                value: data.requirementsSummary.pending,
                iconBg: 'bg-amber-50',
                valueClassName: data.requirementsSummary.pending > 0 ? 'text-amber-600' : undefined,
                path: '/requirements',
              },
              {
                label: 'En proceso',
                icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
                value: data.requirementsSummary.inProgress,
                iconBg: 'bg-blue-50',
                path: '/requirements',
              },
              {
                label: 'Entregados',
                icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
                value: data.requirementsSummary.delivered,
                iconBg: 'bg-emerald-50',
                valueClassName: 'text-emerald-600',
                path: '/requirements',
              },
            ]}
          />
        </div>

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
                    <th className="px-6 py-3">Ítems</th>
                    <th className="px-6 py-3">Fecha</th>
                    <th className="w-8" />
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
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.itemCount} ítem{item.itemCount !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <Eye className="h-3.5 w-3.5 text-slate-300" />
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
