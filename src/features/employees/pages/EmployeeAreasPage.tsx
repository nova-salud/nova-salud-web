import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Select } from '@/shared/components/ui/form'
import { SortOrder } from '@/core/types/query-params.type'
import EmployeeAreaTable from '../components/EmployeeAreaTable'
import { useEmployeeAreas } from '../hooks/use-employee-areas'
import type { FindEmployeeAreasDto } from '../types/find-employee-areas.dto'

const EmployeeAreasPage = () => {
  const [isActive, setIsActive] = useState<string>('')

  const query = useMemo<FindEmployeeAreasDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [isActive])

  const { data, isLoading, error } = useEmployeeAreas(query)

  return (
    <PageContainer
      title="Áreas"
      description="Listado de áreas sincronizadas desde RRHH"
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Registro de áreas
              </p>
              <p className="text-sm text-slate-500">
                Consulta información sincronizada desde RRHH.
              </p>
            </div>

            <div className="w-full md:w-60">
              <Select
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={[
                  { label: 'Todas', value: '' },
                  { label: 'Activas', value: 'true' },
                  { label: 'Inactivas', value: 'false' },
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

        <EmployeeAreaTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default EmployeeAreasPage