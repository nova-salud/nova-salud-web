import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Activity,
  TrendingUp,
  Users,
  Clock,
  CalendarDays,
  Package,
  RotateCcw,
  Shield,
} from 'lucide-react'
import { ACCIDENT_TYPE_CLASSNAME, ACCIDENT_TYPE_LABEL } from '@/features/accidents/accidents/types'
import { ACCIDENT_FORM_LABEL, AccidentFormEnum } from '@/features/accidents/accidents/types/accident-form.enum'
import { MetricPanel } from '@/shared/components/dashboard/MetricPanel'
import { cn } from '@/shared/utils'
import { AccidentTrendChart } from '../components/sst/AccidentTrendChart'
import { useSSTDashboard } from '../hooks/useSSTDashboard'
import { SSTDashboardSkeleton } from '../components/sst/SSTDashboardSkeleton'
import { useNavigate, useSearchParams } from 'react-router'
import { DateRangeFilter, toISODate } from '@/shared/components/dashboard/DateRangeFilter'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { Select } from '@/shared/components/ui/form/Select'
import { PageContainer } from '@/shared/components'

const EVENT_TYPE_OPTIONS = [
  { label: 'Solo accidentes', value: 'ACCIDENT' },
  { label: 'Solo incidentes', value: 'INCIDENT' },
]

const formLabel = (form: string): string =>
  ACCIDENT_FORM_LABEL[form as AccidentFormEnum] ?? form

const SEVERITY_LABEL: Record<string, string> = {
  FATAL_ACCIDENT: 'Accidente fatal',
  DISABLING_ACCIDENT: 'Accidente incapacitante',
  MINOR_ACCIDENT: 'Accidente leve',
  INCIDENT: 'Incidente',
}

const SEVERITY_COLOR: Record<string, string> = {
  FATAL_ACCIDENT: 'text-red-600',
  DISABLING_ACCIDENT: 'text-orange-500',
  MINOR_ACCIDENT: 'text-amber-500',
  INCIDENT: 'text-blue-500',
}

const SEVERITY_BAR: Record<string, string> = {
  FATAL_ACCIDENT: 'bg-red-500',
  DISABLING_ACCIDENT: 'bg-orange-400',
  MINOR_ACCIDENT: 'bg-amber-400',
  INCIDENT: 'bg-blue-500',
}

const SEVERITY_LEVELS = ['FATAL_ACCIDENT', 'DISABLING_ACCIDENT', 'MINOR_ACCIDENT', 'INCIDENT']

export const SSTDashboardPage = () => {
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

  const { data, isLoading } = useSSTDashboard(dateRange, eventType)

  const filteredTrend = useMemo(() => {
    const trend = data?.trend ?? []
    return trend.map(t => {
      const date = new Date(t.date)
      return {
        ...t,
        date: isNaN(date.getTime()) ? '' : format(date, 'yyyy-MM-dd'),
      }
    })
  }, [data])

  if (isLoading) return <SSTDashboardSkeleton />
  if (!data) return null

  const accidentRate = data.executiveMetrics.accidentRatePer100Employees.toFixed(2)
  const avgRecovery = data.executiveMetrics.averageRecoveryDays.toFixed(2)
  const recurrenceRateFormatted = data.interestingMetrics.recurrenceRate.toFixed(2)

  const monthlyTrend = data.executiveMetrics.monthlyTrendPercentage ?? 0
  const isGood = monthlyTrend < 0
  const trendPercentage = Math.abs(monthlyTrend).toFixed(1)
  const trendLabel =
    monthlyTrend === 0
      ? 'Sin variación'
      : isGood
        ? `↓ ${trendPercentage}%`
        : `↑ ${trendPercentage}%`
  const trendClassName = monthlyTrend === 0 ? undefined : isGood ? 'text-emerald-600' : 'text-red-600'

  const maxForm = Math.max(...(data.accidentsByForm?.map(f => f.count) ?? []), 1)
  const maxArea = Math.max(...(data.interestingMetrics.topAreas?.map(a => a.count) ?? []), 1)
  const maxSeverity = Math.max(...(data.severityDistribution?.map(s => s.count) ?? []), 1)
  const maxInvestigation = Math.max(...(data.investigationsByResponsible?.map(r => r.count) ?? []), 1)

  const accidentalidadRows = [
    {
      label: 'Accidentes totales',
      value: data.summary.totalAccidents,
      icon: <ShieldAlert className="h-4 w-4 text-slate-600" />,
    },
    {
      label: 'Casos abiertos',
      value: data.summary.openAccidents,
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      valueClassName: data.summary.openAccidents > 0 ? 'text-amber-600' : undefined,
    },
    {
      label: 'Con restricciones activas',
      value: data.summary.withActiveRestrictions,
      icon: <Activity className="h-4 w-4 text-red-500" />,
      valueClassName: data.summary.withActiveRestrictions > 0 ? 'text-red-600' : undefined,
    },
    {
      label: 'Altas pendientes',
      value: data.summary.pendingDischarges,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    },
    {
      label: 'Casos prolongados +7d',
      value: data.coreMetrics.casesOverThresholdDays,
      icon: <AlertTriangle className="h-4 w-4 text-orange-500" />,
      valueClassName: data.coreMetrics.casesOverThresholdDays > 0 ? 'text-orange-600' : undefined,
    },
    {
      label: 'SCTR activados',
      value: data.sctrActivations,
      icon: <Shield className="h-4 w-4 text-amber-500" />,
      iconBg: 'bg-amber-50',
      valueClassName: data.sctrActivations > 0 ? 'text-amber-600' : undefined,
    },
  ]

  const alertasRows = [
    {
      label: 'Follow-ups vencidos',
      value: data.coreMetrics.overdueFollowUps,
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      valueClassName: data.coreMetrics.overdueFollowUps > 0 ? 'text-red-600' : undefined,
    },
    {
      label: 'Empleados con restricciones',
      value: data.coreMetrics.employeesWithRestrictions,
      icon: <Users className="h-4 w-4 text-red-500" />,
      valueClassName: data.coreMetrics.employeesWithRestrictions > 0 ? 'text-red-600' : undefined,
    },
    {
      label: 'Días sin accidente',
      value: data.daysSinceLastAccident != null ? data.daysSinceLastAccident : '—',
      icon: <CalendarDays className="h-4 w-4 text-emerald-500" />,
      valueClassName: 'text-emerald-600',
    },
    {
      label: 'Casos conductuales',
      value: data.behavioralCases,
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      iconBg: 'bg-amber-50',
      valueClassName: data.behavioralCases > 0 ? 'text-amber-600' : undefined,
    },
    {
      label: 'Trabajadores +21 días DM',
      value: data.workersWithOver21DmDays,
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      valueClassName: data.workersWithOver21DmDays > 0 ? 'text-red-600' : undefined,
    },
    {
      label: 'DM por vencer (mes próx.)',
      value: data.dmDaysExpiringSoon,
      icon: <CalendarDays className="h-4 w-4 text-amber-500" />,
      valueClassName: data.dmDaysExpiringSoon > 0 ? 'text-amber-600' : undefined,
    },
    {
      label: 'Medicamentos críticos',
      value: data.criticalMedicationsCount,
      icon: <Package className="h-4 w-4 text-red-500" />,
      valueClassName: data.criticalMedicationsCount > 0 ? 'text-red-600' : undefined,
    },
    {
      label: 'Lotes por vencer (30d)',
      value: data.lotsExpiringSoon,
      icon: <CalendarDays className="h-4 w-4 text-orange-500" />,
      valueClassName: data.lotsExpiringSoon > 0 ? 'text-orange-600' : undefined,
    },
  ]

  const ejecutivasRows = [
    {
      label: 'Empleados externos involucrados',
      value: data.interestingMetrics.externalEmployeesInvolved,
      icon: <Users className="h-4 w-4 text-slate-400" />,
    },
    {
      label: 'Reincidencia',
      value: `${recurrenceRateFormatted}%`,
      icon: <RotateCcw className="h-4 w-4 text-indigo-500" />,
    },
    {
      label: 'Días prom. recuperación',
      value: avgRecovery,
      icon: <Clock className="h-4 w-4 text-slate-400" />,
    },
    {
      label: 'Cumplim. follow-ups SST',
      value: `${data.sstFollowUpCompletionRate.toFixed(1)}%`,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
      iconBg: 'bg-emerald-50',
      valueClassName: 'text-emerald-600',
    },
  ]

  return (
    <PageContainer
      title="Dashboard SST"
      description="Indicadores de seguridad y salud ocupacional"
    >
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

        <div className="grid gap-6 xl:grid-cols-4">
          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Accidentes en rango',
                value: data.coreMetrics.accidentsThisMonth,
                icon: <ShieldAlert className="h-5 w-5 text-amber-600" />,
                bg: 'bg-amber-50',
                valueClass: 'text-amber-600',
                onClick: () => navigate('/accidents'),
              },
              {
                label: 'Período anterior',
                value: data.coreMetrics.accidentsLastMonth,
                icon: <ShieldAlert className="h-5 w-5 text-slate-500" />,
                bg: 'bg-slate-100',
              },
              {
                label: 'Tasa por 100 emp.',
                value: accidentRate,
                icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
                bg: 'bg-indigo-50',
              },
              {
                label: 'Variación del período',
                value: trendLabel,
                icon: <TrendingUp className="h-5 w-5 text-slate-500" />,
                bg: 'bg-slate-100',
                valueClass: trendClassName,
              },
            ].map((c) => (
              <div
                key={c.label}
                onClick={c.onClick}
                className={cn(
                  'flex flex-1 items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm',
                  c.onClick && 'cursor-pointer transition hover:shadow-md hover:-translate-y-0.5'
                )}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{c.label}</p>
                  <p className={cn('mt-1 text-lg font-semibold', c.valueClass ?? 'text-slate-900')}>{c.value}</p>
                </div>
                <div className={cn('rounded-2xl p-3', c.bg)}>{c.icon}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Tendencia de accidentes</h2>
              <button
                onClick={() => navigate('/accidents')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver accidentes
              </button>
            </div>

            <AccidentTrendChart data={filteredTrend} />

            <div className="mt-4 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-600" />
                <span className="text-slate-600">Accidentes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-slate-600">Incidentes</span>
              </div>
            </div>
          </div>
        </div>

        {(data.severityDistribution?.length ?? 0) > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Distribución por severidad</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {SEVERITY_LEVELS.map(level => {
                const item = data.severityDistribution.find(s => s.level === level)
                const count = item?.count ?? 0
                return (
                  <div key={level} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="truncate text-sm font-medium text-slate-700">{SEVERITY_LABEL[level] ?? level}</p>
                    <p className={cn('mt-1 text-2xl font-semibold', SEVERITY_COLOR[level])}>{count}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={cn('h-full rounded-full', SEVERITY_BAR[level])}
                        style={{ width: `${(count / maxSeverity) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {data.accidentsByForm?.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Formas de accidente</h2>
              <button
                onClick={() => navigate('/accidents')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver accidentes
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {data.accidentsByForm.map(item => (
                <div key={item.form} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="truncate text-sm font-medium text-slate-700">{formLabel(item.form)}</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{item.count}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all"
                      style={{ width: `${(item.count / maxForm) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.interestingMetrics.topAreas?.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Áreas con mayor incidencia</h2>
            <div className="space-y-4">
              {data.interestingMetrics.topAreas.map((area, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-medium text-slate-700">
                    <span className="truncate pr-2">{area.area}</span>
                    <span className="shrink-0 text-slate-500">{area.count}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${(area.count / maxArea) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-3">
          <MetricPanel
            title="Accidentalidad"
            actionLabel="Ver accidentes"
            onAction={() => navigate('/accidents')}
            rows={accidentalidadRows}
                      />
          <MetricPanel
            title="Alertas"
            actionLabel="Ver accidentes"
            onAction={() => navigate('/accidents')}
            rows={alertasRows}
                      />
          <MetricPanel
            title="Métricas ejecutivas"
            rows={ejecutivasRows}
                      />
        </div>

        {(data.investigationsByResponsible?.length ?? 0) > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-slate-900">Investigaciones abiertas</h2>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  {data.openInvestigations}
                </span>
              </div>
              <button
                onClick={() => navigate('/accidents')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver accidentes
              </button>
            </div>
            <div className="space-y-4">
              {data.investigationsByResponsible.map(item => (
                <div key={item.responsible}>
                  <div className="flex justify-between text-sm font-medium text-slate-700">
                    <span className="truncate pr-2">{item.responsible}</span>
                    <span className="shrink-0 text-slate-500">{item.count}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all"
                      style={{ width: `${(item.count / maxInvestigation) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">Últimos accidentes</h2>
            <button
              onClick={() => navigate('/accidents')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver todos
            </button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400">
                <th className="px-6 py-3">Trabajador</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.recentAccidents.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/accidents/${item.id}`)}
                  className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.employeeName}
                  </td>
                  <td>
                    {format(new Date(item.occurredAt), 'dd/MM/yyyy')}
                  </td>
                  <td>
                    <span
                      className={cn(
                        'rounded-xl px-2 py-1 text-xs',
                        ACCIDENT_TYPE_CLASSNAME[item.type]
                      )}
                    >
                      {ACCIDENT_TYPE_LABEL[item.type]}
                    </span>
                  </td>
                  <td>
                    <span
                      className={cn(
                        'rounded-xl px-2 py-1 text-xs',
                        item.status === 'OPEN'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      )}
                    >
                      {item.status === 'OPEN' ? 'Abierto' : 'Cerrado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </PageContainer>
  )
}
