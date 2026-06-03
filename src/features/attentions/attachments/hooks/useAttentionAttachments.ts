import { useCallback } from 'react'
import { useQuery } from '@/core/hooks/useQuery'
import { attentionAttachmentService } from '../services/attention-attachment.service'

export const useAttentionAttachments = (attentionId: number | null | undefined) => {
  const enabled = Boolean(attentionId && !Number.isNaN(attentionId))

  const fetcher = useCallback(
    () => attentionAttachmentService.findByAttentionId(attentionId!),
    [attentionId],
  )

  return useQuery(fetcher, [], enabled)
}
