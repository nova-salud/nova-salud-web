import type { AccidentStatusEnum, AccidentTypeEnum } from '@/features/accidents/accidents/types'

export type SSTDashboardResponse = {
  summary: {
    totalAccidents: number
    openAccidents: number
    closedAccidents: number
    withActiveRestrictions: number
    pendingDischarges: number
  }

  trend: {
    date: string
    accidents: number
    incidents: number
  }[]

  alerts: {
    overdueFollowUps: number
    longOpenCases: number
  }

  coreMetrics: {
    employeesWithRestrictions: number
    casesOverThresholdDays: number
    overdueFollowUps: number
    accidentsThisMonth: number
    accidentsLastMonth: number
  }

  interestingMetrics: {
    externalEmployeesInvolved: number
    recurrenceRate: number
    topAreas: {
      area: string
      count: number
    }[]
  }

  executiveMetrics: {
    accidentRatePer100Employees: number
    monthlyTrendPercentage: number
    averageRecoveryDays: number
  }

  recentAccidents: {
    id: number
    employeeName: string
    occurredAt: string
    type: AccidentTypeEnum
    status: AccidentStatusEnum
    hasRestrictions: boolean
  }[]

  daysSinceLastAccident: number | null

  accidentsByForm: {
    form: string
    count: number
  }[]
}