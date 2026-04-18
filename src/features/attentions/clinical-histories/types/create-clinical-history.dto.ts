export type CreateClinicalHistoryDto = {
  employeeId: number
  bloodType?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  knownConditions?: string
  surgicalHistory?: string
  familyHistory?: string
  observations?: string
}