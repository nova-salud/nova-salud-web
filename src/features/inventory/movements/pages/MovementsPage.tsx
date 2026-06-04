import { useMemo, useState } from 'react'
import { SortOrder } from '@/core/types/query-params.type'
import { useDebounce } from '@/core/hooks/useDebounce'
import { useStocks } from '@/features/inventory/stocks/hooks/useStocks'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Input, SearchSelect, Select } from '@/shared/components/ui/form'
import { MOVEMENT_TYPE_OPTIONS } from '../types/movement-type.constants'
import { DataTablePagination } from '@/shared/components/ui/table/DataTablePagination'
import MovementTable from '../components/MovementTable'
import { useMovements } from '../hooks/useMovements'

const STOCKS_QUERY = {
  page: 1,
  pageSize: 200,
  sortBy: 'commercialName',
  sortOrder: SortOrder.ASC,
  isActive: true,
}

const MovementsPage = () => {
  const [medicationId, setMedicationId] = useState<string>('')
  const [movementType, setMovementType] = useState('')
  const [performedByUserName, setPerformedByUserName] = useState('')
  const debouncedUserName = useDebounce(performedByUserName, 500)
  const [pageSize, setPageSize] = useState(10)

  const { data: stocks } = useStocks(STOCKS_QUERY)

  const medicationOptions = useMemo(
    () => [
      { label: 'Todos los medicamentos', value: '' },
      ...stocks.map((s) => ({ label: s.commercialName, value: s.medicationId })),
    ],
    [stocks],
  )

  const query = useMemo(() => ({
    pageSize,
    sortBy: 'createdAt',
    sortOrder: 'DESC' as const,
    medicationId: medicationId ? Number(medicationId) : undefined,
    movementType: movementType || undefined,
    performedByUserName: debouncedUserName.trim() || undefined,
  }), [medicationId, movementType, debouncedUserName, pageSize])

  const { data, isLoading, error, page, total, totalPages, goToPage } = useMovements(query)

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize)
      goToPage(1)
    } else {
      goToPage(newPage)
    }
  }

  return (
    <PageContainer
      title="Movimientos"
      description="Trazabilidad de entradas, salidas y ajustes de inventario"
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3">
            <p className="text-sm font-medium text-slate-800">Historial operativo</p>
            <p className="text-sm text-slate-500">Consulta el historial completo de movimientos del inventario.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SearchSelect
              label="Medicamento"
              value={medicationId}
              options={medicationOptions}
              placeholder="Todos los medicamentos"
              onChange={setMedicationId}
            />

            <Select
              label="Tipo"
              name="movementType"
              value={movementType}
              options={MOVEMENT_TYPE_OPTIONS}
              onChange={setMovementType}
            />

            <Input
              label="Registrado por"
              name="performedByUserName"
              type="text"
              placeholder="Buscar por nombre..."
              value={performedByUserName}
              onChange={(e) => setPerformedByUserName(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <MovementTable items={data} isLoading={isLoading} />
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPaginationChange={handlePaginationChange}
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default MovementsPage
