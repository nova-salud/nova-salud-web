import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import MedicationTable from '../components/MedicationTable'
import { useStocks } from '@/features/inventory/stocks/hooks/useStocks'

const MedicationsPage = () => {
  const [search, setSearch] = useState('')

  const query = useMemo(() => {
    return {
      page: 1,
      pageSize: 10,
      sortBy: 'commercialName',
      sortOrder: 'ASC' as const,
      commercialName: search.trim() || undefined,
    }
  }, [search])

  const { data, isLoading, error } = useStocks(query)

  return (
    <PageContainer
      title="Medicamentos"
      description="Stock consolidado por medicamento"
      action={
        <button
          type="button"
          className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
        >
          Nuevo medicamento
        </button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Catálogo operativo
              </p>
              <p className="text-sm text-slate-500">
                Visualiza medicamentos con su stock actual, categoría y estado.
              </p>
            </div>

            <div className="w-full md:w-[320px]">
              <input
                type="text"
                placeholder="Buscar medicamento..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <MedicationTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default MedicationsPage