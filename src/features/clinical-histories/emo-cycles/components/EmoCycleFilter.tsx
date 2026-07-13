import { FilterContainer, Input, Select } from '@/shared/components'
import type { FindEmoCyclesDto } from '../types/find-emo-cycles.dto'
import { EMO_STATUS_OPTIONS } from '../types/find-emo-cycles.dto'
import { EMO_CYCLE_TYPE_OPTIONS } from '../types/emo-cycle-type.constants'

interface EmoCycleFilterProps {
  filters: Partial<FindEmoCyclesDto>
  onChangeFilters: (filters: Partial<FindEmoCyclesDto>) => void
}

export const EmoCycleFilter = ({ filters, onChangeFilters }: EmoCycleFilterProps) => {
  return (
    <FilterContainer>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="employeeFullName"
          label="Empleado"
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.employeeFullName ?? ''}
          onChange={(e) =>
            onChangeFilters({ employeeFullName: (e.target as HTMLInputElement).value || undefined })
          }
        />

        <Select
          name="status"
          label="Estado"
          value={filters.status ?? ''}
          options={[{ label: 'Todos', value: '' }, ...EMO_STATUS_OPTIONS]}
          onChange={(value) =>
            onChangeFilters({ status: value === '' ? undefined : value as FindEmoCyclesDto['status'] })
          }
        />

        <Select
          name="emoType"
          label="Tipo EMO"
          value={filters.emoType ?? ''}
          options={[{ label: 'Todos', value: '' }, ...EMO_CYCLE_TYPE_OPTIONS]}
          onChange={(value) =>
            onChangeFilters({ emoType: value === '' ? undefined : value })
          }
        />

        <Input
          name="expirationDateFrom"
          label="Vence desde"
          type="date"
          value={filters.expirationDateFrom ?? ''}
          onChange={(e) =>
            onChangeFilters({ expirationDateFrom: (e.target as HTMLInputElement).value || undefined })
          }
        />
      </div>
    </FilterContainer>
  )
}
