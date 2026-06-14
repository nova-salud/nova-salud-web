export type EmployeeDashboardResponse = {
  employee: {
    id: number
    fullName: string
    dni: string
    area: string | null
    position: string | null
    bloodGroup: string | null
    medicalInsurance: string | null
    eps: string | null
  }
  clinicalHistoryId: number | null
  recentAttentions: {
    id: number
    attendedAt: string
    triageLevel: string
    diagnosisCode: string | null
    diseaseName: string | null
    attendedByUserFullName: string | null
  }[]
  pendingFollowUps: {
    id: number
    scheduledAt: string
    reason: string | null
    originType: string
    status: string
  }[]
  activeMedicalRests: {
    id: number
    startDate: string
    endDate: string
    notes: string | null
    fileUrl: string | null
  }[]
  activeEmoCycle: {
    id: number
    emoType: string | null
    status: string
    expirationDate: string | null
    emoProtocolName: string | null
  } | null
}
