import { useNavigate } from 'react-router'
import { FilterContainer, PageContainer } from '@/shared/components'
import { useMedications } from '../hooks/useMedications'
import { MedicationFilter, MedicationTable } from '../components'

const MedicationsPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, pagination, onChangeFilters } = useMedications()

  return (
    <PageContainer
      title="Medicamentos"
      description="Catálogo de medicamentos con disponibilidad de stock"
      action={
        <button
          type="button"
          onClick={() => navigate('/medications/new')}
          className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
        >
          Nuevo medicamento
        </button>
      }
    >
      <div className="space-y-5">
        <FilterContainer>
          <MedicationFilter onChangeFilters={onChangeFilters} />
        </FilterContainer>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border-2 border-slate-300 bg-white shadow-lg overflow-hidden">
          <MedicationTable items={data} isLoading={isLoading} pagination={pagination} />
        </div>
      </div>
    </PageContainer>
  )
}

export default MedicationsPage
