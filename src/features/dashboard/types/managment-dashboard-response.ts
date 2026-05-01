export interface ManagementDashboardResponse {
  summary: {
    totalEmployees: number
    activeEmployees: number
    externalEmployees: number

    totalAccidents: number
    activeCases: number

    attentionsThisMonth: number
  }

  alerts: {
    employeesWithRestrictions: number
    longOpenCases: number
    overdueFollowUps: number

    pendingRequirements: number
    delayedRequirements: number
  }

  requirements: {
    summary: {
      total: number
      pending: number
      inProgress: number
      delivered: number
    }

    monthly: {
      created: number
      delivered: number
    }

    trend: {
      date: string
      created: number
      delivered: number
    }[]

    byStatus: {
      status: string
      count: number
    }[]
  }

  employees: {
    byArea: {
      area: string
      count: number
    }[]

    externalRatio: number
  }

  accidents: {
    trend: {
      date: string
      value: number
    }[]

    byArea: {
      area: string
      count: number
    }[]
  }

  productivity: {
    attentionsPerDay: {
      date: string
      count: number
    }[]

    averagePerDay: number
  }

  recentRequirements: {
    id: number
    code: string
    status: string
    requestedBy: string
    createdAt: string
    deliveredAt: string | null
  }[]
}

export const mockManagementDashboard: ManagementDashboardResponse = {
  summary: {
    totalEmployees: 120,
    activeEmployees: 110,
    externalEmployees: 25,

    totalAccidents: 42,
    activeCases: 14,

    attentionsThisMonth: 210,
  },

  alerts: {
    employeesWithRestrictions: 9,
    longOpenCases: 6,
    overdueFollowUps: 4,

    pendingRequirements: 12,
    delayedRequirements: 5,
  },

  requirements: {
    summary: {
      total: 80,
      pending: 12,
      inProgress: 18,
      delivered: 50,
    },

    monthly: {
      created: 30,
      delivered: 24,
    },

    trend: [
      { date: '2026-04-30', created: 5, delivered: 3 },
      { date: '2026-05-01', created: 6, delivered: 4 },
      { date: '2026-05-02', created: 4, delivered: 5 },
      { date: '2026-05-03', created: 7, delivered: 6 },
      { date: '2026-05-04', created: 3, delivered: 4 },
      { date: '2026-05-05', created: 5, delivered: 2 },
      { date: '2026-05-06', created: 4, delivered: 3 },
    ],

    byStatus: [
      { status: 'PENDING', count: 12 },
      { status: 'IN_PROGRESS', count: 18 },
      { status: 'DELIVERED', count: 50 },
    ],
  },

  employees: {
    byArea: [
      { area: 'Producción', count: 40 },
      { area: 'Logística', count: 25 },
      { area: 'Mantenimiento', count: 20 },
      { area: 'Administración', count: 15 },
    ],

    externalRatio: 20.8, // %
  },

  accidents: {
    trend: [
      { date: '2026-04-30', value: 3 },
      { date: '2026-05-01', value: 5 },
      { date: '2026-05-02', value: 2 },
      { date: '2026-05-03', value: 6 },
      { date: '2026-05-04', value: 4 },
      { date: '2026-05-05', value: 5 },
      { date: '2026-05-06', value: 3 },
    ],

    byArea: [
      { area: 'Producción', count: 15 },
      { area: 'Logística', count: 10 },
      { area: 'Mantenimiento', count: 9 },
      { area: 'Administración', count: 8 },
    ],
  },

  productivity: {
    attentionsPerDay: [
      { date: '2026-04-30', count: 28 },
      { date: '2026-05-01', count: 32 },
      { date: '2026-05-02', count: 25 },
      { date: '2026-05-03', count: 35 },
      { date: '2026-05-04', count: 30 },
      { date: '2026-05-05', count: 33 },
      { date: '2026-05-06', count: 27 },
    ],

    averagePerDay: 30,
  },

  recentRequirements: [
    {
      id: 101,
      code: 'REQ-001',
      status: 'PENDING',
      requestedBy: 'Juan Pérez',
      createdAt: '2026-05-06T09:00:00Z',
      deliveredAt: null,
    },
    {
      id: 102,
      code: 'REQ-002',
      status: 'IN_PROGRESS',
      requestedBy: 'María López',
      createdAt: '2026-05-05T11:30:00Z',
      deliveredAt: null,
    },
    {
      id: 103,
      code: 'REQ-003',
      status: 'DELIVERED',
      requestedBy: 'Carlos Ramos',
      createdAt: '2026-05-04T14:20:00Z',
      deliveredAt: '2026-05-06T10:00:00Z',
    },
    {
      id: 104,
      code: 'REQ-004',
      status: 'PENDING',
      requestedBy: 'Ana Torres',
      createdAt: '2026-05-03T08:15:00Z',
      deliveredAt: null,
    },
  ],
}