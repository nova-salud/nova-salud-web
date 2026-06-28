import { useAppQuery } from '@/shared/hooks'
import { clinicalHistoryEmoCycleService } from '@/features/clinical-histories/emo-cycles/services/clinical-history-emo-cycle.service'
import { attentionService } from '@/features/attentions/attentions/services/attention.service'
import type { ClinicalHistoryEmoCycleResponseDto } from '@/features/clinical-histories/emo-cycles/types'
import type { AttentionResponseDto } from '@/features/attentions/attentions/types'

export const useEmployeeDocumentsDetail = (employeeId: number, clinicalHistoryId: number | undefined) => {
  const { data: cycles, isLoading: isLoadingCycles } = useAppQuery<ClinicalHistoryEmoCycleResponseDto[]>({
    queryKey: ['employee-documents-cycles', employeeId],
    queryFn: () => clinicalHistoryEmoCycleService.findByEmployeeId(employeeId),
    enabled: Boolean(employeeId),
  })

  const { data: attentionsData, isLoading: isLoadingAttentions } = useAppQuery({
    queryKey: ['employee-documents-attentions', clinicalHistoryId],
    queryFn: () => attentionService.findAll({ clinicalHistoryId, pageSize: 100 }),
    enabled: Boolean(clinicalHistoryId),
  })

  const completedCycles = (cycles ?? []).filter((c) => c.conclusion !== null)
  const attentions: AttentionResponseDto[] = attentionsData?.data ?? []

  return {
    completedCycles,
    attentions,
    isLoading: isLoadingCycles || isLoadingAttentions,
  }
}
