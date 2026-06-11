import { useAppQuery } from '@/shared/hooks'
import type { EmoProtocolExamResponseDto } from '../../types'
import { emoProtocolExamService } from '../../services/emo-protocol-exam.service'

export const useEmoProtocolExams = (emoProtocolId: number) => {
  const { data, ...rest } = useAppQuery<EmoProtocolExamResponseDto[]>({
    queryKey: ['emo-protocol-exams', emoProtocolId],
    queryFn: () => emoProtocolExamService.findByProtocolId(emoProtocolId),
    enabled: Boolean(emoProtocolId && !Number.isNaN(emoProtocolId)),
  })
  return { ...rest, data: data ?? [] }
}
