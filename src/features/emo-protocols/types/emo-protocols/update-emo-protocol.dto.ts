export type UpdateEmoProtocolDto = {
  name?: string
  emoType?: string
  daysToExpire?: number
  isActive?: boolean
  nextEmoDaysFit?: number
  nextEmoDaysFitWithRestrictions?: number
}
