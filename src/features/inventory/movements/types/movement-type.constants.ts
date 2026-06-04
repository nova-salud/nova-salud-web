export type MovementTypeKey = 'IN' | 'OUT' | 'ADJUSTMENT_IN' | 'ADJUSTMENT_OUT'

type MovementTypeMeta = {
  label: string
  classes: string
}

export const MOVEMENT_TYPE_META: Record<MovementTypeKey, MovementTypeMeta> = {
  IN:             { label: 'Ingreso',        classes: 'border border-emerald-100 bg-emerald-50 text-emerald-700' },
  OUT:            { label: 'Salida',         classes: 'border border-red-100 bg-red-50 text-red-600' },
  ADJUSTMENT_IN:  { label: 'Ajuste entrada', classes: 'border border-sky-100 bg-sky-50 text-sky-700' },
  ADJUSTMENT_OUT: { label: 'Ajuste salida',  classes: 'border border-orange-100 bg-orange-50 text-orange-700' },
}

const FALLBACK_CLASSES = 'border border-slate-200 bg-slate-50 text-slate-500'

export const getMovementTypeMeta = (type: string): MovementTypeMeta =>
  MOVEMENT_TYPE_META[type as MovementTypeKey] ?? { label: type, classes: FALLBACK_CLASSES }

export const MOVEMENT_TYPE_OPTIONS = [
  { label: 'Todos los tipos', value: '' },
  ...Object.entries(MOVEMENT_TYPE_META).map(([value, { label }]) => ({ label, value })),
]
