import { FilterContainer, Input, Select } from '@/shared/components'
import { ALERT_LABELS, AlertType } from '../types/alert-type.enum'
import { ALERT_PRIORITY_LABELS, AlertPriority } from '../types/alert-priority.enum'
import type { FindAlertsDto } from '../types/find-alerts.dto'

type ExtraFilters = Pick<FindAlertsDto, 'title' | 'employeeName' | 'type' | 'priority' | 'isResolved'>

type Props = {
  onChangeFilters: (filters: Partial<ExtraFilters>) => void
  allowedTypes?: AlertType[]
}

const PRIORITY_OPTIONS = [
  { label: 'Todas las prioridades', value: '' },
  ...Object.values(AlertPriority).map((value) => ({ label: ALERT_PRIORITY_LABELS[value], value })),
]

const STATUS_OPTIONS = [
  { label: 'Solo activas', value: 'false' },
  { label: 'Solo resueltas', value: 'true' },
  { label: 'Todas', value: '' },
]

export const AlertFilter = ({ onChangeFilters, allowedTypes }: Props) => {
  const typeOptions = [
    { label: 'Todos los tipos', value: '' },
    ...Object.values(AlertType)
      .filter((v) => !allowedTypes || allowedTypes.includes(v))
      .map((value) => ({ label: ALERT_LABELS[value], value })),
  ]

  return (
    <FilterContainer>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Input
          label="Título"
          name="title"
          type="text"
          placeholder="Buscar por título"
          onChange={(e) => onChangeFilters({ title: e.target.value })}
        />
        <Input
          label="Empleado"
          name="employeeName"
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => onChangeFilters({ employeeName: e.target.value })}
        />
        <Select
          label="Tipo"
          name="type"
          options={typeOptions}
          onChange={(v) => onChangeFilters({ type: (v as AlertType) || undefined })}
        />
        <Select
          label="Prioridad"
          name="priority"
          options={PRIORITY_OPTIONS}
          onChange={(v) => onChangeFilters({ priority: (v as AlertPriority) || undefined })}
        />
        <Select
          label="Estado"
          name="isResolved"
          options={STATUS_OPTIONS}
          onChange={(v) => onChangeFilters({ isResolved: v === '' ? undefined : v === 'true' })}
        />
      </div>
    </FilterContainer>
  )
}
