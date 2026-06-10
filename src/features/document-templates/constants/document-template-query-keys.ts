export const DOCUMENT_TEMPLATE_QUERY_KEYS = {
  all: ['document-templates'] as const,
  list: () => [...DOCUMENT_TEMPLATE_QUERY_KEYS.all] as const,
}
