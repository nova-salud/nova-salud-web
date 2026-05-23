export type MedicalDashboardResponse = {
  summary: {
    consultationsToday: number
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
    followUpCount: number
  }[]
}
