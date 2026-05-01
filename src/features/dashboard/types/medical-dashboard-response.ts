import type { AccidentStatusEnum, AccidentTypeEnum } from '@/features/accidents/accidents/types'

export interface MedicalDashboardResponse {
  summary: {
    patientsToday: number
    pendingConsultations: number
    activeCases: number
    dischargesToday: number
  }

  alerts: {
    overdueFollowUps: number
    patientsWithRestrictions: number
    casesWithoutRecentFollowUp: number
    criticalMedications: number
  }

  workload: {
    consultationsPerDay: {
      date: string
      count: number
    }[]
    averageConsultationTimeMinutes: number
  }

  clinical: {
    accidentTypes: {
      type: AccidentTypeEnum
      count: number
    }[]
    recoveryTrend: {
      date: string
      avgDays: number
    }[]
  }

  medications: {
    lowStock: {
      medicationId: number
      name: string
      stock: number
      minimumStock: number
    }[]

    mostUsed: {
      medicationId: number
      name: string
      count: number
    }[]

    recentDispensations: {
      id: number
      medicationName: string
      quantity: number
      date: string
      patientName: string
    }[]

    consumptionTrend: {
      date: string
      count: number
    }[]

    byTherapeuticCategory: {
      category: string
      count: number
    }[]
  }

  recentConsultations: {
    id: number
    employeeName: string
    date: string
    type: AccidentTypeEnum
    status: AccidentStatusEnum
    hasRestrictions: boolean
  }[]
}

export const mockMedicalDashboard: MedicalDashboardResponse = {
  summary: {
    patientsToday: 18,
    pendingConsultations: 6,
    activeCases: 12,
    dischargesToday: 4,
  },

  alerts: {
    overdueFollowUps: 3,
    patientsWithRestrictions: 5,
    casesWithoutRecentFollowUp: 2,
    criticalMedications: 2,
  },

  workload: {
    consultationsPerDay: [
      { date: '2026-04-30', count: 12 },
      { date: '2026-05-01', count: 15 },
      { date: '2026-05-02', count: 10 },
      { date: '2026-05-03', count: 18 },
      { date: '2026-05-04', count: 14 },
      { date: '2026-05-05', count: 16 },
      { date: '2026-05-06', count: 13 },
    ],
    averageConsultationTimeMinutes: 18,
  },

  clinical: {
    accidentTypes: [
      { type: 'ACCIDENT', count: 22 },
      { type: 'INCIDENT', count: 9 },
    ],
    recoveryTrend: [
      { date: '2026-04-30', avgDays: 6 },
      { date: '2026-05-01', avgDays: 5 },
      { date: '2026-05-02', avgDays: 7 },
      { date: '2026-05-03', avgDays: 6 },
      { date: '2026-05-04', avgDays: 5 },
      { date: '2026-05-05', avgDays: 4 },
      { date: '2026-05-06', avgDays: 6 },
    ],
  },

  medications: {
    lowStock: [
      {
        medicationId: 1,
        name: 'Paracetamol 500mg',
        stock: 20,
        minimumStock: 50,
      },
      {
        medicationId: 3,
        name: 'Ibuprofeno 400mg',
        stock: 15,
        minimumStock: 40,
      },
    ],

    mostUsed: [
      { medicationId: 1, name: 'Paracetamol 500mg', count: 32 },
      { medicationId: 2, name: 'Amoxicilina 500mg', count: 18 },
      { medicationId: 3, name: 'Ibuprofeno 400mg', count: 15 },
    ],

    recentDispensations: [
      {
        id: 101,
        medicationName: 'Paracetamol 500mg',
        quantity: 2,
        date: '2026-05-06T10:30:00Z',
        patientName: 'Juan Pérez',
      },
      {
        id: 102,
        medicationName: 'Ibuprofeno 400mg',
        quantity: 1,
        date: '2026-05-06T11:10:00Z',
        patientName: 'María López',
      },
      {
        id: 103,
        medicationName: 'Amoxicilina 500mg',
        quantity: 3,
        date: '2026-05-06T12:00:00Z',
        patientName: 'Carlos Ramos',
      },
    ],

    consumptionTrend: [
      { date: '2026-04-30', count: 10 },
      { date: '2026-05-01', count: 14 },
      { date: '2026-05-02', count: 8 },
      { date: '2026-05-03', count: 16 },
      { date: '2026-05-04', count: 12 },
      { date: '2026-05-05', count: 15 },
      { date: '2026-05-06', count: 11 },
    ],

    byTherapeuticCategory: [
      { category: 'Analgésicos', count: 40 },
      { category: 'Antibióticos', count: 18 },
      { category: 'Antiinflamatorios', count: 15 },
    ],
  },

  recentConsultations: [
    {
      id: 201,
      employeeName: 'Juan Pérez',
      date: '2026-05-06T10:30:00Z',
      type: 'ACCIDENT',
      status: 'OPEN',
      hasRestrictions: true,
    },
    {
      id: 202,
      employeeName: 'María López',
      date: '2026-05-06T11:10:00Z',
      type: 'INCIDENT',
      status: 'CLOSED',
      hasRestrictions: false,
    },
    {
      id: 203,
      employeeName: 'Carlos Ramos',
      date: '2026-05-05T15:20:00Z',
      type: 'ACCIDENT',
      status: 'OPEN',
      hasRestrictions: true,
    },
    {
      id: 204,
      employeeName: 'Ana Torres',
      date: '2026-05-05T09:40:00Z',
      type: 'ACCIDENT',
      status: 'CLOSED',
      hasRestrictions: false,
    },
  ],
}