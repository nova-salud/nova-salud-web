export const HEALTHCARE_CENTER_TYPE = {
  CLINIC: 'CLINIC',
  HOSPITAL: 'HOSPITAL',
} as const

export type HealthcareCenterTypeValue = typeof HEALTHCARE_CENTER_TYPE[keyof typeof HEALTHCARE_CENTER_TYPE]

export const HEALTHCARE_CENTER_TYPE_LABEL: Record<HealthcareCenterTypeValue, string> = {
  CLINIC: 'Clínica',
  HOSPITAL: 'Hospital',
}

export const HEALTHCARE_CENTER_TYPE_OPTIONS = Object.entries(HEALTHCARE_CENTER_TYPE_LABEL).map(
  ([value, label]) => ({ value, label })
)
