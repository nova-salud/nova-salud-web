import { Input } from '@/shared/components'

type Filters = {
  employeeFullName?: string
  dni?: string
  startDateFrom?: string
  startDateTo?: string
}

interface MedicalRestFilterProps {
  filters: Partial<Filters>
  onChangeFilters: (filters: Partial<Filters>) => void
}

export const MedicalRestFilter = ({ filters, onChangeFilters }: MedicalRestFilterProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

        <Input
          name="dni"
          label="DNI"
          type="text"
          placeholder="Buscar por DNI..."
          value={filters.dni ?? ''}
          onChange={(e) =>
            onChangeFilters({ dni: (e.target as HTMLInputElement).value || undefined })
          }
        />

        <Input
          name="startDateFrom"
          label="Inicio desde"
          type="date"
          value={filters.startDateFrom ?? ''}
          onChange={(e) =>
            onChangeFilters({ startDateFrom: (e.target as HTMLInputElement).value || undefined })
          }
        />

        <Input
          name="startDateTo"
          label="Inicio hasta"
          type="date"
          value={filters.startDateTo ?? ''}
          onChange={(e) =>
            onChangeFilters({ startDateTo: (e.target as HTMLInputElement).value || undefined })
          }
        />
      </div>
    </div>
  )
}
