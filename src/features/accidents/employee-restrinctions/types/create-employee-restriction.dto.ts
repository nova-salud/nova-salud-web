export interface CreateEmployeeRestrictionDto {
  accidentCaseId: number
  employeeId: number
  description: string
  endDate?: string
}