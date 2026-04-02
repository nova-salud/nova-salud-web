export const DispenseTypeEnum = {
  ATTENTION: 'ATTENTION',
  OTC: 'OTC',
  EMERGENCY: 'EMERGENCY',
  THIRD_PARTY: 'THIRD_PARTY',
} as const

export type DispenseTypeEnum = typeof DispenseTypeEnum[keyof typeof DispenseTypeEnum]