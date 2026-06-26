import { Input, SearchSelect, Select } from '@/shared/components'
import type { FindEmployeesDto } from '../types'
import { useSearchAreas } from '@/features/emo-protocols/hooks'
import { useMemo } from 'react'

interface EmployeeFilterProps {
  filters: FindEmployeesDto
  onChangeFilters: (filters: Partial<FindEmployeesDto>) => void
  hasCompanyFilter?: boolean
}

export const EmployeeFilter = ({ onChangeFilters, filters, hasCompanyFilter = false }: EmployeeFilterProps) => {
  const { areas } = useSearchAreas()

  const onKeyChange = (value: string, key: keyof FindEmployeesDto) => onChangeFilters({ [key]: value })

  const onStatusChange = (value: string) => onChangeFilters({
    isActive: value === '' ? undefined : value === 'true'
  })

  const onAreasChange = (value: string) => onChangeFilters({
    areaId: value === '' ? undefined : +value
  })

  const areasToSelect = useMemo(() => areas
    .map(area => ({ label: area.name, value: area.id }))
    , [areas])

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

        {hasCompanyFilter && <Input
          label="Empresa"
          name="company"
          type="text"
          placeholder="Buscar por empresa"
          onChange={(e) => onKeyChange(e.target.value, 'company')}
        />}

        <SearchSelect
          label='Área'
          options={[
            { label: 'Todos', value: '' },
            ...areasToSelect
          ]}
          value={filters.areaId}
          onChange={onAreasChange}
        ></SearchSelect>

        <Select
          name="status"
          label="Estado Laboral"
          options={[
            { label: 'Todos', value: '' },
            { label: 'Activo', value: 'true' },
            { label: 'Baja', value: 'false' }
          ]}
          onChange={(status) => onStatusChange(status)}
        />

      </div>
    </div>
  )
}