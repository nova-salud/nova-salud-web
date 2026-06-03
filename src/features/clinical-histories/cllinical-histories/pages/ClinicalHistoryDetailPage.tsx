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
import { ClinicalHistoryMedicalRestsSection } from '@/features/clinical-histories/medical-rests/components/ClinicalHistoryMedicalRestsSection'
import { cn } from '@/shared/utils'
import ClinicalHistoryDetailSkeleton from '../components/ClinicalHistoryDetailSkeleton'

type TabId = 'attentions' | 'accidents' | 'medical-rests'

const TABS: { id: TabId; label: string }[] = [
  { id: 'attentions', label: 'Atenciones' },
  { id: 'accidents', label: 'Accidentes' },
  { id: 'medical-rests', label: 'Descansos médicos' },
]

const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()

  const numericEmployeeId = Number(employeeId)

  const [isAllergySidebarOpen, setIsAllergySidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('attentions')
  const [activatedTabs, setActivatedTabs] = useState<Set<TabId>>(new Set(['attentions']))

  const { data, isLoading, refetch } = useClinicalHistory(numericEmployeeId)

  const {
    data: activeEmoCycle,
    isLoading: isLoadingActiveEmoCycle,
    error: activeEmoCycleError,
  } = useActiveClinicalHistoryEmoCycle(data?.id ?? 0)

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab)
    setActivatedTabs((prev) => new Set([...prev, tab]))
  }

  const handleGoToAttentionDetail = (attentionId: number) => {
    navigate(`/clinical-histories/${numericEmployeeId}/attentions/${attentionId}`)
  }

  const handleGoToEmoCycleDetail = (emoCycleId: number) => {
    navigate(`/clinical-histories/${numericEmployeeId}/cycle/${emoCycleId}`)
  }

  if (isLoading) return <ClinicalHistoryDetailSkeleton />
  if (!data) return <div>No encontrado</div>

  return (
    <PageContainer>
      <div className="space-y-6">
        <ClinicalHistoryHeader data={data} onEdit={() => { }} />

        <ClinicalHistoryInfoCard data={data} />

        <ClinicalHistoryAllergies allergies={data.allergies} onAdd={() => setIsAllergySidebarOpen(true)} />

        <ClinicalHistoryEmoCycleSection
          cycle={activeEmoCycle}
          clinicalHistoryId={data.id}
          isLoading={isLoadingActiveEmoCycle}
          error={activeEmoCycleError}
          onViewHistory={() => navigate(`/clinical-histories/${numericEmployeeId}/emo-cycles`)}
          onViewDetail={handleGoToEmoCycleDetail}
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex gap-2 border-b border-slate-200">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={cn(
                  'px-4 py-2 text-sm font-medium',
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-500',
                )}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div className={cn(activeTab !== 'attentions' && 'hidden')}>
              {activatedTabs.has('attentions') && (
                <ClinicalHistoryAttentionsTable
                  clinicalHistoryId={data.id}
                  onCreateAttention={() => {
                    navigate(`/clinical-histories/${numericEmployeeId}/attentions/new`)
                    window.scrollTo(0, 0)
                  }}
                  onViewDetail={handleGoToAttentionDetail}
                />
              )}
            </div>

            <div className={cn(activeTab !== 'accidents' && 'hidden')}>
              {activatedTabs.has('accidents') && (
                <ClinicalHistoryAccidentsSection
                  clinicalHistoryId={data.id}
                  onCreate={() => navigate(`/clinical-histories/${numericEmployeeId}/accidents/new`)}
                  onViewDetail={(id) => navigate(`/clinical-histories/${numericEmployeeId}/accidents/${id}`)}
                />
              )}
            </div>

            <div className={cn(activeTab !== 'medical-rests' && 'hidden')}>
              {activatedTabs.has('medical-rests') && (
                <ClinicalHistoryMedicalRestsSection clinicalHistoryId={data.id} />
              )}
            </div>
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
