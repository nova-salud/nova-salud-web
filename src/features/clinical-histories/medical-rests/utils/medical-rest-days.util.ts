import { differenceInDays } from 'date-fns'

export const getMedicalRestDays = (startDate: string | Date, endDate: string | Date): number => {
  return differenceInDays(new Date(endDate), new Date(startDate)) + 1
}

export const getDmDays = (
  startDate: string | Date,
  endDate: string | Date,
  subsidizedDays?: number | null,
): number => {
  return getMedicalRestDays(startDate, endDate) - (subsidizedDays ?? 0)
}
