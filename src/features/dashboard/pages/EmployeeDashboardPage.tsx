import { format, differenceInDays } from 'date-fns'
import { AlertTriangle, BedDouble, CalendarClock, Stethoscope, User } from 'lucide-react'
import { useNavigate } from 'react-router'
import { cn } from '@/shared/utils'
import { useEmployeeDashboard } from '../hooks/useEmployeeDashboard'
import {
  FOLLOW_UP_STATUS_CLASSNAME,
  FOLLOW_UP_STATUS_LABEL,
  type FollowUpStatusEnum,
} from '@/features/follow-ups/types/follow-up-status.enum'
import {
  FOLLOW_UP_ORIGIN_TYPE_LABEL,
  type FollowUpOriginTypeEnum,
} from '@/features/follow-ups/types/follow-up-origin-type.enum'

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

const EMO_STATUS_LABEL: Record<string, string> = {
  IN_PROGRESS: 'En progreso',
  PENDING_EXAM_REVIEW: 'Revisión de exámenes',
  PENDING_DOCTOR_CONCLUSION: 'Pendiente conclusión',
  PENDING_EMPLOYEE_CONFORMITY: 'Pendiente conformidad',
  COMPLETED: 'Completado',
  NOT_APT: 'No apto',
  EXPIRED: 'Vencido',
  CANCELLED: 'Cancelado',
}

export const EmployeeDashboardPage = () => {
  const { data, isLoading, error } = useEmployeeDashboard()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-3xl bg-slate-100" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 rounded-3xl bg-slate-100" />
          <div className="h-20 rounded-3xl bg-slate-100" />
          <div className="h-20 rounded-3xl bg-slate-100" />
        </div>
        <div className="h-48 rounded-3xl bg-slate-100" />
        <div className="h-48 rounded-3xl bg-slate-100" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
        {(error as Error)?.message ?? 'No se pudo cargar la información.'}
      </div>
    )
  }

  const { employee, clinicalHistoryId, recentAttentions, pendingFollowUps, activeMedicalRests, activeEmoCycle } = data

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold text-slate-900">{employee.fullName}</h2>
            <p className="text-sm text-slate-500">
              {[employee.position, employee.area].filter(Boolean).join(' · ')}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
              <span>DNI: <span className="font-medium text-slate-700">{employee.dni}</span></span>
              {employee.bloodGroup && (
                <span>Grupo sanguíneo: <span className="font-medium text-slate-700">{employee.bloodGroup}</span></span>
              )}
              {employee.medicalInsurance && (
                <span>Seguro: <span className="font-medium text-slate-700">{employee.medicalInsurance}</span></span>
              )}
              {employee.eps && (
                <span>EPS: <span className="font-medium text-slate-700">{employee.eps}</span></span>
              )}
            </div>
            {clinicalHistoryId && (
              <button
                onClick={() => navigate('/my-clinical-history')}
                className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
              >
                Ver mi historia clínica
              </button>
            )}
          </div>
        </div>
      </div>

      {!clinicalHistoryId && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
          Aún no tienes historia clínica registrada. Contacta con el área médica.
        </div>
      )}

      {clinicalHistoryId && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: 'Atenciones recientes',
                value: recentAttentions.length,
                icon: <Stethoscope className="h-5 w-5 text-indigo-600" />,
                bg: 'bg-indigo-50',
              },
              {
                label: 'Seguimientos pendientes',
                value: pendingFollowUps.length,
                icon: <CalendarClock className="h-5 w-5 text-amber-600" />,
                bg: 'bg-amber-50',
                alert: pendingFollowUps.length > 0,
              },
              {
                label: 'Descansos médicos activos',
                value: activeMedicalRests.length,
                icon: <BedDouble className="h-5 w-5 text-emerald-600" />,
                bg: 'bg-emerald-50',
              },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{c.label}</p>
                  <p className={cn('mt-1 text-2xl font-semibold', c.alert ? 'text-amber-600' : 'text-slate-900')}>
                    {c.value}
                  </p>
                </div>
                <div className={cn('rounded-2xl p-3', c.bg)}>{c.icon}</div>
              </div>
            ))}
          </div>

          {activeEmoCycle && (
            <div className="flex items-center justify-between rounded-3xl border border-indigo-200 bg-indigo-50 px-6 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-indigo-400">Ciclo EMO activo</p>
                <p className="mt-0.5 text-sm font-semibold text-indigo-900">
                  {activeEmoCycle.emoProtocolName ?? activeEmoCycle.emoType ?? 'Ciclo en curso'}
                </p>
                <p className="text-xs text-indigo-600">{EMO_STATUS_LABEL[activeEmoCycle.status] ?? activeEmoCycle.status}</p>
              </div>
              {activeEmoCycle.expirationDate && (
                <div className="text-right">
                  <p className="text-xs text-indigo-400">Vence</p>
                  <p className="text-sm font-semibold text-indigo-900">
                    {format(new Date(activeEmoCycle.expirationDate), 'dd/MM/yyyy')}
                  </p>
                </div>
              )}
            </div>
          )}

          {pendingFollowUps.length > 0 && (
            <div className="overflow-hidden rounded-3xl border-2 border-slate-300 bg-white shadow-lg">
              <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h2 className="text-base font-semibold text-slate-900">Seguimientos pendientes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-400">
                      <th className="px-6 py-3">Fecha programada</th>
                      <th className="px-6 py-3">Razón</th>
                      <th className="px-6 py-3">Origen</th>
                      <th className="px-6 py-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingFollowUps.map((fu) => (
                      <tr key={fu.id} className="border-t border-slate-100">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {format(new Date(fu.scheduledAt), 'dd/MM/yyyy HH:mm')}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{fu.reason ?? '—'}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'inline-flex rounded-xl px-2.5 py-0.5 text-xs font-medium',
                            'bg-slate-100 text-slate-600',
                          )}>
                            {FOLLOW_UP_ORIGIN_TYPE_LABEL[fu.originType as FollowUpOriginTypeEnum] ?? fu.originType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'inline-flex rounded-xl px-2.5 py-0.5 text-xs font-medium',
                            FOLLOW_UP_STATUS_CLASSNAME[fu.status as FollowUpStatusEnum] ?? 'bg-slate-100 text-slate-600',
                          )}>
                            {FOLLOW_UP_STATUS_LABEL[fu.status as FollowUpStatusEnum] ?? fu.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMedicalRests.length > 0 && (
            <div className="overflow-hidden rounded-3xl border-2 border-slate-300 bg-white shadow-lg">
              <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-5">
                <BedDouble className="h-4 w-4 text-emerald-500" />
                <h2 className="text-base font-semibold text-slate-900">Descansos médicos vigentes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-400">
                      <th className="px-6 py-3">Desde</th>
                      <th className="px-6 py-3">Hasta</th>
                      <th className="px-6 py-3">Días</th>
                      <th className="px-6 py-3">Notas</th>
                      <th className="px-6 py-3">Documento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeMedicalRests.map((mr) => {
                      const start = new Date(mr.startDate)
                      const end = new Date(mr.endDate)
                      const days = differenceInDays(end, start) + 1
                      return (
                        <tr key={mr.id} className="border-t border-slate-100">
                          <td className="px-6 py-4 font-medium text-slate-900">{format(start, 'dd/MM/yyyy')}</td>
                          <td className="px-6 py-4 text-slate-600">{format(end, 'dd/MM/yyyy')}</td>
                          <td className="px-6 py-4 text-slate-600">{days} día{days !== 1 ? 's' : ''}</td>
                          <td className="px-6 py-4 text-slate-500">
                            {mr.notes
                              ? mr.notes.length > 40
                                ? `${mr.notes.slice(0, 40)}…`
                                : mr.notes
                              : '—'}
                          </td>
                          <td className="px-6 py-4">
                            {mr.fileUrl ? (
                              <a
                                href={mr.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex rounded-xl border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                              >
                                Ver documento
                              </a>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-5">
              <Stethoscope className="h-4 w-4 text-indigo-500" />
              <h2 className="text-base font-semibold text-slate-900">Últimas atenciones</h2>
            </div>
            {recentAttentions.length === 0 ? (
              <div className="flex items-center justify-center py-10 text-sm text-slate-400">
                No hay atenciones registradas
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-400">
                      <th className="px-6 py-3">Fecha</th>
                      <th className="px-6 py-3">Triage</th>
                      <th className="px-6 py-3">Diagnóstico</th>
                      <th className="px-6 py-3">Atendido por</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAttentions.map((a) => (
                      <tr key={a.id} className="border-t border-slate-100">
                        <td className="px-6 py-4 text-slate-600">
                          {format(new Date(a.attendedAt), 'dd/MM/yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'inline-flex rounded-xl px-2.5 py-0.5 text-xs font-medium',
                            TRIAGE_CLASS[a.triageLevel] ?? 'bg-slate-100 text-slate-600',
                          )}>
                            {TRIAGE_LABEL[a.triageLevel] ?? a.triageLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {a.diagnosisCode ? (
                            <div>
                              <p className="font-medium text-slate-700">{a.diseaseName ?? a.diagnosisCode}</p>
                              {a.diseaseName && <p className="text-xs text-slate-400">{a.diagnosisCode}</p>}
                            </div>
                          ) : '—'}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{a.attendedByUserFullName ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
