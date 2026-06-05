export const EMO_CYCLE_TYPE = {
  PRE_OCUPACIONAL: 'Pre-Ocupacional',
  PERIODICO: 'Periódico',
  CAMBIO_DE_PUESTO: 'Cambio de Puesto',
  REINCORPORACION: 'Reincorporación',
  RETIRO: 'Retiro',
} as const

export type EmoCycleTypeValue = typeof EMO_CYCLE_TYPE[keyof typeof EMO_CYCLE_TYPE]

export const EMO_CYCLE_TYPE_OPTIONS = Object.values(EMO_CYCLE_TYPE).map((v) => ({ label: v, value: v }))
