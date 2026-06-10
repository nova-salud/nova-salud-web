import { Input, Select } from '@/shared/components'
import type { FindHealthcareCentersDto } from '../types'

interface HealthcareCenterFilterProps {
  onChangeFilters: (filters: Partial<FindHealthcareCentersDto>) => void
}

export const HealthcareCenterFilter = ({ onChangeFilters }: HealthcareCenterFilterProps) => {

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
      <Input
        label="Nombre"
        name="search"
        type="text"
        placeholder="Buscar por nombre"
        onChange={(e) => {
          const value = e.target.value
          onChangeFilters({ name: value === '' ? undefined : value })
        }}
      />

      <Select
        name='status'
        label="Estado"
        options={[
          { label: 'Todos', value: '' },
          { label: 'Activos', value: 'true' },
          { label: 'Inactivos', value: 'false' },
        ]}
        onChange={(value) => onChangeFilters({ isActive: value === 'value' ? undefined : value === 'true' })}
      />
    </div>
  )
}