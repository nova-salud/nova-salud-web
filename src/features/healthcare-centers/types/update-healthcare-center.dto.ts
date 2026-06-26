import type { HealthcareCenterTypeValue } from './healthcare-center-type.constants'

export type UpdateHealthcareCenterDto = {
  name?: string
  ruc?: string
  address?: string
  phone?: string
  convenio?: string
  type?: HealthcareCenterTypeValue
  contactName?: string
  contactPhone?: string
  contactEmail?: string
  isActive?: boolean
}
