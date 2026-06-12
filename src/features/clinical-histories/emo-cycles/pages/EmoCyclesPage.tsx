import { PageContainer } from '@/shared/components'
import { useEmoCycles } from '../hooks/useEmoCycles'
import { EmoCycleFilter } from '../components/EmoCycleFilter'
import { EmoCycleTable, type EmoCycleListItem } from '../components/EmoCycleTable'

const EmoCyclesPage = () => {
  const { data, isLoading, pagination, filters, onChangeFilters } = useEmoCycles()

  return (
    <PageContainer
      title="Ciclos EMO"
      description="Lista global de ciclos de evaluación médica ocupacional."
    >
      <div className="space-y-6">
        <EmoCycleFilter filters={filters} onChangeFilters={onChangeFilters} />
        <EmoCycleTable
          items={data as EmoCycleListItem[]}
          isLoading={isLoading}
          pagination={pagination}
        />
      </div>
    </PageContainer>
  )
}

export default EmoCyclesPage
