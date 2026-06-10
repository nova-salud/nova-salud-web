import { PageContainer } from '@/shared/components'
import MovementTable from '../components/MovementTable'
import { useMovements } from '../hooks/useMovements'
import { MovementFilter } from '../components/MovementFilter'

const MovementsPage = () => {
  const { data, isLoading, error, pagination, onChangeFilters, extraFilters } = useMovements()

  return (
    <PageContainer
      title="Movimientos"
      description="Trazabilidad de entradas, salidas y ajustes de inventario"
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <MovementFilter onChangeFilters={onChangeFilters} filters={extraFilters}/>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <MovementTable items={data} isLoading={isLoading} pagination={pagination} />
        </div>
      </div>
    </PageContainer>
  )
}

export default MovementsPage
