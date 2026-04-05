import { useMemo, useState } from 'react'
import { SortOrder } from '@/core/types/query-params.type'
import type { FindDispensationsDto } from '../types/find-dispensations.dto'
import type { DispenseTypeEnum } from '../types/dispense-type.enum'

type UseDispensationsPageReturn = {
  dispenseType: DispenseTypeEnum | ''
  query: FindDispensationsDto
  handleDispenseTypeChange: (value: string) => void
}

export const useDispensationsPage = (): UseDispensationsPageReturn => {
  const [dispenseType, setDispenseType] = useState<DispenseTypeEnum | ''>('')

  const query = useMemo<FindDispensationsDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'dispensedAt',
    sortOrder: SortOrder.DESC,
    dispenseType: dispenseType || undefined,
  }), [dispenseType])

  const handleDispenseTypeChange = (value: string) => {
    setDispenseType(value as DispenseTypeEnum)
  }

  return {
    dispenseType,
    query,
    handleDispenseTypeChange,
  }
}