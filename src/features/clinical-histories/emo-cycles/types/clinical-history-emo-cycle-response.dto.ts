import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { ClinicalHistoryConformityResponseDto } from './clinical-history-conformity-response.dto'
import type { ClinicalHistoryExamResponseDto } from './clinical-history-exam-response.dto'

export type ClinicalHistoryEmoCycleStatus =
  | 'IN_PROGRESS'
  | 'PENDING_DOCTOR_CONCLUSION'
  | 'PENDING_EMPLOYEE_CONFORMITY'
  | 'COMPLETED'
  | 'NOT_APT'
  | 'EXPIRED'

export type ClinicalHistoryConclusion =
  | 'APTO'
  | 'APTO_CON_RESTRICCIONES'
  | 'NO_APTO'

export type ClinicalHistoryEmoCycleResponseDto = AuditResponseDto & {
  id: number
  clinicalHistoryId: number
  status: ClinicalHistoryEmoCycleStatus
  conclusion: ClinicalHistoryConclusion | null
  restrictions: string | null
  startedAt: Date
  completedAt: Date | null
  isActive: boolean
  exams: ClinicalHistoryExamResponseDto[]
  conformities: ClinicalHistoryConformityResponseDto[]
}

export const EMO_ATTENTION_BLOCK_RULES: Record<
  ClinicalHistoryEmoCycleStatus,
  { message: string; tone: 'warning' | 'danger' } | null
> = {
  IN_PROGRESS: {
    message: 'Debe completarse el ciclo EMO antes de registrar atenciones clínicas.',
    tone: 'warning',
  },
  PENDING_DOCTOR_CONCLUSION: {
    message: 'Falta la conclusión médica del ciclo EMO actual.',
    tone: 'warning',
  },
  PENDING_EMPLOYEE_CONFORMITY: {
    message: 'Falta la conformidad del trabajador para habilitar la historia clínica.',
    tone: 'warning',
  },
  COMPLETED: null,
  NOT_APT: {
    message: 'Trabajador no apto. No se permiten atenciones clínicas operativas.',
    tone: 'danger',
  },
  EXPIRED: {
    message: 'El EMO del trabajador está vencido. Debe iniciarse un nuevo ciclo antes de registrar atenciones.',
    tone: 'warning',
  },
}

export const EMO_ALERT_STYLES = {
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger: 'border-red-200 bg-red-50 text-red-700',
}

export const EMO_STATUS_LABEL: Record<ClinicalHistoryEmoCycleStatus, string> = {
  'IN_PROGRESS': 'En progreso',
  'PENDING_DOCTOR_CONCLUSION': 'Pendiente de conclusión',
  'PENDING_EMPLOYEE_CONFORMITY': 'Pendiente de conformidad',
  'COMPLETED': 'Completado',
  'NOT_APT': 'No apto',
  'EXPIRED': 'Vencido'
}

export const EMO_STATUS_CLASSNAME: Record<ClinicalHistoryEmoCycleStatus, string> = {
  'IN_PROGRESS': 'bg-blue-100 text-blue-700',
  'PENDING_DOCTOR_CONCLUSION': 'bg-amber-100 text-amber-700',
  'PENDING_EMPLOYEE_CONFORMITY': 'bg-violet-100 text-violet-700',
  'COMPLETED': 'bg-emerald-100 text-emerald-700',
  'NOT_APT': 'bg-red-100 text-red-700',
  'EXPIRED': 'bg-slate-200 text-slate-600'
}

export const EMO_CONCLUSION_LABEL: Record<ClinicalHistoryConclusion, string> = {
  'APTO': 'Apto',
  'NO_APTO': 'No apto',
  'APTO_CON_RESTRICCIONES': 'Apto con restricciones'
}

export const EMO_CONCLUSION_CLASSNAME: Record<ClinicalHistoryConclusion, string> = {
  'APTO': 'bg-emerald-100 text-emerald-700',
  'APTO_CON_RESTRICCIONES': 'bg-amber-100 text-amber-700',
  'NO_APTO': 'bg-red-100 text-red-700'
}

export const EMO_CYCLE_SHOW_CONFORMITY_SECTION: Record<ClinicalHistoryEmoCycleStatus, boolean> = {
  IN_PROGRESS: false,
  PENDING_DOCTOR_CONCLUSION: false,
  PENDING_EMPLOYEE_CONFORMITY: true,
  COMPLETED: true,
  NOT_APT: true,
  EXPIRED: false,
}

export const EMO_CYCLE_ALLOW_DOCTOR_CONCLUSION: Record<ClinicalHistoryEmoCycleStatus, boolean> = {
  IN_PROGRESS: true,
  PENDING_DOCTOR_CONCLUSION: true,
  PENDING_EMPLOYEE_CONFORMITY: false,
  COMPLETED: false,
  NOT_APT: false,
  EXPIRED: false,
}