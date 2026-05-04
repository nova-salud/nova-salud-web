export const AlertPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const

export type AlertPriority = typeof AlertPriority[keyof typeof AlertPriority]

export const ALERT_PRIORITY_LABELS: Record<AlertPriority, string> = {
  [AlertPriority.LOW]: 'Baja',
  [AlertPriority.MEDIUM]: 'Media',
  [AlertPriority.HIGH]: 'Alta',
} as const