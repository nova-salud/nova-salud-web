import type { CreateClinicalHistoryDto } from './create-clinical-history.dto'

export type UpdateClinicalHistoryDto = Partial<CreateClinicalHistoryDto> & {
  isActive?: boolean
}