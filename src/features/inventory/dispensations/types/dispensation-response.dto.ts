import type { DispenseTypeEnum } from './dispense-type.enum'
import type { DispensationLotItemResponseDto } from './dispensation-lot-item-response.dto'
import type { AuditResponseDto } from '@/core/types/audit-response.dto'

export type DispensationResponseDto = AuditResponseDto & {
  id: number
  dispenseType: DispenseTypeEnum
  collaboratorDni: string | null
  thirdPartyDni: string | null
  attentionId: number | null
  diagnosisCode: string | null
  reason: string
  dispensedByUserId: number
  dispensedByUserName: string | null
  dispensedAt: string
  notes: string | null
  items: DispensationLotItemResponseDto[]
}

export const DISPENSE_TYPE_LABEL_MAP: Record<DispensationResponseDto['dispenseType'], string> = {
  ATTENTION: 'Atención médica',
  OTC: 'OTC (Libre)',
  EMERGENCY: 'Emergencia',
  THIRD_PARTY: 'Tercero',
}

export const DISPENSE_TYPE_CLASS_MAP: Record<DispensationResponseDto['dispenseType'], string> = {
  ATTENTION: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  OTC: 'border-sky-100 bg-sky-50 text-sky-700',
  EMERGENCY: 'border-red-100 bg-red-50 text-red-600',
  THIRD_PARTY: 'border-amber-100 bg-amber-50 text-amber-700',
}