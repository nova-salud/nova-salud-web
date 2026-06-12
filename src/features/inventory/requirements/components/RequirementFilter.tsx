import { Input, Select } from '@/shared/components/ui/form'
import { InventoryRequirementStatusEnum } from '../types/inventory-requirement-status.enum'
import type { FindInventoryRequirementsDto } from '../types/find-inventory-requirements.dto'

interface RequirementFilterProps {
  onChangeFilters: (filters: Partial<FindInventoryRequirementsDto>) => void
}

const STATUS_OPTIONS = [
  { label: 'Pendiente', value: InventoryRequirementStatusEnum.PENDING },
  { label: 'Entregado', value: InventoryRequirementStatusEnum.DELIVERED },
  { label: 'Recepción parcial', value: InventoryRequirementStatusEnum.RECEIVED_PARTIAL },
  { label: 'Recepción completa', value: InventoryRequirementStatusEnum.RECEIVED_COMPLETE },
  { label: 'Cancelado', value: InventoryRequirementStatusEnum.CANCELLED },
]

export const RequirementFilter = ({ onChangeFilters }: RequirementFilterProps) => {
  const onKeyChange = (value: string, key: keyof FindInventoryRequirementsDto) =>
    onChangeFilters({ [key]: value === '' ? undefined : value })

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Input
        label="Código"
        name="requestCode"
        type="text"
        placeholder="Buscar por código..."
        onChange={(e) => onKeyChange(e.target.value, 'requestCode')}
      />
      <Input
        label="Solicitante"
        name="requestedByUserName"
        type="text"
        placeholder="Buscar por nombre..."
        onChange={(e) => onKeyChange(e.target.value, 'requestedByUserName')}
      />
      <Input
        label="Despachador"
        name="deliveredByUserName"
        type="text"
        placeholder="Buscar por nombre..."
        onChange={(e) => onKeyChange(e.target.value, 'deliveredByUserName')}
      />
      <Select
        name="status"
        label="Estado"
        options={[
          { label: 'Todos', value: ''},
          ...STATUS_OPTIONS
        ]}
        onChange={(value) => onKeyChange(value, 'status')}
      />
    </div>
  )
}
