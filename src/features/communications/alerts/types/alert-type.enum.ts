export const AlertType = {
  HIGH_FREQUENCY: 'HIGH_FREQUENCY',
  RESPIRATORY: 'RESPIRATORY',

  ACCIDENT_REPORTED: 'ACCIDENT_REPORTED',
  LONG_OPEN_CASE: 'LONG_OPEN_CASE',
  ACTIVE_RESTRICTIONS: 'ACTIVE_RESTRICTIONS',
  PENDING_DISCHARGE: 'PENDING_DISCHARGE',

  EMO_60_DAYS: 'EMO_60_DAYS',
  EMO_30_DAYS: 'EMO_30_DAYS',
  EMO_OVERDUE: 'EMO_OVERDUE',

  REQUIREMENT_PENDING: 'REQUIREMENT_PENDING',
  REQUIREMENT_PENDING_CONFIRMATION: 'REQUIREMENT_PENDING_CONFIRMATION',
  LOW_STOCK: 'LOW_STOCK',

  SYSTEM: 'SYSTEM',
} as const

export type AlertType = typeof AlertType[keyof typeof AlertType]

export const ALERT_LABELS: Record<AlertType, string> = {
  [AlertType.HIGH_FREQUENCY]: 'Alta frecuencia de atenciones',
  [AlertType.RESPIRATORY]: 'Síntomas respiratorios',

  [AlertType.ACCIDENT_REPORTED]: 'Accidente registrado',
  [AlertType.LONG_OPEN_CASE]: 'Caso prolongado',
  [AlertType.ACTIVE_RESTRICTIONS]: 'Restricciones activas',
  [AlertType.PENDING_DISCHARGE]: 'Alta pendiente',

  [AlertType.EMO_60_DAYS]: 'EMO próxima (60 días)',
  [AlertType.EMO_30_DAYS]: 'EMO próxima (30 días)',
  [AlertType.EMO_OVERDUE]: 'EMO vencida',

  [AlertType.REQUIREMENT_PENDING]: 'Requerimiento pendiente',
  [AlertType.REQUIREMENT_PENDING_CONFIRMATION]: 'Pendiente de confirmación',
  [AlertType.LOW_STOCK]: 'Stock bajo',

  [AlertType.SYSTEM]: 'Sistema',
}