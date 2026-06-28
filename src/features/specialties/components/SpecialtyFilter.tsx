import { Input, Select } from '@/shared/components'
import type { FindSpecialtiesDto } from '../types'
import type { QueryParams } from '@/core/types/query-params.type'

type ExtraFilters = Omit<FindSpecialtiesDto, keyof QueryParams>

type Props = {
  onChangeFilters: (filters: Partial<ExtraFilters>) => void
}

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

export const SpecialtyFilter = ({ onChangeFilters }: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        label="Nombre de especialidad"
        name="name"
        type="text"
        placeholder="Buscar por nombre de especialidad"
        onChange={(e) => onChangeFilters({ name: e.target.value })}
      />
      <Select
        name="isActive"
        label="Estado"
        options={STATUS_OPTIONS}
        onChange={(value) => onChangeFilters({ isActive: value === '' ? undefined : value === 'true' })}
      />
    </div>
  </div>
)
