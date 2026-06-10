import { keepPreviousData } from '@tanstack/react-query'
import { usePaginatedQuery } from '@/shared/hooks'
import { lotService } from '../../lots/services/lot.service'
import { MEDICATION_QUERY_KEYS } from '../constants/medications-query-keys'
import type { MedicationLotResponseDto } from '../../lots/types/medication-lot-response.dto'
import type { FindMedicationLotsDto } from '../../lots/types/find-medication-lots.dto'

export const useMedicationLots = (medicationId: number) => {
  return usePaginatedQuery<MedicationLotResponseDto, FindMedicationLotsDto>({
    queryKey: MEDICATION_QUERY_KEYS.lots(medicationId),
    queryFn: (filters) => lotService.findAll({ ...filters, medicationId }),
    enabled: !Number.isNaN(medicationId),
    defaultSortBy: 'createdAt',
    defaultSortOrder: 'DESC',
    placeholderData: keepPreviousData,
  })
}
