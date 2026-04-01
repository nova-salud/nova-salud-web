export type TherapeuticCategoryResponseDto = {
  id: number
  name: string
  description: string | null
  isActive: boolean
  createdAt: string
  createdBy: number | null
  updatedAt: string
  updatedBy: number | null
}