import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type EmployeePositionResponseDto = AuditResponseDto & {
  id: number
  externalId: number | null
  name: string
  isActive: boolean
  isConfidence: boolean
  category: 'EJECUTIVO' | 'EMPLEADO' | 'OBRERO' | null
  functions: string | null
}

export const CATEGORY_CLASS: Record<NonNullable<EmployeePositionResponseDto['category']>, string> = {
  EJECUTIVO: 'border-violet-100 bg-violet-50 text-violet-700',
  EMPLEADO: 'border-sky-100 bg-sky-50 text-sky-700',
  OBRERO: 'border-amber-100 bg-amber-50 text-amber-700',
}

export const CATEGORY_LABEL: Record<NonNullable<EmployeePositionResponseDto['category']>, string> = {
  EJECUTIVO: 'Ejecutivo',
  EMPLEADO: 'Empleado',
  OBRERO: 'Obrero',
}
