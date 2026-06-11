import { useMemo, useRef, useState } from 'react'
import { useEmployeeAreas } from '@/features/employees/hooks/useEmployeeAreas'
import { useEmployeePositions } from '@/features/employees/hooks/useEmployeePositions'
import { employeeService } from '@/features/employees/services/employee.service'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { Button, Input, SearchSelect } from '@/shared/components/ui/form'
import { DataTable } from '@/shared/components/ui/table/DataTable'

type SearchParams = {
  fullName: string
  dni: string
  areaId: string
  positionId: string
}

const INITIAL_SEARCH: SearchParams = {
  fullName: '',
  dni: '',
  areaId: '',
  positionId: '',
}

type Props = {
  onSelect: (employee: EmployeeResponseDto) => void
}

export const EmployeeSearchSelector = ({ onSelect }: Props) => {
  const { data: areas } = useEmployeeAreas()
  const { data: positions } = useEmployeePositions()

  const [params, setParams] = useState<SearchParams>(INITIAL_SEARCH)
  const [employees, setEmployees] = useState<EmployeeResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const pendingRef = useRef(false)

  const areaOptions = useMemo(
    () => [{ label: 'Todas las áreas', value: '' }, ...areas.map((a) => ({ label: a.name, value: a.id }))],
    [areas],
  )

  const positionOptions = useMemo(
    () => [{ label: 'Todos los cargos', value: '' }, ...positions.map((p) => ({ label: p.name, value: p.id }))],
    [positions],
  )

  const handleChange = (key: keyof SearchParams) => (value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setParams(INITIAL_SEARCH)
    setEmployees([])
  }

  const handleSearch = async () => {
    if (pendingRef.current) return
    pendingRef.current = true
    setIsLoading(true)

    try {
      const result = await employeeService.findAll({
        page: 1,
        pageSize: 15,
        isActive: true,
        fullName: params.fullName.trim() || undefined,
        dni: params.dni.trim() || undefined,
        areaId: params.areaId ? Number(params.areaId) : undefined,
        positionId: params.positionId ? Number(params.positionId) : undefined,
      })
      setEmployees(result.data)
      setHasSearched(true)
    } finally {
      setIsLoading(false)
      pendingRef.current = false
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Buscar trabajador</h3>

        <form
          onSubmit={(e) => { e.preventDefault(); void handleSearch() }}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Nombre / Apellido"
              name="fullName"
              type="text"
              placeholder="Ej: Juan Pérez"
              value={params.fullName}
              onChange={(e) => handleChange('fullName')(e.target.value)}
            />

            <Input
              label="DNI"
              name="dni"
              type="text"
              placeholder="Ej: 12345678"
              value={params.dni}
              onChange={(e) => handleChange('dni')(e.target.value)}
            />

            <SearchSelect
              label="Área"
              value={params.areaId}
              options={areaOptions}
              placeholder="Buscar área..."
              onChange={handleChange('areaId')}
            />

            <SearchSelect
              label="Cargo / Posición"
              value={params.positionId}
              options={positionOptions}
              placeholder="Buscar cargo..."
              onChange={handleChange('positionId')}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleResetFilters}
              className="w-auto px-4 py-2"
            >
              Borrar filtros
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Buscando..."
              className="w-auto px-6 py-2"
            >
              Buscar
            </Button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <DataTable
          data={employees}
          isLoading={isLoading}
          columns={['ID', 'Nombre completo', 'DNI', 'Cargo', 'Área']}
          emptyMessage="No se encontraron trabajadores con los filtros ingresados."
          renderRow={(employee) => (
            <>
              <td className="px-6 py-4 text-sm text-slate-500">{employee.id}</td>
              <td className="px-6 py-4 text-sm text-slate-900">{employee.fullName}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{employee.dni}</td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {employee.position?.name ?? '—'}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {employee.area?.name ?? '—'}
              </td>
            </>
          )}
          renderActions={(employee) => (
            <Button
              type="button"
              variant="secondary"
              onClick={() => onSelect(employee)}
              className="w-auto px-3 py-1.5 text-xs"
            >
              Seleccionar
            </Button>
          )}
        />
      )}
    </div>
  )
}
