import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import MovementTable from '../components/MovementTable'
import { useMovements } from '../hooks/useMovements'

const MovementsPage = () => {
  const [movementType, setMovementType] = useState('')

  const query = useMemo(() => {
    return {
      page: 1,
      pageSize: 10,
      sortBy: 'createdAt',
      sortOrder: 'DESC' as const,
      movementType: movementType || undefined,
    }
  }, [movementType])

  const { data, isLoading, error } = useMovements(query)

  return (
    <PageContainer
      title="Movimientos"
      description="Trazabilidad de entradas, salidas y ajustes de inventario"
    >
      <div className="space-y-5">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Historial operativo
              </p>
              <p className="text-sm text-slate-500">
                Consulta el historial completo de movimientos del inventario.
              </p>
            </div>

            <div className="w-full md:w-[240px]">
              <select
                value={movementType}
                onChange={(event) => setMovementType(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              >
                <option value="">Todos los tipos</option>
                <option value="IN">Ingreso</option>
                <option value="OUT">Salida</option>
                <option value="ADJUSTMENT">Ajuste</option>
                <option value="ADJUSTMENT_IN">Ajuste entrada</option>
                <option value="ADJUSTMENT_OUT">Ajuste salida</option>
              </select>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <MovementTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default MovementsPage