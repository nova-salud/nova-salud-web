import { Input, Select } from '@/shared/components'
import type { FindAllergyTypesDto } from '../types'

type ExtraFilters = Pick<FindAllergyTypesDto, 'search' | 'isActive'>

type Props = {
  onChangeFilters: (filters: Partial<ExtraFilters>) => void
}

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

export const AllergyTypeFilter = ({ onChangeFilters }: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        label="Nombre"
        name="search"
        type="text"
        placeholder="Buscar por nombre"
        onChange={(e) => onChangeFilters({ search: e.target.value })}
      />
      <Select
        name="status"
        label="Estado"
        options={STATUS_OPTIONS}
        onChange={(value) => onChangeFilters({ isActive: value === '' ? undefined : value === 'true' })}
      />
    </div>
  </div>
)
