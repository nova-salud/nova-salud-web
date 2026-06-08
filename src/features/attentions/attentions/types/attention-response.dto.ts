import type { AuditResponseDto } from '@/core/types/audit-response.dto'
import type { FollowUpResponseDto } from '../../../follow-ups/types/follow-up-response.dto'
import type { TriageLevelEnum } from './triage.enum'
import type { DiseaseType } from '@/features/attentions/diseases/types/disease-type.enum'

export type AttentionResponseDto = AuditResponseDto & {
  id: number
  clinicalHistoryId: number
  attendedByUserId: number
  originFollowUpId: number | null

  originFollowUp: FollowUpResponseDto | null

  symptoms: string | null
  diagnosisCode: string | null
  diseaseName: string | null
  diseaseType: DiseaseType | null
  eva: number | null
  treatment: string | null
  notes: string | null

  triageLevel: TriageLevelEnum

  followUps: FollowUpResponseDto[]

  snapshotMedicalInsurance: string | null
  snapshotEps: string | null
  snapshotEpsPlan: string | null
  snapshotSctrHealth: string | null
}