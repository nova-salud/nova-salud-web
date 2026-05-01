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