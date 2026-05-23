export type ManagementDashboardResponse = {
  summary: {
    totalEmployees: number
    activeCycles: number
    totalAccidents: number
    attentionsThisMonth: number
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

  recentRequirements: {
    id: number
    code: string
    status: string
    requestedBy: string
    createdAt: string
  }[]
}
