export const NOTIFICATION_QUERY_KEYS = {
  all: ['notifications'] as const,
  list: () => [...NOTIFICATION_QUERY_KEYS.all] as const,
}
