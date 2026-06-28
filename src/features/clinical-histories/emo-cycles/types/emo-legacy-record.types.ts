export type ClinicalHistoryConclusion = 'APTO' | 'APTO_CON_RESTRICCIONES' | 'NO_APTO'

export type EmoLegacyRecordDto = {
  id: number
  clinicalHistoryId: number
  evaluatedAt: string
  emoType: string | null
  conclusion: ClinicalHistoryConclusion | null
  notes: string | null
  fileName: string | null
  fileUrl: string | null
  fileType: string | null
  createdAt: string
}

export type CreateEmoLegacyRecordDto = {
  clinicalHistoryId: number
  evaluatedAt: string
  emoType?: string
  conclusion?: ClinicalHistoryConclusion
  notes?: string
}
