export const FollowUpOriginTypeEnum = {
  ATTENTION: 'ATTENTION',
  ACCIDENT: 'ACCIDENT',
  MANUAL: 'MANUAL',
} as const

export type FollowUpOriginTypeEnum =
  typeof FollowUpOriginTypeEnum[keyof typeof FollowUpOriginTypeEnum]

export const FOLLOW_UP_ORIGIN_TYPE_OPTIONS = [
  { label: 'Atención médica', value: FollowUpOriginTypeEnum.ATTENTION },
  { label: 'Accidente', value: FollowUpOriginTypeEnum.ACCIDENT },
  { label: 'Manual', value: FollowUpOriginTypeEnum.MANUAL },
]

export const FOLLOW_UP_ORIGIN_TYPE_LABEL: Record<FollowUpOriginTypeEnum, string> = {
  ATTENTION: 'Atención médica',
  ACCIDENT: 'Accidente',
  MANUAL: 'Manual',
}

export const FOLLOW_UP_ORIGIN_TYPE_CLASSNAME: Record<FollowUpOriginTypeEnum, string> = {
  ATTENTION: 'bg-blue-100 text-blue-700',
  ACCIDENT: 'bg-red-100 text-red-700',
  MANUAL: 'bg-slate-200 text-slate-600',
}