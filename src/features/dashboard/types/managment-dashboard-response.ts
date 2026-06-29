export type ManagementDashboardResponse = {
  summary: {
    totalEmployees: number
    activeCycles: number
    totalAccidents: number
    attentionsInRange: number
    internalEmployees: number
    externalEmployees: number
    followUpsInRange: number
  }

  alerts: {
    employeesWithRestrictions: number
    overdueFollowUps: number
    pendingRequirements: number
  }

  requirementsSummary: {
    total: number
    pending: number
    inProgress: number
    delivered: number
  }

  employeesByArea: { area: string; count: number }[]
  accidentsByArea: { area: string; count: number }[]

  // Range-dependent
  requirementsInRange: number
  requirementsTrend: { date: string; count: number }[]

  // Estáticos
  avgDeliveryDays: number
  unresolvedInventoryAlerts: number

  accidentSummary: {
    openAccidents: number
    pendingDischarges: number
    withActiveRestrictions: number
  }

  recentAccidents: {
    id: number
    employeeName: string
    areaName: string | null
    occurredAt: string
    type: string
    status: string
  }[]

  absenteeismTrend: { date: string; count: number }[]
  workersOnMedicalRest: number
  workersWithOver21DmDays: number

  recentRequirements: {
    id: number
    code: string
    status: string
    requestedBy: string
    createdAt: string
    itemCount: number
  }[]
}
