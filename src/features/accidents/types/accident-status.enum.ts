export const AccidentStatusEnum = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED',
} as const

export type AccidentStatusEnum =
  typeof AccidentStatusEnum[keyof typeof AccidentStatusEnum]

export const ACCIDENT_STATUS_OPTIONS = [
  { label: 'Abierto', value: AccidentStatusEnum.OPEN },
  { label: 'En proceso', value: AccidentStatusEnum.IN_PROGRESS },
  { label: 'Cerrado', value: AccidentStatusEnum.CLOSED },
]

export const ACCIDENT_STATUS_LABEL: Record<AccidentStatusEnum, string> = {
  OPEN: 'Abierto',
  IN_PROGRESS: 'En proceso',
  CLOSED: 'Cerrado',
}

export const ACCIDENT_STATUS_CLASSNAME: Record<AccidentStatusEnum, string> = {
  OPEN: 'bg-red-100 text-red-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  CLOSED: 'bg-emerald-100 text-emerald-700',
}