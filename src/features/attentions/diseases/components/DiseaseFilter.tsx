import { Input, Select } from '@/shared/components'
import type { FindDiseasesDto } from '../types'

type ExtraFilters = Pick<FindDiseasesDto, 'code' | 'name' | 'category' | 'isActive'>

type Props = {
  onChangeFilters: (filters: Partial<ExtraFilters>) => void
}

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

export const DiseaseFilter = ({ onChangeFilters }: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Input
        label="Código"
        name="code"
        type="text"
        placeholder="Buscar por código"
        onChange={(e) => onChangeFilters({ code: e.target.value })}
      />
      <Input
        label="Nombre"
        name="name"
        type="text"
        placeholder="Buscar por nombre"
        onChange={(e) => onChangeFilters({ name: e.target.value })}
      />
      <Input
        label="Categoría"
        name="category"
        type="text"
        placeholder="Buscar por categoría"
        onChange={(e) => onChangeFilters({ category: e.target.value })}
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
