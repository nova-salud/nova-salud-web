export const AccidentDischargeTypeEnum = {
  NONE: 'NONE',
  WITH_RESTRICTIONS: 'WITH_RESTRICTIONS',
  WITHOUT_RESTRICTIONS: 'WITHOUT_RESTRICTIONS',
  WITH_CONSENT: 'WITH_CONSENT'
} as const

export type AccidentDischargeTypeEnum =
  typeof AccidentDischargeTypeEnum[keyof typeof AccidentDischargeTypeEnum]

export const ACCIDENT_DISCHARGE_TYPE_OPTIONS = [
  { label: 'Sin alta', value: AccidentDischargeTypeEnum.NONE },
  { label: 'Con restricciones', value: AccidentDischargeTypeEnum.WITH_RESTRICTIONS },
  { label: 'Con consentimiento', value: AccidentDischargeTypeEnum.WITH_CONSENT },
  { label: 'Sin restricciones', value: AccidentDischargeTypeEnum.WITHOUT_RESTRICTIONS },
]

export const ACCIDENT_DISCHARGE_TYPE_LABEL: Record<AccidentDischargeTypeEnum, string> = {
  NONE: 'Sin alta',
  WITH_RESTRICTIONS: 'Con restricciones',
  WITHOUT_RESTRICTIONS: 'Sin restricciones',
  WITH_CONSENT: 'Con consentimiento'
}

export const ACCIDENT_DISCHARGE_TYPE_CLASSNAME: Record<AccidentDischargeTypeEnum, string> = {
  NONE: 'bg-slate-200 text-slate-600',
  WITH_RESTRICTIONS: 'bg-red-100 text-red-700',
  WITH_CONSENT: 'bg-red-100 text-red-700',
  WITHOUT_RESTRICTIONS: 'bg-green-100 text-green-700',
}