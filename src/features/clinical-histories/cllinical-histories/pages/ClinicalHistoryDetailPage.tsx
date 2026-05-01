import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'

import { useClinicalHistory } from '../hooks/useClinicalHistory'
import { useActiveClinicalHistoryEmoCycle } from '@/features/clinical-histories/emo-cycles/hooks'
import ClinicalHistoryHeader from '../components/ClinicalHistoryHeader'
import ClinicalHistoryInfoCard from '../components/ClinicalHistoryInfoCard'
import ClinicalHistoryAllergies from '../components/ClinicalHistoryAllergies'
import ClinicalHistoryAttentionsTable from '../components/ClinicalHistoryAttentionsTable'
import AllergyFormSidebar from '../../allergies/components/AllergyFormSidebar'
import ClinicalHistoryEmoCycleSection from '../../emo-cycles/components/ClinicalHistoryEmoCycleSection'
import { ClinicalHistoryAccidentsSection } from '@/features/accidents/accidents/components/ClinicalHistoryAccidentsSection'
import { cn } from '@/shared/utils'
import ClinicalHistoryDetailSkeleton from '../components/ClinicalHistoryDetailSkeleton'

const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()

  const numericEmployeeId = Number(employeeId)

  const [isAllergySidebarOpen, setIsAllergySidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'attentions' | 'accidents'>('attentions')

  const { data, isLoading, refetch } = useClinicalHistory(numericEmployeeId)

  const {
    data: activeEmoCycle,
    isLoading: isLoadingActiveEmoCycle,
    error: activeEmoCycleError,
  } = useActiveClinicalHistoryEmoCycle(data?.id ?? 0)

  const handleGoToAttentionDetail = (attentionId: number) => {
    navigate(`/clinical-histories/${numericEmployeeId}/attentions/${attentionId}`)
  }

  const handleGoToEmoCycleDetail = (emoCycleId: number) => {
    navigate(`/clinical-histories/${numericEmployeeId}/cycle/${emoCycleId}`)
  }

  const onAddAllergy = () => {
    setIsAllergySidebarOpen(true)
  }

  if (isLoading) return <ClinicalHistoryDetailSkeleton />
  if (!data) return <div>No encontrado</div>

  return (
    <PageContainer>
      <div className="space-y-6">
        <ClinicalHistoryHeader
          data={data}
          onEdit={() => { }}
        />

        <ClinicalHistoryInfoCard data={data} />

        <ClinicalHistoryAllergies
          allergies={data.allergies}
          onAdd={onAddAllergy}
        />

        <ClinicalHistoryEmoCycleSection
          cycle={activeEmoCycle}
          clinicalHistoryId={data.id}
          isLoading={isLoadingActiveEmoCycle}
          error={activeEmoCycleError}
          onViewHistory={() =>
            navigate(`/clinical-histories/${numericEmployeeId}/emo-cycles`)
          }
          onViewDetail={handleGoToEmoCycleDetail}
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex gap-2 border-b border-slate-200">
            <button
              className={cn(
                'px-4 py-2 text-sm font-medium',
                activeTab === 'attentions'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-slate-500'
              )}
              onClick={() => setActiveTab('attentions')}
            >
              Atenciones ({data.attentions.length})
            </button>

            <button
              className={cn(
                'px-4 py-2 text-sm font-medium',
                activeTab === 'accidents'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-slate-500'
              )}
              onClick={() => setActiveTab('accidents')}
            >
              Accidentes ({data.accidents.length})
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'attentions' && (
              <ClinicalHistoryAttentionsTable
                onCreateAttention={() => {
                  navigate(`/clinical-histories/${numericEmployeeId}/attentions/new`)
                  window.scrollTo(0, 0)
                }}
                attentions={data.attentions}
                onViewDetail={handleGoToAttentionDetail}
              />
            )}

            {activeTab === 'accidents' && (
              <ClinicalHistoryAccidentsSection
                items={data.accidents}
                onCreate={() =>
                  navigate(
                    `/clinical-histories/${numericEmployeeId}/accidents/new`
                  )
                }
                onViewDetail={(id) =>
                  navigate(
                    `/clinical-histories/${numericEmployeeId}/accidents/${id}`
                  )
                }
              />
            )}
          </div>
        </div>
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