import { Select } from '@/shared/components'
import { ACCIDENT_STATUS_OPTIONS } from '../types/accident-status.enum'
import { ACCIDENT_TYPE_OPTIONS } from '../types/accident-type.enum'
import type { FindAccidentsDto } from '../types/find-accidents.dto'

interface AccidentFilterProps {
  onChangeFilters: (filters: Partial<FindAccidentsDto>) => void
}

export const AccidentFilter = ({ onChangeFilters }: AccidentFilterProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <Select
          name="status"
          label="Estado"
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
          options={[
            { label: 'Todos', value: '' },
            ...ACCIDENT_TYPE_OPTIONS,
          ]}
          onChange={(value) =>
            onChangeFilters({ type: value === '' ? undefined : value as FindAccidentsDto['type'] })
          }
        />
      </div>
    </div>
  )
}
