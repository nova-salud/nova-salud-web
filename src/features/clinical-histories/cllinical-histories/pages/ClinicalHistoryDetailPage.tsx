import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'

import { useClinicalHistory } from '../hooks/useClinicalHistory'
import ClinicalHistoryHeader from '../components/ClinicalHistoryHeader'
import ClinicalHistoryInfoCard from '../components/ClinicalHistoryInfoCard'
import ClinicalHistoryAllergies from '../components/ClinicalHistoryAllergies'
import ClinicalHistoryAttentionsTable from '../components/ClinicalHistoryAttentionsTable'
import ClinicalHistoryExamsSection from '@/features/clinical-histories/exams/components/ClinicalHistoryExamsSection'
import { useClinicalHistoryExams } from '@/features/clinical-histories/exams/hooks'
import AllergyFormSidebar from '../../allergies/components/AllergyFormSidebar'


const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()

  const numericEmployeeId = Number(employeeId)

  const [isAllergySidebarOpen, setIsAllergySidebarOpen] = useState(false)

  const { data, isLoading, refetch } = useClinicalHistory(numericEmployeeId)
  const {
    data: exams,
    isLoading: isLoadingExams,
    refetch: refetchExams
  } = useClinicalHistoryExams(data?.id ?? 0)


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

        <ClinicalHistoryAllergies allergies={data.allergies} onAdd={onAddAllergy} />


        {isLoadingExams ? <div>Cargando exámenes...</div> : (
          <ClinicalHistoryExamsSection
            exams={exams}
            clinicalHistoryId={data.id}
            onRefresh={refetchExams}
          />
        )}

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