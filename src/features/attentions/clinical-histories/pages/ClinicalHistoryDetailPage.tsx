import { useNavigate, useParams } from 'react-router'
import { useClinicalHistory } from '../hooks/useClinicalHistory'
import PageContainer from '@/shared/components/ui/PageContainer'

import ClinicalHistoryHeader from '../components/ClinicalHistoryHeader'
import ClinicalHistoryInfoCard from '../components/ClinicalHistoryInfoCard'
import ClinicalHistoryAllergies from '../components/ClinicalHistoryAllergies'
import ClinicalHistoryAttentionsTable from '../components/ClinicalHistoryAttentionsTable'
import AllergyFormSidebar from '../../allergies/components/AllergyFormSidebar'
import { useState } from 'react'

const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()

  const numericEmployeeId = Number(employeeId)

  const { data, isLoading, refetch } = useClinicalHistory(numericEmployeeId)
  const [isAllergySidebarOpen, setIsAllergySidebarOpen] = useState(false)

  const handleGoToAttentionDetail = (attentionId: number) => {
    navigate(`/clinical-histories/${numericEmployeeId}/attentions/${attentionId}`)
  }

  const onAddAllergy = () => {
    setIsAllergySidebarOpen(true)
  }

  if (isLoading) return <div>Cargando...</div>
  if (!data) return <div>No encontrado</div>

  return (
    <PageContainer>
      <div className="space-y-6">
        <ClinicalHistoryHeader
          data={data}
          onEdit={() => { }}
          onCreateAttention={() =>
            navigate(`/clinical-histories/${numericEmployeeId}/attentions/new`)
          }
        />

        <ClinicalHistoryInfoCard data={data} />

        <ClinicalHistoryAllergies allergies={data.allergies} onAdd={onAddAllergy}/>

        <ClinicalHistoryAttentionsTable
          attentions={data.attentions}
          onViewDetail={handleGoToAttentionDetail}
        />
      </div>

      <AllergyFormSidebar
        isOpen={isAllergySidebarOpen}
        clinicalHistoryId={data.id}
        onClose={() => setIsAllergySidebarOpen(false)}
        onSuccess={refetch}
      />
    </PageContainer>
  )
}
export default ClinicalHistoryDetailPage