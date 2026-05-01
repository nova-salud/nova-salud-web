export const FollowUpStatusEnum = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  MISSED: 'MISSED',
  CANCELLED: 'CANCELLED',
} as const

export type FollowUpStatusEnum =
  typeof FollowUpStatusEnum[keyof typeof FollowUpStatusEnum]

export const FOLLOW_UP_STATUS_OPTIONS = [
  { label: 'Pendiente', value: FollowUpStatusEnum.PENDING },
  { label: 'Completado', value: FollowUpStatusEnum.COMPLETED },
  { label: 'No cumplido', value: FollowUpStatusEnum.MISSED },
  { label: 'Cancelado', value: FollowUpStatusEnum.CANCELLED },
]


export const FOLLOW_UP_STATUS_LABEL: Record<FollowUpStatusEnum, string> = {
  PENDING: 'Pendiente',
  COMPLETED: 'Completado',
  MISSED: 'No cumplido',
  CANCELLED: 'Cancelado',
}

export const FOLLOW_UP_STATUS_CLASSNAME: Record<FollowUpStatusEnum, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  MISSED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-slate-200 text-slate-600',
}