export const AccidentLaborRelationEnum = {
  ON_SITE: 'ON_SITE',
  IN_ITINERE: 'IN_ITINERE',
  ON_MISSION: 'ON_MISSION',
  COMMON: 'COMMON',
} as const

export type AccidentLaborRelationEnum = typeof AccidentLaborRelationEnum[keyof typeof AccidentLaborRelationEnum]

export const ACCIDENT_LABOR_RELATION_LABEL: Record<AccidentLaborRelationEnum, string> = {
  [AccidentLaborRelationEnum.ON_SITE]: 'Acc. en el lugar',
  [AccidentLaborRelationEnum.IN_ITINERE]: 'Acc. in itinere',
  [AccidentLaborRelationEnum.ON_MISSION]: 'Acc. en misión',
  [AccidentLaborRelationEnum.COMMON]: 'Acc. común',
}

export const ACCIDENT_LABOR_RELATION_OPTIONS = Object.values(AccidentLaborRelationEnum).map((value) => ({
  label: ACCIDENT_LABOR_RELATION_LABEL[value],
  value,
}))
