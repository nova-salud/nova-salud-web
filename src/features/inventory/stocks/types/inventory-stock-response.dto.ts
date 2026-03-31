export type InventoryStockResponseDto = {
  medicationId: number
  commercialName: string
  genericName: string | null
  therapeuticCategoryId: number
  therapeuticCategoryName: string
  minimumStock: number
  currentStock: number
  isLowStock: boolean
  isOtc: boolean
  isActive: boolean
}
