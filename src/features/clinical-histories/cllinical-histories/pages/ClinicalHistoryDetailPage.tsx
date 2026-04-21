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
import { cn } from '@/shared/utils'
import { EMO_ALERT_STYLES, EMO_ATTENTION_BLOCK_RULES } from '../../emo-cycles/types'

const ClinicalHistoryDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()

  const numericEmployeeId = Number(employeeId)

  const [isAllergySidebarOpen, setIsAllergySidebarOpen] = useState(false)

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

  const emoBlock = activeEmoCycle
    ? EMO_ATTENTION_BLOCK_RULES[activeEmoCycle.status]
    : {
      message: 'No existe un ciclo EMO activo. Debe iniciarse uno antes de registrar atenciones.',
      tone: 'warning' as const,
    }

  const canCreateAttention =
    !!activeEmoCycle &&
    activeEmoCycle.status === 'COMPLETED' &&
    (activeEmoCycle.conclusion === 'APTO' ||
      activeEmoCycle.conclusion === 'APTO_CON_RESTRICCIONES')

  if (isLoading) return <div>Cargando...</div>
  if (!data) return <div>No encontrado</div>

  return (
    <PageContainer>
      <div className="space-y-6">
        <ClinicalHistoryHeader
          data={data}
          canCreateAttention={canCreateAttention}
          onEdit={() => { }}
          onCreateAttention={() =>
            canCreateAttention
              ? () => navigate(`/clinical-histories/${numericEmployeeId}/attentions/new`)
              : undefined
          }
        />

        <ClinicalHistoryInfoCard data={data} />

        <ClinicalHistoryAllergies allergies={data.allergies} onAdd={onAddAllergy} />

        <ClinicalHistoryEmoCycleSection
          cycle={activeEmoCycle}
          isLoading={isLoadingActiveEmoCycle}
          error={activeEmoCycleError}
          onViewHistory={() => navigate(`/clinical-histories/${numericEmployeeId}/emo-cycles`)}
          onViewDetail={handleGoToEmoCycleDetail}
        />

        {emoBlock ? (
          <div
            className={cn(
              'rounded-2xl border px-4 py-3 text-sm',
              EMO_ALERT_STYLES[emoBlock.tone],
            )}
          >
            {emoBlock.message}
          </div>
        ) : null}

        {canCreateAttention && (
          <ClinicalHistoryAttentionsTable
            attentions={data.attentions}
            onViewDetail={handleGoToAttentionDetail}
          />
        )}
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