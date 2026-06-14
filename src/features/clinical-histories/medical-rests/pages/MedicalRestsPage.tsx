import { PageContainer } from '@/shared/components'
import { MedicalRestFilter } from '../components/MedicalRestFilter'
import { MedicalRestTable } from '../components/MedicalRestTable'
import { useMedicalRestsList } from '../hooks/useMedicalRestsList'

const MedicalRestsPage = () => {
  const { data, isLoading, pagination, filters, onChangeFilters } = useMedicalRestsList()

  return (
    <PageContainer
      title="Descansos Médicos"
      description="Registro de descansos médicos emitidos"
    >
      <div className="space-y-6">
        <MedicalRestFilter filters={filters} onChangeFilters={onChangeFilters} />
        <MedicalRestTable items={data ?? []} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default MedicalRestsPage
