import type { HealthcareCenterTypeValue } from './healthcare-center-type.constants'

export type CreateHealthcareCenterDto = {
  name: string
  ruc?: string
  address: string
  phone?: string
  convenio?: string
  type?: HealthcareCenterTypeValue
  contactName?: string
  contactPhone?: string
  contactEmail?: string
}
