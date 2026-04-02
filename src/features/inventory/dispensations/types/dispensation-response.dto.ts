import type { DispensationItemResponseDto } from './dispensation-item-response.dto'
import type { DispenseTypeEnum } from './dispense-type.enum'

export type DispensationResponseDto = {
  id: number
  dispenseType: DispenseTypeEnum
  collaboratorDni: string | null
  thirdPartyDni: string | null
  attentionId: number | null
  diagnosisCode: string | null
  reason: string
  dispensedByUserId: number
  authorizedByUserId: number | null
  dispensedAt: string
  notes: string | null
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
  items: DispensationItemResponseDto[]
}

export const getTypeLabel = (type: DispensationResponseDto['dispenseType']) => {
  switch (type) {
    case 'ATTENTION':
      return 'Atención médica'
    case 'OTC':
      return 'OTC (Libre)'
    case 'EMERGENCY':
      return 'Emergencia'
    case 'THIRD_PARTY':
      return 'Tercero'
    default:
      return type
  }
}

export const getTypeClassName = (type: DispensationResponseDto['dispenseType']) => {
  switch (type) {
    case 'ATTENTION':
      return 'border-emerald-100 bg-emerald-50 text-emerald-700'
    case 'OTC':
      return 'border-sky-100 bg-sky-50 text-sky-700'
    case 'EMERGENCY':
      return 'border-red-100 bg-red-50 text-red-600'
    case 'THIRD_PARTY':
      return 'border-amber-100 bg-amber-50 text-amber-700'
    default:
      return 'border-slate-200 bg-slate-50 text-slate-500'
  }
}