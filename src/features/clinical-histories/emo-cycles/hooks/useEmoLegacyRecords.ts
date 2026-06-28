import { useAppQuery } from '@/shared/hooks'
import { emoLegacyRecordService } from '../services/emo-legacy-record.service'
import type { EmoLegacyRecordDto } from '../types/emo-legacy-record.types'

export const useEmoLegacyRecords = (clinicalHistoryId: number) => {
  const { data, ...rest } = useAppQuery<EmoLegacyRecordDto[]>({
    queryKey: ['emo-legacy-records', clinicalHistoryId],
    queryFn: () => emoLegacyRecordService.findByClinicalHistoryId(clinicalHistoryId),
    enabled: Boolean(clinicalHistoryId),
  })
  return { ...rest, records: data ?? [] }
}
