import { FilterContainer, Input, Select, DateRangeInput, type DateRangeValue } from '@/shared/components'
import type { EventReportTypeFilter } from '../types/event-report.types'

const TYPE_OPTIONS = [
  { value: 'ALL', label: 'Todos los tipos' },
  { value: 'ATTENTION', label: 'Atención médica' },
  { value: 'ACCIDENT', label: 'Accidente' },
  { value: 'INCIDENT', label: 'Incidente' },
]

type Filters = {
  type?: EventReportTypeFilter
  employeeFullName?: string
  dateFrom?: string
  dateTo?: string
}

interface EventReportFilterProps {
  filters: Partial<Filters>
  onChangeFilters: (filters: Partial<Filters>) => void
}

export const EventReportFilter = ({ filters, onChangeFilters }: EventReportFilterProps) => {
  const handleDateChange = (range: DateRangeValue) => {
    onChangeFilters({
      dateFrom: range.from || undefined,
      dateTo: range.to || undefined,
    })
  }

  return (
    <FilterContainer>
      <div className="grid gap-4 md:grid-cols-3">
        <DateRangeInput
          labelFrom="Fecha desde"
          labelTo="Fecha hasta"
          value={{ from: filters.dateFrom ?? '', to: filters.dateTo ?? '' }}
          onChange={handleDateChange}
        />
        <Select
          name="type"
          label="Tipo de evento"
          value={filters.type ?? 'ALL'}
          options={TYPE_OPTIONS}
          onChange={(value) =>
            onChangeFilters({ type: value === 'ALL' ? undefined : value as EventReportTypeFilter })
          }
        />

        <Input
          name="employeeFullName"
          label="Trabajador"
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.employeeFullName ?? ''}
          onChange={(e) =>
            onChangeFilters({ employeeFullName: (e.target as HTMLInputElement).value || undefined })
          }
        />
      </div>
    </FilterContainer>
  )
}
