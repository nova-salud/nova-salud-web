export const SIGNATURE_QUERY_KEYS = {
  all: ['signatures'] as const,
  byAttention: (attentionId: number) => [...SIGNATURE_QUERY_KEYS.all, 'attention', attentionId] as const,
}
