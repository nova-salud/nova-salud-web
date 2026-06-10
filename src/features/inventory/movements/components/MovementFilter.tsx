import { Input, SearchSelect, Select } from '@/shared/components'
import { MOVEMENT_TYPE_OPTIONS } from '../types/movement-type.constants'
import type { FindInventoryMovementsDto } from '../types'
import { useSearchStock } from '../hooks/useSearchStock'
import { useMemo } from 'react'

interface MovementFilterProp {
  filters: FindInventoryMovementsDto
  onChangeFilters: (filters: Partial<FindInventoryMovementsDto>) => void
}

export const MovementFilter = ({ onChangeFilters, filters }: MovementFilterProp) => {
  const { stocks } = useSearchStock()

  const onKeyChange = (value: string, key: keyof FindInventoryMovementsDto) => onChangeFilters({ [key]: value === '' ? undefined : value })

  const medicationOptions = useMemo(
    () => [
      { label: 'Todos los medicamentos', value: '' },
      ...stocks.map((s) => ({ label: s.commercialName, value: s.medicationId })),
    ],
    [stocks],
  )

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <SearchSelect
        label="Medicamento"
        value={filters.medicationId}
        options={medicationOptions}
        placeholder="Todos los medicamentos"
        onChange={(value) => onKeyChange(value, 'medicationId')}
      />

      <Select
        label="Tipo"
        name="movementType"
        options={MOVEMENT_TYPE_OPTIONS}
        onChange={(value) => onKeyChange(value, 'movementType')}
      />

      <Input
        label="Registrado por"
        name="performedByUserName"
        type="text"
        placeholder="Buscar por nombre..."
        onChange={(e) => onKeyChange(e.target.value, 'performedByUserName')}
      />
    </div>
  )
}