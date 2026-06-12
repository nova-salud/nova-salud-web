import type { QueryParams } from '@/core/types/query-params.type'
import type { ClinicalHistoryEmoCycleStatus } from './clinical-history-emo-cycle-response.dto'

export interface FindEmoCyclesDto extends QueryParams {
  status?: ClinicalHistoryEmoCycleStatus
  emoType?: string
  employeeFullName?: string
  expirationDateFrom?: string
  expirationDateTo?: string
}

export const EMO_STATUS_OPTIONS = [
  { label: 'Revisión de exámenes', value: 'PENDING_EXAM_REVIEW' },
  { label: 'En progreso', value: 'IN_PROGRESS' },
  { label: 'Pend. conclusión médica', value: 'PENDING_DOCTOR_CONCLUSION' },
  { label: 'Pend. conformidad empleado', value: 'PENDING_EMPLOYEE_CONFORMITY' },
  { label: 'Completado', value: 'COMPLETED' },
  { label: 'No apto', value: 'NOT_APT' },
  { label: 'Vencido', value: 'EXPIRED' },
  { label: 'Cancelado', value: 'CANCELLED' },
] as const
