import { Input, Select } from '@/shared/components'
import { DISPENSE_TYPE_OPTIONS, type FindDispensationsDto } from '../types'

interface DispensationFilterProp {
  onChangeFilters: (filters: Partial<FindDispensationsDto>) => void
}

export const DispensationFilter = ({ onChangeFilters }: DispensationFilterProp) => {

  const onKeyChange = (value: string, key: keyof FindDispensationsDto) => onChangeFilters({ [key]: value === '' ? undefined : value })

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Input
        label="Trabajador"
        name="employeeFullName"
        type="text"
        placeholder="Buscar por nombre..."
        onChange={(e) => onKeyChange(e.target.value, 'employeeFullName')}
      />
      <Select
        label="Tipo"
        name="movementType"
        options={[
          { label: 'Todos', value: ''},
          ...DISPENSE_TYPE_OPTIONS
        ]}
        onChange={(value) => onKeyChange(value, 'dispenseType')}
      />
    </div>
  )
}