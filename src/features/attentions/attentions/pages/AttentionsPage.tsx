import { PageContainer } from '@/shared/components'
import { useAttentions } from '../hooks/useAttentions'
import { AttentionFilter } from '../components/AttentionFilter'
import { AttentionTable } from '../components/AttentionTable'

const AttentionsPage = () => {
  const { data, isLoading, pagination, filters, onChangeFilters } = useAttentions()

  return (
    <PageContainer
      title="Atenciones Médicas"
      description="Lista global de atenciones y consultas registradas."
    >
      <div className="space-y-6">
        <AttentionFilter filters={filters} onChangeFilters={onChangeFilters} />
        <AttentionTable items={data ?? []} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default AttentionsPage
