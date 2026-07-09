export type CreateEmoProtocolDto = {
  name: string
  examIds: number[]
  emoType?: string
  daysToExpire?: number
  nextEmoDaysFit?: number
  nextEmoDaysFitWithRestrictions?: number
}
