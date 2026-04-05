export const DispenseTypeEnum = {
  ATTENTION: 'ATTENTION',
  OTC: 'OTC',
  EMERGENCY: 'EMERGENCY',
  THIRD_PARTY: 'THIRD_PARTY',
} as const

export type DispenseTypeEnum =
  typeof DispenseTypeEnum[keyof typeof DispenseTypeEnum]

export const DISPENSE_TYPE_OPTIONS = [
  { label: 'Atención médica', value: DispenseTypeEnum.ATTENTION },
  { label: 'OTC (Libre)', value: DispenseTypeEnum.OTC },
  { label: 'Emergencia', value: DispenseTypeEnum.EMERGENCY },
  { label: 'Tercero', value: DispenseTypeEnum.THIRD_PARTY },
]