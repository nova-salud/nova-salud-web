import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Select } from '@/shared/components/ui/form'
import DispensationTable from '../components/DispensationTable'
import { useDispensationsPage } from '../hooks/useDispensationsPage'
import { useDispensations } from '../hooks/useDispensations'
import { DISPENSE_TYPE_OPTIONS } from '../types/dispense-type.enum'

const DispensationsPage = () => {
  const navigate = useNavigate()
  const { dispenseType, query, handleDispenseTypeChange } = useDispensationsPage()
  const { data, isLoading, error } = useDispensations(query)

  return (
    <PageContainer
      title="Dispensaciones"
      description="Salida de medicamentos del inventario"
      action={
        <Button
          type="button"
          onClick={() => navigate('/dispensations/create')}
          className="w-auto px-4 py-2"
        >
          Nueva dispensación
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Registro de salidas
              </p>
              <p className="text-sm text-slate-500">
                Consulta dispensaciones por tipo y fecha.
              </p>
            </div>

            <div className="w-full md:w-65">
              <Select
                label="Tipo"
                value={dispenseType}
                onChange={handleDispenseTypeChange}
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