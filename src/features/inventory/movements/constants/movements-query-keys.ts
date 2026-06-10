import type { FindInventoryMovementsDto } from '../types/find-inventory-movements.dto'

export const MOVEMENT_QUERY_KEYS = {
  all: ['movements'] as const,
  list: (filters: FindInventoryMovementsDto) => [...MOVEMENT_QUERY_KEYS.all, filters] as const,
}