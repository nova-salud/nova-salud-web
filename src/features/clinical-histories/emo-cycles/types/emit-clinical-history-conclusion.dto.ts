import type { ClinicalHistoryConclusion } from './clinical-history-emo-cycle-response.dto'

export type EmitClinicalHistoryConclusionDto = {
  conclusion: ClinicalHistoryConclusion
  restrictions?: string
  doctorEmployeeId: number
  doctorFullName: string
  doctorSignatureData: string
}