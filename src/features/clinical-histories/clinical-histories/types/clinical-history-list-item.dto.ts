export type ClinicalHistoryListItemDto = {
  id: number
  employeeId: number
  employeeFullName: string
  employeeDni: string
  employeeCompany: string
  areaName: string | null
  isActive: boolean
}
