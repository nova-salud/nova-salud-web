import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  Package,
  Users,
  BedDouble,
  Pill,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import { cn } from '@/shared/utils'
import { PageContainer } from '@/shared/components'
import { DateRangeFilter, toISODate } from '@/shared/components/dashboard/DateRangeFilter'
import type { DateRange } from '@/shared/components/dashboard/DateRangeFilter'
import { MetricPanel } from '@/shared/components/dashboard/MetricPanel'
import { useMedicalDashboard } from '../hooks/useMedicalDashboard'
import { ConsultationsTrendChart } from '../components/medical/ConsultationsTrendChart'
import { MedicalDashboardSkeleton } from '../components/medical/MedicalDashboardSkeleton'

const TRIAGE_LABEL: Record<string, string> = {
  LOW: 'Bajo',
  MEDIUM: 'Medio',
  HIGH: 'Alto',
}

const TRIAGE_ROW_CLASS: Record<string, string> = {
  LOW: 'bg-emerald-100 text-emerald-700',
  MEDIUM: 'bg-amber-100 text-amber-700',
  HIGH: 'bg-red-100 text-red-700',
}

const TRIAGE_VALUE_CLASS: Record<string, string> = {
  LOW: 'text-emerald-600',
  MEDIUM: 'text-amber-600',
  HIGH: 'text-red-600',
}

const DISPENSE_TYPE_LABEL: Record<string, string> = {
  ATTENTION: 'Atención',
  OTC: 'Venta libre',
  EMERGENCY: 'Emergencia',
  THIRD_PARTY: 'Terceros',
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
          {error?.message ?? 'No se pudo cargar el dashboard.'}
        </div>
      </PageContainer>
    )
  }

  const maxDiagnosis = Math.max(...(data.topDiagnoses?.map(d => d.count) ?? []), 1)
  const maxDispType = Math.max(...(data.dispensationsByType?.map(d => d.count) ?? []), 1)

  const emoRows = [
    {
      label: 'Ciclos activos',
      value: data.summary.activeCycles,
      icon: <Activity className="h-4 w-4 text-indigo-500" />,
      valueClassName: 'text-indigo-600' as const,
      path: '/emo-cycles',
    },
    {
      label: 'Pendientes de conclusión',
      value: data.summary.pendingConclusion,
      icon: <ClipboardList className="h-4 w-4 text-amber-500" />,
      valueClassName: data.summary.pendingConclusion > 0 ? 'text-amber-600' : undefined,
      path: '/emo-cycles',
    },
    {
      label: 'Completados este mes',
      value: data.alerts.cyclesCompletedThisMonth,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
      valueClassName: 'text-emerald-600' as const,
      path: '/emo-cycles',
    },
    {
      label: 'Por vencer (30 días)',
      value: data.emosExpiringSoon,
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      valueClassName: data.emosExpiringSoon > 0 ? 'text-amber-600' : undefined,
      path: '/emo-cycles',
    },
    {
      label: 'Conformidad pendiente',
      value: data.pendingEmployeeConformity,
      icon: <ClipboardList className="h-4 w-4 text-amber-500" />,
      valueClassName: data.pendingEmployeeConformity > 0 ? 'text-amber-600' : undefined,
      path: '/emo-cycles',
    },
  ]

  const seguimientosRows = [
    {
      label: 'Follow-ups vencidos',
      value: data.summary.overdueFollowUps,
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      valueClassName: data.summary.overdueFollowUps > 0 ? 'text-red-600' : undefined,
      path: '/attentions',
    },
    {
      label: 'Con restricciones',
      value: data.alerts.patientsWithRestrictions,
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      valueClassName: data.alerts.patientsWithRestrictions > 0 ? 'text-amber-600' : undefined,
      path: '/employees',
    },
    {
      label: 'Tasa de cumplimiento',
      value: `${data.followUpCompletionRate.toFixed(1)}%`,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
      valueClassName: 'text-emerald-600' as const,
    },
    {
      label: 'Días prom. cumplimiento',
      value: data.averageDaysToFulfillFollowUp.toFixed(1),
      icon: <Clock className="h-4 w-4 text-slate-400" />,
    },
  ]

  const atencionRows = [
    {
      label: 'En descanso médico',
      value: data.employeesOnMedicalRest,
      icon: <BedDouble className="h-4 w-4 text-indigo-500" />,
      valueClassName: data.employeesOnMedicalRest > 0 ? 'text-indigo-600' : undefined,
    },
    {
      label: 'Días prom. descanso',
      value: data.averageMedicalRestDays.toFixed(1),
      icon: <Clock className="h-4 w-4 text-slate-400" />,
    },
    {
      label: 'Medicamentos bajo stock',
      value: data.alerts.lowStockCount,
      icon: <Package className="h-4 w-4 text-red-500" />,
      valueClassName: data.alerts.lowStockCount > 0 ? 'text-red-600' : undefined,
      path: '/medications',
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
      label: 'Lotes por vencer (30d)',
      value: data.lotsExpiringSoon,
      icon: <CalendarDays className="h-4 w-4 text-orange-500" />,
      valueClassName: data.lotsExpiringSoon > 0 ? 'text-orange-600' : undefined,
      path: '/medications',
    },
  ]

  return (
    <PageContainer
      title="Dashboard Médico"
      description="Resumen clínico y operativo"
    >
      <div className="space-y-6">
        <DateRangeFilter value={dateRange} onChange={handleDateChange} />

        {/* Cards del período + Gráfico */}
        <div className="grid gap-6 xl:grid-cols-4">
          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Atenciones en rango',
                value: data.summary.consultationsInRange,
                icon: <Users className="h-5 w-5 text-slate-600" />,
                bg: 'bg-slate-100',
                onClick: () => navigate('/attentions'),
              },
              {
                label: 'Dispensaciones',
                value: data.dispensationsInRange,
                icon: <Pill className="h-5 w-5 text-indigo-600" />,
                bg: 'bg-indigo-50',
                valueClass: 'text-indigo-600',
                onClick: () => navigate('/medications'),
              },
              {
                label: 'Descansos emitidos',
                value: data.medicalRestsInRange,
                icon: <BedDouble className="h-5 w-5 text-amber-600" />,
                bg: 'bg-amber-50',
                valueClass: 'text-amber-600',
                onClick: () => navigate('/clinical-attention'),
              },
            ].map((c) => (
              <div
                key={c.label}
                onClick={c.onClick}
                className={cn(
                  'flex flex-1 items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm',
                  c.onClick && 'cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md'
                )}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{c.label}</p>
                  <p className={cn('mt-1 text-lg font-semibold', (c as { valueClass?: string }).valueClass ?? 'text-slate-900')}>
                    {c.value}
                  </p>
                </div>
                <div className={cn('rounded-2xl p-3', c.bg)}>{c.icon}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Tendencia de atenciones</h2>
              <button
                onClick={() => navigate('/attentions')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Ver atenciones
              </button>
            </div>

            {data.consultationsTrend.length > 0 ? (
              <ConsultationsTrendChart data={data.consultationsTrend} />
            ) : (
              <div className="flex items-center justify-center py-12 text-sm text-slate-400">
                Sin atenciones en el rango seleccionado
              </div>
            )}
          </div>
        </div>

        {/* Distribución de triage */}
        <div className="grid gap-4 sm:grid-cols-3">
          {(['HIGH', 'MEDIUM', 'LOW'] as const).map(level => {
            const item = data.triageDistribution?.find(t => t.level === level)
            return (
              <div
                key={level}
                onClick={() => navigate(`/attentions?triageLevel=${level}`)}
                className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                      Triage {TRIAGE_LABEL[level]}
                    </p>
                    <p className={cn('mt-1 text-2xl font-semibold', TRIAGE_VALUE_CLASS[level])}>
                      {item?.count ?? 0}
                    </p>
                  </div>
                  <span className={cn('rounded-xl px-3 py-1.5 text-xs font-medium', TRIAGE_ROW_CLASS[level])}>
                    {TRIAGE_LABEL[level]}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Top diagnósticos + Dispensaciones por tipo */}
        {(data.topDiagnoses?.length > 0 || data.dispensationsByType?.length > 0) && (
          <div className={cn(
            'grid gap-6',
            data.topDiagnoses?.length > 0 && data.dispensationsByType?.length > 0
              ? 'xl:grid-cols-2'
              : ''
          )}>
            {data.topDiagnoses?.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">Diagnósticos frecuentes</h2>
                  <button
                    onClick={() => navigate('/attentions')}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Ver atenciones
                  </button>
                </div>
                <div className="space-y-4">
                  {data.topDiagnoses.map(item => (
                    <div key={item.code} onClick={() => navigate(`/attentions?diagnosisCode=${encodeURIComponent(item.code)}`)} className="cursor-pointer">
                      <div className="flex justify-between text-sm font-medium text-slate-700">
                        <span className="truncate pr-2">
                          {item.name ?? item.code}
                          {item.name && (
                            <span className="ml-1 text-xs text-slate-400">({item.code})</span>
                          )}
                        </span>
                        <span className="shrink-0 text-slate-500">{item.count}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all"
                          style={{ width: `${(item.count / maxDiagnosis) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.dispensationsByType?.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">Dispensaciones por tipo</h2>
                  <button
                    onClick={() => navigate('/medications')}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Ver farmacia
                  </button>
                </div>
                <div className="space-y-4">
                  {data.dispensationsByType.map(item => (
                    <div key={item.type} onClick={() => navigate(`/dispensations?dispenseType=${encodeURIComponent(item.type)}`)} className="cursor-pointer">
                      <div className="flex justify-between text-sm font-medium text-slate-700">
                        <span className="truncate pr-2">{DISPENSE_TYPE_LABEL[item.type] ?? item.type}</span>
                        <span className="shrink-0 text-slate-500">{item.count}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${(item.count / maxDispType) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estado actual — MetricPanels */}
        <div className="grid gap-6 xl:grid-cols-3">
          <MetricPanel
            title="EMO"
            actionLabel="Ver ciclos EMO"
            onAction={() => navigate('/emo-cycles')}
            rows={emoRows}
          />
          <MetricPanel
            title="Seguimientos"
            actionLabel="Ver atenciones"
            onAction={() => navigate('/attentions')}
            rows={seguimientosRows}
          />
          <MetricPanel
            title="Atención médica"
            actionLabel="Ver inventario"
            onAction={() => navigate('/medications?lowStock=true')}
            rows={atencionRows}
          />
        </div>

        {/* Medicamentos por acabarse */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900">
                Medicamentos por acabarse
              </h2>
              {data.lowStockMedications.length > 0 && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                  {data.lowStockMedications.length}
                </span>
              )}
            </div>

            <button
              onClick={() => navigate('/medications?lowStock=true')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver inventario
            </button>
          </div>

          {data.lowStockMedications.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-sm text-slate-400">
              Sin medicamentos bajo stock mínimo
            </div>
          ) : (
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
          )}
        </div>

        {/* Últimas atenciones */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Últimas atenciones
            </h2>
            <button
              onClick={() => navigate('/attentions')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver atenciones
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
                          TRIAGE_ROW_CLASS[item.triageLevel] ?? 'bg-slate-100 text-slate-600',
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
