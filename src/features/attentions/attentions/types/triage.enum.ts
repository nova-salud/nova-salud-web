export const TriageLevelEnum = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const

export type TriageLevelEnum =
  typeof TriageLevelEnum[keyof typeof TriageLevelEnum]

export const TRIAGE_LEVEL_LABEL: Record<TriageLevelEnum, string> = {
  LOW: 'Leve',
  MEDIUM: 'Moderado',
  HIGH: 'Complejo',
}

export const TRIAGE_LEVEL_CLASSNAME: Record<TriageLevelEnum, string> = {
  LOW: 'bg-emerald-100 text-emerald-700',
  MEDIUM: 'bg-amber-100 text-amber-700',
  HIGH: 'bg-red-100 text-red-700',
}

export const TRIAGE_LEVEL_OPTIONS = [
  { label: 'Leve', value: TriageLevelEnum.LOW },
  { label: 'Moderado', value: TriageLevelEnum.MEDIUM },
  { label: 'Complejo', value: TriageLevelEnum.HIGH },
]