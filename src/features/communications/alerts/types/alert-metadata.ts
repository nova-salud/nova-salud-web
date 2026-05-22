export type AlertMetadata =
  | {
    clinicalHistoryId: number
    attentionsCount: number
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
  }
  | {
    requirementId: number
  }
  | {
    medicationId: number
    stock: number
    minimumStock: number
  }