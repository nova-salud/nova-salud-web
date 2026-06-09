import { Input, Select } from '@/shared/components'
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
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
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
    </div>
  )
}