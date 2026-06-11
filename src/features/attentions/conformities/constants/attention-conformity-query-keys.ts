export const ATTENTION_CONFORMITY_QUERY_KEYS = {
  all: ['attention-conformities'] as const,
  byAttention: (attentionId: number) => [...ATTENTION_CONFORMITY_QUERY_KEYS.all, attentionId] as const,
}
