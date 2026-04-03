import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import DispensationTable from '../components/DispensationTable'
import { useDispensations } from '../hooks/useDispensations'
import { DispenseTypeEnum } from '../types/dispense-type.enum'
import type { FindDispensationsDto } from '../types/find-dispensations.dto'
import { SortOrder } from '@/core/types/query-params.type'
import { Select } from '@/shared/components/ui/form'

const DISPENSE_TYPE_OPTIONS = [
  { label: 'Atención médica', value: DispenseTypeEnum.ATTENTION },
  { label: 'OTC (Libre)', value: DispenseTypeEnum.OTC },
  { label: 'Emergencia', value: DispenseTypeEnum.EMERGENCY },
  { label: 'Tercero', value: DispenseTypeEnum.THIRD_PARTY },
]

const DispensationsPage = () => {
  const navigate = useNavigate()
  const [dispenseType, setDispenseType] = useState<DispenseTypeEnum | ''>('')

  const query = useMemo<FindDispensationsDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'dispensedAt',
    sortOrder: SortOrder.DESC,
    dispenseType: dispenseType || undefined,
  }), [dispenseType])

  const { data, isLoading, error } = useDispensations(query)

  return (
    <PageContainer
      title="Dispensaciones"
      description="Salida de medicamentos del inventario"
      action={
        <button
          type="button"
          onClick={() => navigate('/dispensations/create')}
          className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
        >
          Nueva dispensación
        </button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Registro de salidas</p>
              <p className="text-sm text-slate-500">Consulta dispensaciones por tipo y fecha.</p>
            </div>

            <div className="w-full md:w-65">
              <Select
                label="Tipo"
                value={dispenseType}
                onChange={(value) => setDispenseType(value as DispenseTypeEnum)}
                options={DISPENSE_TYPE_OPTIONS}
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <DispensationTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default DispensationsPage