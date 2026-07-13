import { FilterContainer, Input, Select } from '@/shared/components'
import type { FindTherapeuticCategoriesDto } from '../types/find-therapeutic-categories.dto'
import type { QueryParams } from '@/core/types/query-params.type'

type ExtraFilters = Omit<FindTherapeuticCategoriesDto, keyof QueryParams>

type Props = {
  onChangeFilters: (filters: Partial<ExtraFilters>) => void
}

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

export const TherapeuticCategoryFilter = ({ onChangeFilters }: Props) => (
  <FilterContainer>
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        label="Nombre"
        name="name"
        type="text"
        placeholder="Buscar por nombre"
        onChange={(e) => onChangeFilters({ name: e.target.value })}
      />
      <Select
        name="status"
        label="Estado"
        options={STATUS_OPTIONS}
        onChange={(value) => onChangeFilters({ isActive: value === '' ? undefined : value === 'true' })}
      />
    </div>
  </FilterContainer>
)
