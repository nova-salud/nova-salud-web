import { useMemo, useState } from 'react'
import { SortOrder } from '@/core/types/query-params.type'
import { Select } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useEmployees } from '../hooks/use-employees'
import EmployeeTable from '../components/EmployeeTable'
import type { FindEmployeesDto } from '../types/find-employees.dto'

const EmployeesPage = () => {
  const [isActive, setIsActive] = useState<string>('')

  const query = useMemo<FindEmployeesDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'fullName',
    sortOrder: SortOrder.ASC,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [isActive])

  const { data, isLoading, error } = useEmployees(query)

  return (
    <PageContainer
      title="Colaboradores"
      description="Listado de trabajadores sincronizados desde RRHH"
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Registro de colaboradores
              </p>
              <p className="text-sm text-slate-500">
                Consulta información sincronizada desde RRHH.
              </p>
            </div>

            <div className="w-full md:w-60">
              <Select
                label="Estado"
                value={isActive}
                onChange={(value) => setIsActive(value)}
                options={[
                  { label: 'Todos', value: '' },
                  { label: 'Activos', value: 'true' },
                  { label: 'Inactivos', value: 'false' },
                ]}
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <EmployeeTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default EmployeesPage