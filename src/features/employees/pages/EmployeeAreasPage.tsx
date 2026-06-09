import { PageContainer } from '@/shared/components'
import { useEmployeeAreas } from '../hooks'
import { EmployeeAreaFilter, EmployeeAreaTable } from '../components'

const EmployeeAreasPage = () => {
  const { data: areas, isLoading, error, pagination, onChangeFilters } = useEmployeeAreas()

  return (
    <PageContainer
      title="Posiciones"
      description="Listado de áreas sincronizadas desde RRHH"
    >
      <div className="space-y-5">
        <EmployeeAreaFilter onChangeFilters={onChangeFilters}/>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <EmployeeAreaTable items={areas} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default EmployeeAreasPage