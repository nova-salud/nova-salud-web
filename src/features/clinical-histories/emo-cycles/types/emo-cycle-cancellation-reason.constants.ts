export const EMO_CANCELLATION_REASON = {
  ERROR_GENERACION: 'Error en la generación',
  TRABAJADOR_NO_DISPONIBLE: 'Trabajador no disponible',
  PROTOCOLO_MODIFICADO: 'Protocolo modificado',
  CESE_DE_TRABAJADOR: 'Cese de trabajador',
  OTRO: 'Otro',
} as const

export type EmoCancellationReasonValue = typeof EMO_CANCELLATION_REASON[keyof typeof EMO_CANCELLATION_REASON]

export const EMO_CANCELLATION_REASON_OPTIONS = Object.values(EMO_CANCELLATION_REASON).map((v) => ({ label: v, value: v }))
