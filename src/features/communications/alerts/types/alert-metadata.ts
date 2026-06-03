export type AlertMetadata =
  | {
    clinicalHistoryId: number
    attentionsCount: number
    area: string | null
    position: string | null
  }
  | {
    clinicalHistoryId: number
    respiratoryCount: number
  }
  | {
    accidentId: number
  }
  | {
    accidentCaseId: number
  }
  | {
    historyId: number
    band: string
    daysRemaining: number
    emoExpirationDate: string | null
  }
  | {
    requirementId: number
  }
  | {
    medicationId: number
    stock: number
    minimumStock: number
  }