export type MedicalDashboardResponse = {
  summary: {
    consultationsInRange: number
    activeCycles: number
    pendingConclusion: number
    overdueFollowUps: number
  }

  alerts: {
    patientsWithRestrictions: number
    cyclesCompletedThisMonth: number
    lowStockCount: number
  }

  consultationsTrend: {
    date: string
    count: number
  }[]

  lowStockMedications: {
    medicationId: number
    name: string
    categoryName: string | null
    currentStock: number
    minimumStock: number
  }[]

  recentConsultations: {
    id: number
    employeeId: number
    employeeName: string
    attendedAt: string
    triageLevel: string
    diagnosisCode: string | null
    diseaseName: string | null
    followUpCount: number
  }[]

  // Grupo A — range-dependent
  dispensationsInRange: number
  medicalRestsInRange: number
  triageDistribution: { level: string; count: number }[]
  topDiagnoses: { code: string; name: string | null; count: number }[]
  dispensationsByType: { type: string; count: number }[]

  // Grupo B — estáticos
  emosExpiringSoon: number
  pendingEmployeeConformity: number
  employeesOnMedicalRest: number
  averageMedicalRestDays: number
  followUpCompletionRate: number
  averageDaysToFulfillFollowUp: number
  workersWithOver21DmDays: number
  dmDaysExpiringSoon: number
  lotsExpiringSoon: number
}
