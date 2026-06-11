import { useAppQuery } from '@/shared/hooks'
import { SIGNATURE_QUERY_KEYS } from '../constants/signature-query-keys'
import { signatureService } from '../services/signature.service'
import type { SignatureResponseDto } from '../types/signature-response.dto'

export const useSignatures = (attentionId: number | null | undefined) => {
  const { data, isFetching, error, refetch } = useAppQuery<SignatureResponseDto[]>({
    queryKey: SIGNATURE_QUERY_KEYS.byAttention(attentionId ?? 0),
    queryFn: () => signatureService.findByAttentionId(attentionId!),
    enabled: Boolean(attentionId && !Number.isNaN(attentionId)),
  })

  return {
    data: data ?? [],
    isLoading: isFetching,
    error: error?.message ?? null,
    refetch: async () => { await refetch() },
  }
}
