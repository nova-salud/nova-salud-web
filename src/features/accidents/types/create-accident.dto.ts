import type { AccidentTypeEnum } from './accident-type.enum'

export interface CreateAccidentDto {
  employeeId: number
  type: AccidentTypeEnum
  description: string
  occurredAt: string
  requiresExternalReferral: boolean
  healthcareCenterId?: number
}