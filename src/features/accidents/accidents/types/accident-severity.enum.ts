export const AccidentSeverityEnum = {
  INCIDENT: 'INCIDENT',
  MINOR_ACCIDENT: 'MINOR_ACCIDENT',
  DISABLING_ACCIDENT: 'DISABLING_ACCIDENT',
  FATAL_ACCIDENT: 'FATAL_ACCIDENT',
} as const

export type AccidentSeverityEnum = typeof AccidentSeverityEnum[keyof typeof AccidentSeverityEnum]

export const ACCIDENT_SEVERITY_LABEL: Record<AccidentSeverityEnum, string> = {
  [AccidentSeverityEnum.INCIDENT]: 'Incidente',
  [AccidentSeverityEnum.MINOR_ACCIDENT]: 'Accidente leve',
  [AccidentSeverityEnum.DISABLING_ACCIDENT]: 'Accidente incapacitante',
  [AccidentSeverityEnum.FATAL_ACCIDENT]: 'Accidente mortal',
}

export const ACCIDENT_SEVERITY_OPTIONS = Object.values(AccidentSeverityEnum).map((value) => ({
  label: ACCIDENT_SEVERITY_LABEL[value],
  value,
}))
