export const AccidentCaseStatusEnum = {
  OPEN: 'OPEN',
  IN_TREATMENT: 'IN_TREATMENT',
  IN_REHABILITATION: 'IN_REHABILITATION',
  CLOSED: 'CLOSED',
} as const

export type AccidentCaseStatusEnum =
  typeof AccidentCaseStatusEnum[keyof typeof AccidentCaseStatusEnum]

export const ACCIDENT_CASE_STATUS_OPTIONS = [
  { label: 'Abierto', value: AccidentCaseStatusEnum.OPEN },
  { label: 'En tratamiento', value: AccidentCaseStatusEnum.IN_TREATMENT },
  { label: 'En rehabilitación', value: AccidentCaseStatusEnum.IN_REHABILITATION },
  { label: 'Cerrado', value: AccidentCaseStatusEnum.CLOSED },
]

export const ACCIDENT_CASE_STATUS_LABEL: Record<AccidentCaseStatusEnum, string> = {
  OPEN: 'Abierto',
  IN_TREATMENT: 'En tratamiento',
  IN_REHABILITATION: 'En rehabilitación',
  CLOSED: 'Cerrado',
}

export const ACCIDENT_CASE_STATUS_CLASSNAME: Record<AccidentCaseStatusEnum, string> = {
  OPEN: 'bg-blue-100 text-blue-700',
  IN_TREATMENT: 'bg-yellow-100 text-yellow-700',
  IN_REHABILITATION: 'bg-orange-100 text-orange-700',
  CLOSED: 'bg-emerald-100 text-emerald-700',
}