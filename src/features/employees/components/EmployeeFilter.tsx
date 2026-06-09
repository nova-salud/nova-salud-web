import { Input, Select } from '@/shared/components'
import type { FindEmployeesDto } from '../types'

//TODO: Find by area - SearchSelect

interface EmployeeFilterProps {
  onChangeFilters: (filters: Partial<FindEmployeesDto>) => void
}

export const EmployeeFilter = ({ onChangeFilters }: EmployeeFilterProps) => {

  const onKeyChange = (value: string, key: keyof FindEmployeesDto) => onChangeFilters({ [key]: value })

  const onStatusChange = (value: string) => onChangeFilters({
    isActive: value === '' ? undefined : value === 'true'
  })

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          label="Nombre completo"
          name="fullName"
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => onKeyChange(e.target.value, 'fullName')}
        />

        <Input
          label="DNI"
          name="dni"
          type="text"
          placeholder="Buscar por dni"
          onChange={(e) => onKeyChange(e.target.value, 'dni')}
        />

        <Input
          label="Empresa"
          name="company"
          type="text"
          placeholder="Buscar por empresa"
          onChange={(e) => onKeyChange(e.target.value, 'company')}
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