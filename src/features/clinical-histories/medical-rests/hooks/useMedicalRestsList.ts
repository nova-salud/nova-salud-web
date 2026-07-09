import { keepPreviousData } from '@tanstack/react-query'
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { useUrlFilters } from '@/shared/hooks/useUrlFilters'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { medicalRestService } from '../services/medical-rest.service'
import type { FindMedicalRestsParams } from '../services/medical-rest.service'
import type { MedicalRestResponseDto } from '../types'

type ExtraFilters = {
  employeeFullName?: string
  dni?: string
  startDateFrom?: string
  startDateTo?: string
}

export const useMedicalRestsList = () => {
  const { filters: extraFilters, setFilters } = useUrlFilters<ExtraFilters>()
  const debouncedName = useDebounce(extraFilters.employeeFullName, 400)
  const debouncedDni = useDebounce(extraFilters.dni, 400)

  const result = usePaginatedQuery<MedicalRestResponseDto, FindMedicalRestsParams>({
    queryKey: ['medical-rests-list', { ...extraFilters, employeeFullName: debouncedName, dni: debouncedDni }],
    queryFn: (filters) => medicalRestService.findAll({
      ...filters,
      ...extraFilters,
      employeeFullName: debouncedName,
      dni: debouncedDni,
    }),
    placeholderData: keepPreviousData,
  })

  const onChangeFilters = (filters: Partial<ExtraFilters>) => {
    setFilters(filters)
    result.goToPage(1)
  }

  return { ...result, filters: extraFilters, onChangeFilters }
}
