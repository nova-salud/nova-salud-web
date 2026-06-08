import { useState } from 'react'
import { Activity, AlertTriangle, CheckCircle2, ClipboardList, Package, Users } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import { cn } from '@/shared/utils'
import PageContainer from '@/shared/components/ui/PageContainer'
import { MetricCard } from '@/shared/components/dashboard/MetricCard'
import { DateRangeFilter, toISODate } from '@/shared/components/dashboard/DateRangeFilter'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { useMedicalDashboard } from '../hooks/useMedicalDashboard'
import { ConsultationsTrendChart } from '../components/medical/ConsultationsTrendChart'
import { MedicalDashboardSkeleton } from '../components/medical/MedicalDashboardSkeleton'

const TRIAGE_LABEL: Record<string, string> = {
  LOW: 'Bajo',
  MEDIUM: 'Medio',
  HIGH: 'Alto',
}

const TRIAGE_CLASS: Record<string, string> = {
  LOW: 'bg-emerald-100 text-emerald-700',
  MEDIUM: 'bg-amber-100 text-amber-700',
  HIGH: 'bg-red-100 text-red-700',
}

export const MedicalDashboardPage = () => {
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

  const { data, isLoading, error } = useMedicalDashboard(dateRange)

  if (isLoading) {
    return (
      <PageContainer title="Dashboard Médico" description="Resumen clínico y operativo">
        <MedicalDashboardSkeleton />
      </PageContainer>
    )
  }

  if (error || !data) {
    return (
      <PageContainer title="Dashboard Médico" description="Resumen clínico y operativo">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error ?? 'No se pudo cargar el dashboard.'}
        </div>
      </PageContainer>
    )
  }

  const mainCards = [
    {
      label: 'Atenciones en rango',
      value: data.summary.consultationsInRange,
      icon: <Users className="h-5 w-5 text-slate-600" />,
      bg: 'bg-slate-100',
      onClick: () => navigate('/clinical-attention'),
    },
    {
      label: 'Ciclos EMO activos',
      value: data.summary.activeCycles,
      icon: <Activity className="h-5 w-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
      valueClassName: 'text-indigo-600',
      onClick: () => navigate('/clinical-histories?emoCycleStatus=IN_PROGRESS'),
    },
    {
      label: 'Pendientes de conclusión',
      value: data.summary.pendingConclusion,
      icon: <ClipboardList className="h-5 w-5 text-amber-600" />,
      bg: 'bg-amber-50',
      valueClassName: data.summary.pendingConclusion > 0 ? 'text-amber-600' : undefined,
      onClick: () => navigate('/clinical-histories?emoCycleStatus=PENDING_DOCTOR_CONCLUSION'),
    },
    {
      label: 'Follow-ups vencidos',
      value: data.summary.overdueFollowUps,
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      bg: 'bg-red-50',
      valueClassName: data.summary.overdueFollowUps > 0 ? 'text-red-600' : undefined,
      onClick: () => navigate('/clinical-attention'),
    },
  ]

  const alertCards = [
    {
      label: 'Con restricciones',
      value: data.alerts.patientsWithRestrictions,
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      bg: 'bg-amber-50',
      valueClassName: data.alerts.patientsWithRestrictions > 0 ? 'text-amber-600' : undefined,
      onClick: () => navigate('/clinical-histories?conclusion=APTO_CON_RESTRICCIONES'),
    },
    {
      label: 'EMO completados este mes',
      value: data.alerts.cyclesCompletedThisMonth,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      valueClassName: 'text-emerald-600',
      onClick: () => navigate('/clinical-histories?emoCycleStatus=COMPLETED'),
    },
    {
      label: 'Medicamentos por acabarse',
      value: data.alerts.lowStockCount,
      icon: <Package className="h-5 w-5 text-red-500" />,
      bg: 'bg-red-50',
      valueClassName: data.alerts.lowStockCount > 0 ? 'text-red-600' : undefined,
      onClick: () => navigate('/medications?lowStock=true'),
    },
  ]

  return (
    <PageContainer
      title="Dashboard Médico"
      description="Resumen clínico y operativo"
    >
      <div className="space-y-6">
        <DateRangeFilter value={dateRange} onChange={handleDateChange} />

        {/* Métricas principales */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mainCards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
        </div>

        {/* Alertas secundarias */}
        <div className="grid gap-4 sm:grid-cols-3">
          {alertCards.map((a, i) => (
            <MetricCard
              key={i}
              label={a.label}
              value={a.value}
              valueClassName={a.valueClassName}
              icon={a.icon ?? <AlertTriangle className="h-5 w-5 text-slate-500" />}
              bg={a.bg ?? 'bg-slate-100'}
              onClick={a.onClick}
            />
          ))}
        </div>

        {/* Gráfico de tendencia */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Atenciones — últimos 7 días
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Volumen diario de atenciones clínicas registradas
              </p>
            </div>

            <button
              onClick={() => navigate('/clinical-attention')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver atenciones
            </button>
          </div>

          {data.consultationsTrend.length > 0 ? (
            <ConsultationsTrendChart data={data.consultationsTrend} />
          ) : (
            <div className="flex items-center justify-center py-12 text-sm text-slate-400">
              Sin atenciones en los últimos 7 días
            </div>
          )}
        </div>

        {/* Medicamentos por acabarse */}
        {data.lowStockMedications.length > 0 && (
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">
                  Medicamentos por acabarse
                </h2>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                  {data.lowStockMedications.length}
                </span>
              </div>

              <button
                onClick={() => navigate('/medications?lowStock=true')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver inventario
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {data.lowStockMedications.map((med) => {
                const pct = med.minimumStock > 0
                  ? Math.min((med.currentStock / med.minimumStock) * 100, 100)
                  : 0
                const isEmpty = med.currentStock === 0

                return (
                  <div
                    key={med.medicationId}
                    onClick={() => navigate(`/medications/${med.medicationId}`)}
                    className="flex cursor-pointer items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
                  >
                    <div className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                      isEmpty ? 'bg-red-100' : 'bg-amber-100',
                    )}>
                      <Package className={cn(
                        'h-4 w-4',
                        isEmpty ? 'text-red-600' : 'text-amber-600',
                      )} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {med.name}
                        </p>
                        <span className={cn(
                          'shrink-0 text-xs font-semibold',
                          isEmpty ? 'text-red-600' : 'text-amber-600',
                        )}>
                          {med.currentStock} / {med.minimumStock}
                        </span>
                      </div>

                      {med.categoryName && (
                        <p className="mt-0.5 text-xs text-slate-400">{med.categoryName}</p>
                      )}

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            isEmpty ? 'bg-red-500' : pct < 50 ? 'bg-amber-500' : 'bg-yellow-400',
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {isEmpty && (
                      <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                        Agotado
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Últimas atenciones */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Últimas atenciones
            </h2>

            <button
              onClick={() => navigate('/clinical-attention')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver atención clínica
            </button>
          </div>

          {data.recentConsultations.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-sm text-slate-400">
              No hay atenciones registradas
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-400">
                    <th className="px-6 py-3">Paciente</th>
                    <th className="px-6 py-3">Fecha</th>
                    <th className="px-6 py-3">Triage</th>
                    <th className="px-6 py-3">Diagnóstico</th>
                    <th className="px-6 py-3">Seguimiento</th>
                  </tr>
                </thead>

                <tbody>
                  {data.recentConsultations.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() =>
                        navigate(`/clinical-histories/${item.employeeId}/attentions/${item.id}`)
                      }
                      className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {item.employeeName}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {new Date(item.attendedAt).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="px-6 py-4">
                        <span className={cn(
                          'rounded-xl px-2 py-1 text-xs font-medium',
                          TRIAGE_CLASS[item.triageLevel] ?? 'bg-slate-100 text-slate-600',
                        )}>
                          {TRIAGE_LABEL[item.triageLevel] ?? item.triageLevel}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.diagnosisCode ?? '—'}
                      </td>

                      <td className="px-6 py-4">
                        <span className={cn(
                          'rounded-xl px-2 py-1 text-xs font-medium',
                          item.followUpCount > 0
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-500',
                        )}>
                          {item.followUpCount > 0
                            ? `${item.followUpCount} seguimiento(s)`
                            : 'Sin seguimiento'}
                        </span>
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
