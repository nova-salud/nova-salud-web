import { useAppQuery } from '@/shared/hooks'
import { attentionAttachmentService } from '../services/attention-attachment.service'

export const useAttentionAttachments = (attentionId: number | null | undefined) => {
  const { data, ...rest } = useAppQuery({
    queryKey: ['attention-attachments', attentionId],
    queryFn: () => attentionAttachmentService.findByAttentionId(attentionId!),
    enabled: Boolean(attentionId && !Number.isNaN(attentionId)),
  })
  return { ...rest, data: data ?? [] }
}
