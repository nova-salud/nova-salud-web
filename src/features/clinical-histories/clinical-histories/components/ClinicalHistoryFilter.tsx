import { useMemo } from 'react'
import { FilterContainer, Input, Select } from '@/shared/components'
import { useSearchAreas } from '@/features/emo-protocols/hooks'
import type { FindClinicalHistoriesDto } from '../types'

const COMPANY_OPTIONS = [
  { label: 'Todas', value: '' },
  { label: 'Empresa 1', value: 'empresa1' },
  { label: 'Empresa 2', value: 'empresa2' },
]

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

const EMO_CYCLE_STATUS_OPTIONS = [
  { label: 'Todos los ciclos', value: '' },
  { label: 'En progreso', value: 'IN_PROGRESS' },
  { label: 'Pendiente de conclusión', value: 'PENDING_DOCTOR_CONCLUSION' },
  { label: 'Pendiente de conformidad', value: 'PENDING_EMPLOYEE_CONFORMITY' },
  { label: 'Completado', value: 'COMPLETED' },
]

const CONCLUSION_OPTIONS = [
  { label: 'Todas las conclusiones', value: '' },
  { label: 'Apto', value: 'APTO' },
  { label: 'Apto con restricciones', value: 'APTO_CON_RESTRICCIONES' },
  { label: 'No apto', value: 'NO_APTO' },
]

interface ClinicalHistoryFilterProps {
  onChangeFilters: (filters: Partial<FindClinicalHistoriesDto>) => void
}

export const ClinicalHistoryFilter = ({ onChangeFilters }: ClinicalHistoryFilterProps) => {
  const { areas } = useSearchAreas()

  const areaOptions = useMemo(() => [
    { label: 'Todas', value: '' },
    ...areas.map(a => ({ label: a.name, value: String(a.id) })),
  ], [areas])

  const onStatusChange = (value: string) => onChangeFilters({
    isActive: value === '' ? undefined : value === 'true',
  })

  return (
    <FilterContainer>
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          label="Nombre completo"
          name="fullName"
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => onChangeFilters({ fullName: e.target.value })}
        />

        <Input
          label="DNI"
          name="dni"
          type="text"
          placeholder="Buscar por DNI"
          onChange={(e) => onChangeFilters({ dni: e.target.value })}
        />

        <Select
          name="areaId"
          label="Área"
          options={areaOptions}
          onChange={(value) => onChangeFilters({ areaId: value ? Number(value) : undefined })}
        />

        <Select
          name="company"
          label="Empresa"
          options={COMPANY_OPTIONS}
          onChange={(value) => onChangeFilters({ company: value || undefined })}
        />

        <Select
          name="isActive"
          label="Estado historia"
          options={STATUS_OPTIONS}
          onChange={onStatusChange}
        />

        <Select
          name="emoCycleStatus"
          label="Estado ciclo EMO"
          options={EMO_CYCLE_STATUS_OPTIONS}
          onChange={(value) => onChangeFilters({ emoCycleStatus: value || undefined })}
        />

        <Select
          name="conclusion"
          label="Conclusión EMO"
          options={CONCLUSION_OPTIONS}
          onChange={(value) => onChangeFilters({ conclusion: value || undefined })}
        />
      </div>
    </FilterContainer>
  )
}
