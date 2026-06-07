import type { AccidentTypeEnum } from './accident-type.enum'
import type { AccidentSeverityEnum } from './accident-severity.enum'
import type { AccidentFormEnum } from './accident-form.enum'
import type { AccidentLaborRelationEnum } from './accident-labor-relation.enum'

export interface CreateAccidentDto {
  employeeId: number
  type: AccidentTypeEnum
  description: string
  occurredAt: string
  requiresExternalReferral: boolean
  healthcareCenterId?: number
  severityClassification?: AccidentSeverityEnum
  formClassification?: AccidentFormEnum
  laborRelationClassification?: AccidentLaborRelationEnum
}
