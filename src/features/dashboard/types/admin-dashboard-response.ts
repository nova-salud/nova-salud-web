export type ActivityType = 'ACCIDENT' | 'ATTENTION' | 'MEDICATION'

export const ACTIVITY_TYPE_LABEL: Record<ActivityType, string> = {
  ACCIDENT: 'Accidente',
  ATTENTION: 'Atención',
  MEDICATION: 'Medicamento',
}

export interface AdminDashboardResponse {
  summary: {
    totalEmployees: number
    activeEmployees: number
    externalEmployees: number

    totalAccidents: number
    activeCases: number
    closedCases: number

    consultationsToday: number
  }

  alerts: {
    overdueFollowUps: number
    longOpenCases: number
    employeesWithRestrictions: number
    criticalMedications: number
  }

  trends: {
    accidents: {
      date: string
      value: number
    }[]

    consultations: {
      date: string
      value: number
    }[]
  }

  distribution: {
    accidentsByType: {
      type: 'ACCIDENT' | 'INCIDENT'
      count: number
    }[]

    accidentsByArea: {
      area: string
      count: number
    }[]
  }

  medical: {
    averageRecoveryDays: number
    mostUsedMedications: {
      name: string
      count: number
    }[]
  }

  sst: {
    accidentRatePer100Employees: number
    recurrenceRate: number
    casesOverThresholdDays: number
  }

  system: {
    activeUsers: number
    blockedUsers: number
    lastSyncAt: string | null
  }

  recentActivity: {
    id: number
    type: ActivityType
    description: string
    date: string
  }[]
}

export const mockAdminDashboard: AdminDashboardResponse = {
  summary: {
    totalEmployees: 120,
    activeEmployees: 110,
    externalEmployees: 25,

    totalAccidents: 42,
    activeCases: 14,
    closedCases: 28,

    consultationsToday: 18,
  },

  alerts: {
    overdueFollowUps: 4,
    longOpenCases: 6,
    employeesWithRestrictions: 9,
    criticalMedications: 3,
  },

  trends: {
    accidents: [
      { date: '2026-04-30', value: 3 },
      { date: '2026-05-01', value: 5 },
      { date: '2026-05-02', value: 2 },
      { date: '2026-05-03', value: 6 },
      { date: '2026-05-04', value: 4 },
      { date: '2026-05-05', value: 5 },
      { date: '2026-05-06', value: 3 },
    ],

    consultations: [
      { date: '2026-04-30', value: 12 },
      { date: '2026-05-01', value: 15 },
      { date: '2026-05-02', value: 10 },
      { date: '2026-05-03', value: 18 },
      { date: '2026-05-04', value: 14 },
      { date: '2026-05-05', value: 16 },
      { date: '2026-05-06', value: 13 },
    ],
  },

  distribution: {
    accidentsByType: [
      { type: 'ACCIDENT', count: 30 },
      { type: 'INCIDENT', count: 12 },
    ],

    accidentsByArea: [
      { area: 'Producción', count: 15 },
      { area: 'Logística', count: 10 },
      { area: 'Mantenimiento', count: 9 },
      { area: 'Administración', count: 8 },
    ],
  },

  medical: {
    averageRecoveryDays: 6,
    mostUsedMedications: [
      { name: 'Paracetamol 500mg', count: 40 },
      { name: 'Ibuprofeno 400mg', count: 25 },
      { name: 'Amoxicilina 500mg', count: 18 },
    ],
  },

  sst: {
    accidentRatePer100Employees: 3.8,
    recurrenceRate: 22,
    casesOverThresholdDays: 6,
  },

  system: {
    activeUsers: 28,
    blockedUsers: 3,
    lastSyncAt: '2026-05-06T12:00:00Z',
  },

  recentActivity: [
    {
      id: 1,
      type: 'ACCIDENT',
      description: 'Accidente registrado - Juan Pérez',
      date: '2026-05-06T10:30:00Z',
    },
    {
      id: 2,
      type: 'ATTENTION',
      description: 'Atención médica completada - María López',
      date: '2026-05-06T11:00:00Z',
    },
    {
      id: 3,
      type: 'MEDICATION',
      description: 'Dispensación - Paracetamol 500mg',
      date: '2026-05-06T11:20:00Z',
    },
    {
      id: 4,
      type: 'ACCIDENT',
      description: 'Incidente registrado - Carlos Ramos',
      date: '2026-05-05T16:10:00Z',
    },
  ]
}