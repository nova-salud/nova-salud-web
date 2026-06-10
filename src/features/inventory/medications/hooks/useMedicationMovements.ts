import { keepPreviousData } from '@tanstack/react-query'
import { usePaginatedQuery } from '@/shared/hooks'
import { movementService } from '../../movements/services/movement.service'
import { MEDICATION_QUERY_KEYS } from '../constants/medications-query-keys'
import type { InventoryMovementResponseDto } from '../../movements/types/inventory-movement-response.dto'
import type { FindInventoryMovementsDto } from '../../movements/types/find-inventory-movements.dto'

export const useMedicationMovements = (medicationId: number) => {
  return usePaginatedQuery<InventoryMovementResponseDto, FindInventoryMovementsDto>({
    queryKey: MEDICATION_QUERY_KEYS.movements(medicationId),
    queryFn: (filters) => movementService.findAll({ ...filters, medicationId }),
    enabled: !Number.isNaN(medicationId),
    defaultSortBy: 'createdAt',
    defaultSortOrder: 'DESC',
    placeholderData: keepPreviousData,
  })
}
