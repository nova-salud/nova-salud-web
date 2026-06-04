export const CONVENIO = {
  EPS: 'EPS',
  SEGURO_PARTICULAR: 'Seguro particular',
  SCTR: 'SCTR',
  OTROS: 'Otros',
} as const

export type ConvenioValue = typeof CONVENIO[keyof typeof CONVENIO]

export const CONVENIO_OPTIONS = Object.values(CONVENIO).map((v) => ({ label: v, value: v }))
