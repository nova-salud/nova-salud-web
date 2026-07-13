import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { EntityState, PageContainer } from '@/shared/components'
import { useAuth, useDisclosure, useTabs } from '@/shared/hooks'
import { RoleEnum } from '@/core/enums/role.enum'

import { useClinicalHistory } from '../hooks/useClinicalHistory'
import { useConfirmNoAllergies } from '../hooks/useConfirmNoAllergies'
import ClinicalHistoryHeader from '../components/ClinicalHistoryHeader'
import ClinicalHistoryInfoCard from '../components/ClinicalHistoryInfoCard'
import ClinicalHistoryAllergies from '../components/ClinicalHistoryAllergies'
import { ConfirmNoAllergiesModal } from '../components/ConfirmNoAllergiesModal'
import ClinicalHistoryAttentionsTable from '../components/ClinicalHistoryAttentionsTable'
import AllergyFormSidebar from '../../allergies/components/AllergyFormSidebar'
import { RemoveAllergyModal } from '../../allergies/components'
import { useRemoveAllergy } from '../../allergies/hooks/useRemoveAllergy'
import type { AllergyResponseDto } from '../../allergies/types'
import ClinicalHistoryEmoCycleSection from '../../emo-cycles/components/ClinicalHistoryEmoCycleSection'
import { ClinicalHistoryAccidentsSection } from '@/features/accidents/accidents/components/ClinicalHistoryAccidentsSection'
import { ClinicalHistoryMedicalRestsSection } from '@/features/clinical-histories/medical-rests/components/ClinicalHistoryMedicalRestsSection'
import { cn } from '@/shared/utils'
import ClinicalHistoryDetailSkeleton from '../components/ClinicalHistoryDetailSkeleton'
import { CLINICAL_HISTORY_ROUTES } from '../constants/clinical-history-routes'

type TabId = 'attentions' | 'accidents' | 'medical-rests'

const TABS: { id: TabId; label: string }[] = [
  { id: 'attentions', label: 'Atenciones' },
  { id: 'accidents', label: 'Accidentes / Incidentes' },
  { id: 'medical-rests', label: 'Descansos médicos' },
]

const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const numericEmployeeId = Number(employeeId)
  const isEmployee = user?.role === RoleEnum.EMPLOYEE || user?.role === RoleEnum.EMPLOYEE_EXT

  const { activeTab, activatedTabs, changeTab } = useTabs<TabId>('attentions')
  const { isOpen, open, close } = useDisclosure<'add-allergy' | 'confirm-no-allergies' | 'remove-allergy'>()
  const [allergyToRemove, setAllergyToRemove] = useState<AllergyResponseDto | null>(null)

  const { data, isLoading, error, refetch } = useClinicalHistory(numericEmployeeId)
  const { confirmNoAllergies, isLoading: isConfirmingNoAllergies } = useConfirmNoAllergies()
  const { removeAllergy, isLoading: isRemovingAllergy } = useRemoveAllergy()

  const goToAttentionDetail = (id: number) => navigate(CLINICAL_HISTORY_ROUTES.attentionDetail(numericEmployeeId, id))
  const goToAttentionNew = () => { navigate(CLINICAL_HISTORY_ROUTES.attentionNew(numericEmployeeId)); window.scrollTo(0, 0) }
  const goToEmoCycleDetail = (id: number) => navigate(CLINICAL_HISTORY_ROUTES.emoCycleDetail(numericEmployeeId, id))
  const goToEmoCycleHistory = () => navigate(CLINICAL_HISTORY_ROUTES.emoCycleHistory(numericEmployeeId))
  const goToAccidentDetail = (id: number) => navigate(CLINICAL_HISTORY_ROUTES.accidentDetail(numericEmployeeId, id))
  const goToAccidentNew = () => navigate(CLINICAL_HISTORY_ROUTES.accidentNew(numericEmployeeId))

  const handleConfirmNoAllergies = async () => {
    if (!data) return
    const result = await confirmNoAllergies(data.id)
    if (result) {
      close()
      await refetch()
    }
  }

  const handleOpenRemoveAllergy = (allergy: AllergyResponseDto) => {
    setAllergyToRemove(allergy)
    open('remove-allergy')
  }

  const handleCloseRemoveAllergy = () => {
    close()
    setAllergyToRemove(null)
  }

  const handleConfirmRemoveAllergy = async () => {
    if (!allergyToRemove) return
    await removeAllergy(allergyToRemove.id)
    handleCloseRemoveAllergy()
    await refetch()
  }

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
        <ClinicalHistoryHeader data={data} onEdit={!isEmployee ? () => navigate(`/clinical-histories/${numericEmployeeId}/edit`) : undefined} />

        <ClinicalHistoryInfoCard data={data} />

        <ClinicalHistoryAllergies
          allergies={data.allergies}
          noAllergiesConfirmed={data.noAllergiesConfirmed}
          noAllergiesConfirmedAt={data.noAllergiesConfirmedAt}
          onAdd={!isEmployee ? () => open('add-allergy') : undefined}
          onConfirmNoAllergies={!isEmployee ? () => open('confirm-no-allergies') : undefined}
          onRemove={!isEmployee ? handleOpenRemoveAllergy : undefined}
        />

        <ClinicalHistoryEmoCycleSection
          clinicalHistoryId={data.id}
          onViewHistory={goToEmoCycleHistory}
          onViewDetail={goToEmoCycleDetail}
        />

        <div className="rounded-3xl border-2 border-slate-300 bg-white p-4 shadow-lg">
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
        <>
          <AllergyFormSidebar
            isOpen={isOpen('add-allergy')}
            clinicalHistoryId={data.id}
            onClose={close}
            onSuccess={refetch}
          />

          <ConfirmNoAllergiesModal
            isOpen={isOpen('confirm-no-allergies')}
            isLoading={isConfirmingNoAllergies}
            onClose={close}
            onConfirm={handleConfirmNoAllergies}
          />

          <RemoveAllergyModal
            isOpen={isOpen('remove-allergy')}
            item={allergyToRemove}
            isLoading={isRemovingAllergy}
            onClose={handleCloseRemoveAllergy}
            onConfirm={handleConfirmRemoveAllergy}
          />
        </>
      )}
    </PageContainer>
  )
}

export default ClinicalHistoryDetailPage
