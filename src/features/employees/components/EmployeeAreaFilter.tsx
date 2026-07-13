import { FilterContainer, Input, Select } from '@/shared/components'
import type { FindEmployeeAreasDto } from '../types'

interface EmployeeAreaFilterProps {
  onChangeFilters: (filters: Partial<FindEmployeeAreasDto>) => void
}

export const EmployeeAreaFilter = ({ onChangeFilters }: EmployeeAreaFilterProps) => {

  const onNameChange = (value: string) => onChangeFilters({ name: value })

  const onStatusChange = (value: string) => onChangeFilters({
    isActive: value === '' ? undefined : value === 'true'
  })

  return (
    <FilterContainer>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nombre"
          name="name"
          type="text"
          placeholder="Buscar por usuario"
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