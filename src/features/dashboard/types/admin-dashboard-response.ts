export interface AdminDashboardResponse {
  summary: {
    totalEmployees: number
    activeCases: number
    totalAccidents: number
    consultationsInRange: number
    internalEmployees: number
    externalEmployees: number
    followUpsInRange: number
  }

  alerts: {
    overdueFollowUps: number
    longOpenCases: number
    employeesWithRestrictions: number
    criticalMedications: number
    workersWithOver21DmDays: number
    dmDaysExpiringSoon: number
  }

  accidentsByArea: {
    area: string
    count: number
  }[]

  mostUsedMedications: {
    name: string
    count: number
  }[]

  sst: {
    accidentRatePer100Employees: number
    casesOverThresholdDays: number
  }

  system: {
    activeUsers: number
    blockedUsers: number
    lastSyncAt: string | null
  }

  accidentsByClassification: {
    classification: string
    count: number
  }[]

  // Range-dependent
  accidentsInRange: number
  dispensationsInRange: number
  medicalRestsInRange: number
  activityTrend: { date: string; consultations: number; accidents: number }[]

  // Estáticos
  employeesOnMedicalRest: number
  emosExpiringSoon: number
  pendingEmployeeConformity: number
  unresolvedInventoryAlerts: number
}
