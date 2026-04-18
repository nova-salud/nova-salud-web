import { useParams } from 'react-router'
import { useClinicalHistory } from '../hooks/useClinicalHistory'
import PageContainer from '@/shared/components/ui/PageContainer'

import ClinicalHistoryHeader from '../components/ClinicalHistoryHeader'
import ClinicalHistoryInfoCard from '../components/ClinicalHistoryInfoCard'
import ClinicalHistoryAllergies from '../components/ClinicalHistoryAllergies'
import ClinicalHistoryAttentionsTable from '../components/ClinicalHistoryAttentionsTable'

const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()

  const { data, isLoading } = useClinicalHistory(Number(employeeId))

  if (isLoading) return <div>Cargando...</div>
  if (!data) return <div>No encontrado</div>

  return (
    <PageContainer>
      <div className="space-y-6">
        <ClinicalHistoryHeader
          data={data}
          onEdit={() => { }}
          onCreateAttention={() => { }}
        />

        <ClinicalHistoryInfoCard data={data} />

        <ClinicalHistoryAllergies allergies={data.allergies} />

        <ClinicalHistoryAttentionsTable attentions={data.attentions} />
      </div>
    </PageContainer>
  )
}

export default ClinicalHistoryDetailPage