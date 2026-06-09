import { Input, Select } from '@/shared/components'
import type { FindEmoProtocolsDto } from '../types'

interface EmoProtocolFilterProps {
  onChangeFilters: (filters: Partial<FindEmoProtocolsDto>) => void
}

export const EmoProtocolFilter = ({ onChangeFilters }: EmoProtocolFilterProps) => {

  const onNameChange = (value: string) => onChangeFilters({ name: value })

  const onStatusChange = (value: string) => onChangeFilters({
    isActive: value === '' ? undefined : value === 'true'
  })

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Usuario"
          name="emoProtocolname"
          type="text"
          placeholder="Buscar por usuario"
          onChange={(e) => onNameChange(e.target.value)}
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