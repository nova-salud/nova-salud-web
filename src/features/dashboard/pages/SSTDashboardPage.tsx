import { useMemo } from 'react'
import { format } from 'date-fns'
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Activity,
  TrendingUp,
  Users
} from 'lucide-react'
import { DashboardCard } from '@/shared/components/dashboard/DashboardCard'
import { ACCIDENT_TYPE_CLASSNAME, ACCIDENT_TYPE_LABEL } from '@/features/accidents/accidents/types'
import { MetricBox } from '@/shared/components/dashboard/MetricBox'
import { cn } from '@/shared/utils'
import { AccidentTrendChart } from '../components/sst/AccidentTrendChart'
import { useSSTDashboard } from '../hooks/useSSTDashboard'
import { SSTDashboardSkeleton } from '../components/sst/SSTDashboardSkeleton'
import PageContainer from '@/shared/components/ui/PageContainer'

export const SSTDashboardPage = () => {

  const { data, isLoading } = useSSTDashboard()

  const filteredTrend = useMemo(() => {
    const trend = data?.trend ?? []

    return trend.map(t => {
      const date = new Date(t.date)

      return {
        ...t,
        date: isNaN(date.getTime())
          ? ''
          : format(date, 'yyyy-MM-dd')
      }
    })
  }, [data])

  if (isLoading) return <SSTDashboardSkeleton />
  if (!data) return

  const monthlyDiff =
    data.coreMetrics.accidentsThisMonth -
    data.coreMetrics.accidentsLastMonth

  const isGrowing = monthlyDiff > 0

  const mainCards = [
    {
      label: 'Total accidentes',
      value: data.summary.totalAccidents,
      icon: <ShieldAlert className="h-5 w-5 text-slate-600" />,
      bg: 'bg-slate-100',
    },
    {
      label: 'Abiertos',
      value: data.summary.openAccidents,
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      bg: 'bg-amber-50',
      valueClass: 'text-amber-600',
    },
    {
      label: 'Con restricciones',
      value: data.summary.withActiveRestrictions,
      icon: <Activity className="h-5 w-5 text-red-600" />,
      bg: 'bg-red-50',
      valueClass: 'text-red-600',
    },
    {
      label: 'Altas pendientes',
      value: data.summary.pendingDischarges,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      valueClass: 'text-emerald-600',
    },
  ]

  const secondaryCards = [
    {
      label: 'Empleados con restricciones',
      value: data.coreMetrics.employeesWithRestrictions,
      icon: <Users className="h-5 w-5 text-red-600" />,
      bg: 'bg-red-50',
      valueClass: 'text-red-600',
    },
    {
      label: 'Casos prolongados',
      value: data.coreMetrics.casesOverThresholdDays,
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      bg: 'bg-orange-50',
      valueClass: 'text-orange-600',
    },
    {
      label: 'Follow-ups vencidos',
      value: data.coreMetrics.overdueFollowUps,
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      bg: 'bg-red-50',
      valueClass: 'text-red-600',
    },
    {
      label: 'Variación mensual',
      value: `${monthlyDiff}`,
      icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
      valueClass: isGrowing ? 'text-red-600' : 'text-emerald-600',
    },
  ]

  const monthlyTrend = data?.executiveMetrics.monthlyTrendPercentage ?? 0

  const isGood = monthlyTrend < 0

  const percentage = Math.abs(monthlyTrend).toFixed(1)

  const trendLabel =
    monthlyTrend === 0
      ? 'Sin variación'
      : isGood
        ? `↓ ${percentage}% menos accidentes`
        : `↑ ${percentage}% más accidentes`

  return (
    <PageContainer
      title="Dashboard SST"
      description="Indicadores de seguridad y salud ocupacional"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {mainCards.map((c, i) => (
            <DashboardCard
              key={i}
              label={c.label}
              value={c.value}
              valueClassName={c.valueClass}
              icon={
                <div className={cn('rounded-2xl p-3', c.bg)}>
                  {c.icon}
                </div>
              }
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {secondaryCards.map((c, i) => (
            <DashboardCard
              key={i}
              label={c.label}
              value={c.value}
              valueClassName={c.valueClass}
              icon={
                <div className={cn('rounded-2xl p-3', c.bg)}>
                  {c.icon}
                </div>
              }
            />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Tendencia de accidentes
            </h2>

            <span
              className={cn(
                'text-xs font-medium',
                isGrowing ? 'text-red-600' : 'text-emerald-600'
              )}
            >
              {isGrowing ? '↑ incremento' : '↓ descenso'}
            </span>
          </div>

          <AccidentTrendChart data={filteredTrend} />

          <div className="flex gap-6 mt-4 text-sm">
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

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Métricas avanzadas
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">
                Áreas con mayor incidencia
              </h3>

              <div className="space-y-3">
                {data.interestingMetrics.topAreas.map((area, i) => {
                  const max = data.interestingMetrics.topAreas[0]?.count ?? 1
                  const percentage = (area.count / max) * 100

                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">
                          {area.area}
                        </span>

                        <span className="text-sm font-semibold text-slate-900">
                          {area.count}
                        </span>
                      </div>

                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MetricBox
                label="Empleados externos"
                value={data.interestingMetrics.externalEmployeesInvolved}
              />

              <MetricBox
                label="Reincidencia (%)"
                value={`${data.interestingMetrics.recurrenceRate}%`}
              />

              <MetricBox
                label="Accidentes por 100"
                value={data.executiveMetrics.accidentRatePer100Employees}
              />

              <MetricBox
                label="Tendencia mensual"
                value={trendLabel}
                valueClassName={
                  isGood ? 'text-emerald-600' : 'text-red-600'
                }
              />

              <MetricBox
                label="Días recuperación"
                value={data.executiveMetrics.averageRecoveryDays}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Últimos accidentes
            </h2>
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
                <tr key={item.id} className="border-t border-slate-100">
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