import { useNavigate } from 'react-router'
import { Button, PageContainer } from '@/shared/components'
import { useDispensations } from '../hooks'
import DispensationTable from '../components/DispensationTable'
import { DispensationFilter } from '../components'

const DispensationsPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, pagination, onChangeFilters } = useDispensations()

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
          <DispensationFilter onChangeFilters={onChangeFilters}></DispensationFilter>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <DispensationTable items={data} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default DispensationsPage