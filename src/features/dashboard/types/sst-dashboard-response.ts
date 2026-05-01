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
}

export const mockSSTDashboard: SSTDashboardResponse = {
  summary: {
    totalAccidents: 42,
    openAccidents: 14,
    closedAccidents: 28,
    withActiveRestrictions: 6,
    pendingDischarges: 4,
  },

  trend: [
    { date: '2026-04-01', accidents: 2, incidents: 1 },
    { date: '2026-04-02', accidents: 4, incidents: 2 },
    { date: '2026-04-03', accidents: 1, incidents: 3 },
    { date: '2026-04-04', accidents: 5, incidents: 1 },
    { date: '2026-04-05', accidents: 3, incidents: 2 },
    { date: '2026-04-06', accidents: 2, incidents: 1 },
    { date: '2026-04-07', accidents: 6, incidents: 2 },
  ],

  alerts: {
    overdueFollowUps: 3,
    longOpenCases: 5,
  },

  coreMetrics: {
    employeesWithRestrictions: 6,
    casesOverThresholdDays: 5,
    overdueFollowUps: 3,
    accidentsThisMonth: 18,
    accidentsLastMonth: 12,
  },

  interestingMetrics: {
    externalEmployeesInvolved: 4,
    recurrenceRate: 22,
    topAreas: [
      { area: 'Producción', count: 10 },
      { area: 'Logística', count: 6 },
      { area: 'Mantenimiento', count: 4 },
    ],
  },

  executiveMetrics: {
    accidentRatePer100Employees: 3.5,
    monthlyTrendPercentage: 25,
    averageRecoveryDays: 6,
  },

  recentAccidents: [
    {
      id: 11,
      employeeName: 'Juan Pérez',
      occurredAt: '2026-04-30T20:30:00Z',
      type: 'ACCIDENT',
      status: 'OPEN',
      hasRestrictions: true,
    },
    {
      id: 10,
      employeeName: 'María López',
      occurredAt: '2026-04-29T14:10:00Z',
      type: 'INCIDENT',
      status: 'CLOSED',
      hasRestrictions: false,
    },
    {
      id: 9,
      employeeName: 'Carlos Ramos',
      occurredAt: '2026-04-28T09:20:00Z',
      type: 'ACCIDENT',
      status: 'OPEN',
      hasRestrictions: true,
    },
    {
      id: 8,
      employeeName: 'Ana Torres',
      occurredAt: '2026-04-27T18:00:00Z',
      type: 'ACCIDENT',
      status: 'CLOSED',
      hasRestrictions: false,
    },
  ],
}