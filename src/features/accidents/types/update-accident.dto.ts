import type { AccidentStatusEnum } from './accident-status.enum'
import type { CreateAccidentDto } from './create-accident.dto'

export interface UpdateAccidentDto extends Partial<CreateAccidentDto> {
  status?: AccidentStatusEnum
}