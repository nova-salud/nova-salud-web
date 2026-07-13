import { FilterContainer, PageContainer } from '@/shared/components'
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
        <FilterContainer>
          <MovementFilter onChangeFilters={onChangeFilters} filters={extraFilters}/>
        </FilterContainer>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border-2 border-slate-300 bg-white shadow-lg overflow-hidden">
          <MovementTable items={data} isLoading={isLoading} pagination={pagination} />
        </div>
      </div>
    </PageContainer>
  )
}

export default MovementsPage
