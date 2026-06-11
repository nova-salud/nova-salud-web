import { useNavigate } from 'react-router'
import { PageContainer } from '@/shared/components'
import { ClinicalHistoryFilter, ClinicalHistoryTable } from '../components'
import type { ClinicalHistoryListItemDto } from '../types'
import { useClinicalHistories } from '../hooks'

const ClinicalHistoriesPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, pagination, onChangeFilters } = useClinicalHistories()

  const handleViewDetail = (item: ClinicalHistoryListItemDto) => {
    void navigate(`/clinical-histories/${item.employeeId}`)
  }

  return (
    <PageContainer
      title="Historias Clínicas"
      description="Vista general de todas las historias clínicas registradas."
    >
      <div className="space-y-5">
        <ClinicalHistoryFilter onChangeFilters={onChangeFilters} />

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <ClinicalHistoryTable
          items={data}
          isLoading={isLoading}
          pagination={pagination}
          onViewDetail={handleViewDetail}
        />
      </div>
    </PageContainer>
  )
}

export default ClinicalHistoriesPage
