import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import DeliveryTable from '../components/DeliveryTable'
import { useDeliveries } from '../hooks/useDeliveries'

const DeliveriesPage = () => {
  const [status, setStatus] = useState('')

  const query = useMemo(() => {
    return {
      page: 1,
      pageSize: 10,
      sortBy: 'deliveryDate',
      sortOrder: 'DESC' as const,
      status: status || undefined,
    }
  }, [status])

  const { data, isLoading, error } = useDeliveries(query)

  return (
    <PageContainer
      title="Entregas"
      description="Registro y control de entregas de inventario"
      action={
        <button
          type="button"
          className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
        >
          Nueva entrega
        </button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Flujo de ingreso
              </p>
              <p className="text-sm text-slate-500">
                Revisa las entregas pendientes, en proceso, completadas o canceladas.
              </p>
            </div>

            <div className="w-full md:w-[240px]">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              >
                <option value="">Todos los estados</option>
                <option value="PENDING">Pendiente</option>
                <option value="IN_PROGRESS">En proceso</option>
                <option value="COMPLETED">Completada</option>
                <option value="CANCELLED">Cancelada</option>
              </select>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <DeliveryTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default DeliveriesPage