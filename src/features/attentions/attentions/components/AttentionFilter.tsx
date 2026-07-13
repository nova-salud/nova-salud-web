import { FilterContainer, Input, Select, DateRangeInput, type DateRangeValue } from '@/shared/components'
import type { FindAttentionsParams } from '../services/attention.service'
import { TRIAGE_LEVEL_OPTIONS, type TriageLevelEnum } from '../types/triage.enum'

type ExtraFilters = Pick<FindAttentionsParams, 'employeeFullName' | 'triageLevel' | 'diagnosisCode' | 'createdAtFrom' | 'createdAtTo'>

interface AttentionFilterProps {
  filters: Partial<ExtraFilters>
  onChangeFilters: (filters: Partial<ExtraFilters>) => void
}

export const AttentionFilter = ({ filters, onChangeFilters }: AttentionFilterProps) => {
  const handleDateChange = (range: DateRangeValue) => {
    onChangeFilters({
      createdAtFrom: range.from || undefined,
      createdAtTo: range.to || undefined,
    })
  }

  return (
    <FilterContainer>
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          name="employeeFullName"
          label="Empleado"
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.employeeFullName ?? ''}
          onChange={(e) =>
            onChangeFilters({ employeeFullName: (e.target as HTMLInputElement).value || undefined })
          }
        />

        <Select
          name="triageLevel"
          label="Triage"
          value={filters.triageLevel ?? ''}
          options={[{ label: 'Todos', value: '' }, ...TRIAGE_LEVEL_OPTIONS]}
          onChange={(value) =>
            onChangeFilters({ triageLevel: value === '' ? undefined : value as TriageLevelEnum })
          }
        />

        <Input
          name="diagnosisCode"
          label="Diagnóstico"
          type="text"
          placeholder="Código o nombre..."
          value={filters.diagnosisCode ?? ''}
          onChange={(e) =>
            onChangeFilters({ diagnosisCode: (e.target as HTMLInputElement).value || undefined })
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <DateRangeInput
          labelFrom="Fecha inicio"
          labelTo="Fecha fin"
          value={{ from: filters.createdAtFrom ?? '', to: filters.createdAtTo ?? '' }}
          onChange={handleDateChange}
        />
      </div>
    </FilterContainer>
  )
}
