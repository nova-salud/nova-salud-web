import type { FindAlertsDto } from '../types/find-alerts.dto'

export const ALERT_QUERY_KEYS = {
  all: ['alerts'] as const,
  list: (filters?: FindAlertsDto) => [...ALERT_QUERY_KEYS.all, filters] as const,
}
