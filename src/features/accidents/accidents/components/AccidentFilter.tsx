import { Select } from '@/shared/components'
import { ACCIDENT_STATUS_OPTIONS } from '../types/accident-status.enum'
import { ACCIDENT_TYPE_OPTIONS } from '../types/accident-type.enum'
import { ACCIDENT_SEVERITY_OPTIONS } from '../types/accident-severity.enum'
import { ACCIDENT_FORM_OPTIONS } from '../types/accident-form.enum'
import type { FindAccidentsDto } from '../types/find-accidents.dto'

interface AccidentFilterProps {
  filters?: Partial<FindAccidentsDto>
  onChangeFilters: (filters: Partial<FindAccidentsDto>) => void
}

export const AccidentFilter = ({ filters = {}, onChangeFilters }: AccidentFilterProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <Select
          name="status"
          label="Estado"
          value={filters.status ?? ''}
          options={[
            { label: 'Todos', value: '' },
            ...ACCIDENT_STATUS_OPTIONS,
          ]}
          onChange={(value) =>
            onChangeFilters({ status: value === '' ? undefined : value as FindAccidentsDto['status'] })
          }
        />

        <Select
          name="type"
          label="Tipo"
          value={filters.type ?? ''}
          options={[
            { label: 'Todos', value: '' },
            ...ACCIDENT_TYPE_OPTIONS,
          ]}
          onChange={(value) =>
            onChangeFilters({ type: value === '' ? undefined : value as FindAccidentsDto['type'] })
          }
        />

        <Select
          name="severityClassification"
          label="Severidad"
          value={filters.severityClassification ?? ''}
          options={[
            { label: 'Todas', value: '' },
            ...ACCIDENT_SEVERITY_OPTIONS,
          ]}
          onChange={(value) =>
            onChangeFilters({ severityClassification: value === '' ? undefined : value as FindAccidentsDto['severityClassification'] })
          }
        />

        <Select
          name="formClassification"
          label="Forma"
          value={filters.formClassification ?? ''}
          options={[
            { label: 'Todas', value: '' },
            ...ACCIDENT_FORM_OPTIONS,
          ]}
          onChange={(value) =>
            onChangeFilters({ formClassification: value === '' ? undefined : value as FindAccidentsDto['formClassification'] })
          }
        />
      </div>
    </div>
  )
}
