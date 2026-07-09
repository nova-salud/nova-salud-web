import { differenceInDays } from 'date-fns'

export const getMedicalRestDays = (startDate: string | Date, endDate: string | Date): number => {
  return differenceInDays(new Date(endDate), new Date(startDate)) + 1
}
