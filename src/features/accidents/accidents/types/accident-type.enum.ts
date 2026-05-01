export const AccidentTypeEnum = {
  ACCIDENT: 'ACCIDENT',
  INCIDENT: 'INCIDENT',
} as const

export type AccidentTypeEnum =
  typeof AccidentTypeEnum[keyof typeof AccidentTypeEnum]

export const ACCIDENT_TYPE_OPTIONS = [
  { label: 'Accidente', value: AccidentTypeEnum.ACCIDENT },
  { label: 'Incidente', value: AccidentTypeEnum.INCIDENT },
]

export const ACCIDENT_TYPE_LABEL: Record<AccidentTypeEnum, string> = {
  ACCIDENT: 'Accidente',
  INCIDENT: 'Incidente',
}

export const ACCIDENT_TYPE_CLASSNAME: Record<AccidentTypeEnum, string> = {
  ACCIDENT: 'bg-red-100 text-red-700',
  INCIDENT: 'bg-blue-100 text-blue-700',
}