import { Input, Select } from '@/shared/components'
import type { FindMedicationsDto } from '../types/find-medications.dto'

interface MedicationFilterProps {
  onChangeFilters: (filters: Partial<FindMedicationsDto>) => void
}

export const MedicationFilter = ({ onChangeFilters }: MedicationFilterProps) => {

  const onNameChange = (value: string) => onChangeFilters({ commercialName: value === '' ? undefined : value })

  const onStatusChange = (value: string) => onChangeFilters({
    isActive: value === '' ? undefined : value === 'true'
  })

  const onLowStockChanges = (value: string) => onChangeFilters({
    lowStock: value === '' ? undefined : value === 'true'
  })

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Input
        label="Medicamento"
        name="commercialName"
        type="text"
        placeholder="Buscar por nombre..."
        onChange={(e) => onNameChange(e.target.value)}
      />

      <Select
        name="isActive"
        label="Estado"
        options={[
          { label: 'Todos', value: '' },
          { label: 'Activo', value: 'true' },
          { label: 'Inactivo', value: 'false' },
        ]}
        onChange={(value) => onStatusChange(value)}
      />

      <Select
        name="lowStock"
        label="Stock"
        options={[
          { label: 'Todos', value: '' },
          { label: 'Stock bajo o agotado', value: 'true' },
        ]}
        onChange={(value) => onLowStockChanges(value)}
      />
    </div>
  )
}
