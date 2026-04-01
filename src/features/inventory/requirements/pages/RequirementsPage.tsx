import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Select } from '@/shared/components/ui/form'
import RequirementTable from '../components/RequirementTable'
import { useRequirements } from '../hooks/useRequirements'
import { InventoryRequirementStatusEnum } from '../types/inventory-requirement-status.enum'

const RequirementsPage = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<InventoryRequirementStatusEnum | ''>('')

  const query = useMemo(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'DESC' as const,
    status: status || undefined,
  }), [status])

  const { data, isLoading, error } = useRequirements(query)

  return (
    <PageContainer
      title="Requerimientos"
      description="Solicitudes de compra y recepción de medicamentos"
      action={
        <button
          type="button"
          onClick={() => navigate('/requirements/create')}
          className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
        >
          Nuevo requerimiento
        </button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Gestión de requerimientos</p>
              <p className="text-sm text-slate-500">Visualiza el estado de compra, entrega y recepción.</p>
            </div>

            <div className="w-full md:w-65">
              <Select
                label="Estado"
                value={status}
                onChange={(value) => setStatus(value as InventoryRequirementStatusEnum | '')}
                options={[
                  { label: 'Pendiente', value: InventoryRequirementStatusEnum.PENDING },
                  { label: 'Entregado', value: InventoryRequirementStatusEnum.DELIVERED },
                  { label: 'Recepción parcial', value: InventoryRequirementStatusEnum.RECEIVED_PARTIAL },
                  { label: 'Recepción completa', value: InventoryRequirementStatusEnum.RECEIVED_COMPLETE },
                  { label: 'Cancelado', value: InventoryRequirementStatusEnum.CANCELLED },
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

        <RequirementTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default RequirementsPage