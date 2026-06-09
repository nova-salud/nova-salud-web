import { PageContainer } from '@/shared/components'
import { useEmployeePositions } from '../hooks'
import { EmployeePositionFilter, EmployeePositionTable } from '../components'

const EmployeePositionsPage = () => {
  const { data: positions, isLoading, error, pagination, onChangeFilters } = useEmployeePositions()

  return (
    <PageContainer
      title="Posiciones"
      description="Listado de posiciones sincronizadas desde RRHH"
    >
      <div className="space-y-5">
        <EmployeePositionFilter onChangeFilters={onChangeFilters}/>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <EmployeePositionTable items={positions} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default EmployeePositionsPage
