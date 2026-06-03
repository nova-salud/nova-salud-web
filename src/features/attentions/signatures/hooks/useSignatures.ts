import { useCallback } from 'react'
import { useQuery } from '@/core/hooks/useQuery'
import { signatureService } from '../services/signature.service'

export const useSignatures = (attentionId: number | null | undefined) => {
  const enabled = Boolean(attentionId && !Number.isNaN(attentionId))

  const fetcher = useCallback(
    () => signatureService.findByAttentionId(attentionId!),
    [attentionId],
  )

  return useQuery(fetcher, [], enabled)
}
