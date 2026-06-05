export type CreateEmoProtocolDto = {
  name: string
  emoType?: string
  daysToExpire?: number
  nextEmoDaysFit?: number
  nextEmoDaysFitWithRestrictions?: number
}
