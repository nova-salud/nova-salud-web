export const DiseaseType = {
  COMMON: 'COMMON',
  OCCUPATIONAL: 'OCCUPATIONAL',
} as const

export type DiseaseType = typeof DiseaseType[keyof typeof DiseaseType]

export const DISEASE_TYPE_LABEL: Record<DiseaseType, string> = {
  [DiseaseType.COMMON]: 'Enfermedad común',
  [DiseaseType.OCCUPATIONAL]: 'Enfermedad ocupacional',
}

export const DISEASE_TYPE_OPTIONS = Object.values(DiseaseType).map((value) => ({
  value,
  label: DISEASE_TYPE_LABEL[value],
}))
