import { FilterContainer, Input, Select } from '@/shared/components'
import type { FindEmployeePositionsDto } from '../types'

interface EmployeePositionFilterProps {
  onChangeFilters: (filters: Partial<FindEmployeePositionsDto>) => void
}

export const EmployeePositionFilter = ({ onChangeFilters }: EmployeePositionFilterProps) => {

  const onNameChange = (value: string) => onChangeFilters({ name: value })

  const onStatusChange = (value: string) => onChangeFilters({
    isActive: value === '' ? undefined : value === 'true'
  })

  return (
    <FilterContainer>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nombre de la posición / cargo"
          name="name"
          type="text"
          placeholder="Buscar posición / cargo"
          onChange={(e) => onNameChange(e.target.value)}
        />

        <Select
          name="status"
          label="Estado"
          options={[
            { label: 'Todos', value: '' },
            { label: 'Activo', value: 'true' },
            { label: 'Inactivo', value: 'false' }
          ]}
          onChange={(status) => onStatusChange(status)}
        />

      </div>
    </FilterContainer>
  )
}