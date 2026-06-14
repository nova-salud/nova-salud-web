import { useNavigate, useParams } from 'react-router'
import { EntityState, PageContainer } from '@/shared/components'
import { useAuth, useDisclosure, useTabs } from '@/shared/hooks'
import { RoleEnum } from '@/core/enums/role.enum'

import { useClinicalHistory } from '../hooks/useClinicalHistory'
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
import { CLINICAL_HISTORY_ROUTES } from '../constants/clinical-history-routes'

type TabId = 'attentions' | 'accidents' | 'medical-rests'

const TABS: { id: TabId; label: string }[] = [
  { id: 'attentions', label: 'Atenciones' },
  { id: 'accidents', label: 'Accidentes' },
  { id: 'medical-rests', label: 'Descansos médicos' },
]

const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const numericEmployeeId = Number(employeeId)
  const isEmployee = user?.role === RoleEnum.EMPLOYEE || user?.role === RoleEnum.EMPLOYEE_EXT

  const { activeTab, activatedTabs, changeTab } = useTabs<TabId>('attentions')
  const { isOpen, open, close } = useDisclosure<'add-allergy'>()

  const { data, isLoading, error, refetch } = useClinicalHistory(numericEmployeeId)

  const goToAttentionDetail = (id: number) => navigate(CLINICAL_HISTORY_ROUTES.attentionDetail(numericEmployeeId, id))
  const goToAttentionNew = () => { navigate(CLINICAL_HISTORY_ROUTES.attentionNew(numericEmployeeId)); window.scrollTo(0, 0) }
  const goToEmoCycleDetail = (id: number) => navigate(CLINICAL_HISTORY_ROUTES.emoCycleDetail(numericEmployeeId, id))
  const goToEmoCycleHistory = () => navigate(CLINICAL_HISTORY_ROUTES.emoCycleHistory(numericEmployeeId))
  const goToAccidentDetail = (id: number) => navigate(CLINICAL_HISTORY_ROUTES.accidentDetail(numericEmployeeId, id))
  const goToAccidentNew = () => navigate(CLINICAL_HISTORY_ROUTES.accidentNew(numericEmployeeId))

  if (isLoading) return <ClinicalHistoryDetailSkeleton />

  if (!data) return (
    <EntityState
      title="Historia clínica no encontrada"
      description="El trabajador no cuenta con una historia clínica registrada."
      actionText="Regresar"
      onAction={() => navigate('/clinical-histories')}
    />
  )

  if (error) return (
    <EntityState
      title="Ocurrió un error"
      description="No fue posible obtener la historia clínica."
      actionText="Reintentar"
      onAction={refetch}
    />
  )

  return (
    <PageContainer>
      <div className="space-y-6">
        <ClinicalHistoryHeader data={data} />

        <ClinicalHistoryInfoCard data={data} />

        <ClinicalHistoryAllergies allergies={data.allergies} onAdd={!isEmployee ? () => open('add-allergy') : undefined} />

        <ClinicalHistoryEmoCycleSection
          clinicalHistoryId={data.id}
          onViewHistory={goToEmoCycleHistory}
          onViewDetail={goToEmoCycleDetail}
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
                onClick={() => changeTab(tab.id)}
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
                  onCreateAttention={!isEmployee ? goToAttentionNew : undefined}
                  onViewDetail={goToAttentionDetail}
                />
              )}
            </div>

            <div className={cn(activeTab !== 'accidents' && 'hidden')}>
              {activatedTabs.has('accidents') && (
                <ClinicalHistoryAccidentsSection
                  clinicalHistoryId={data.id}
                  onCreate={!isEmployee ? goToAccidentNew : undefined}
                  onViewDetail={goToAccidentDetail}
                />
              )}
            </div>

            <div className={cn(activeTab !== 'medical-rests' && 'hidden')}>
              {activatedTabs.has('medical-rests') && (
                <ClinicalHistoryMedicalRestsSection clinicalHistoryId={data.id} isReadOnly={isEmployee} />
              )}
            </div>
          </div>
        </div>
      </div>

      {!isEmployee && (
        <AllergyFormSidebar
          isOpen={isOpen('add-allergy')}
          clinicalHistoryId={data.id}
          onClose={close}
          onSuccess={refetch}
        />
      )}
    </PageContainer>
  )
}

export default ClinicalHistoryDetailPage
