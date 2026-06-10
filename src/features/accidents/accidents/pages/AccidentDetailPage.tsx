import { useNavigate, useParams } from 'react-router'
import { format } from 'date-fns'
import { cn } from '@/shared/utils'
import { useAuth } from '@/shared/hooks'
import { EntityState, PageContainer, Button } from '@/shared/components'
import { RoleEnum } from '@/core/enums/role.enum'
import { AccidentCaseSection, AccidentFollowUpsSection, AccidentInfoSection, AccidentInvestigationSection } from '../../accident-cases/components'
import { ClinicalHistoryMedicalRestsSection } from '@/features/clinical-histories/medical-rests/components/ClinicalHistoryMedicalRestsSection'
import { useAccident, useSendAccidentSummary } from '../hooks'
import { AccidentDetailSkeleton } from '../components/AccidentDetailSkeleton'
import { ACCIDENT_STATUS_CLASSNAME, ACCIDENT_STATUS_LABEL, ACCIDENT_TYPE_CLASSNAME, ACCIDENT_TYPE_LABEL, AccidentStatusEnum } from '../types'

const AccidentDetailPage = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { accidentId: id, employeeId } = useParams()

  const numericId = Number(id)

  const { data: accident, isLoading, error, refetch } = useAccident(numericId)
  const { sendSummary, isLoading: isSending } = useSendAccidentSummary()

  if (isLoading) return <AccidentDetailSkeleton />

  if (error) return (
    <EntityState
      title="Ocurrió un error"
      description="No fue posible obtener la información del accidente."
      actionText="Reintentar"
      onAction={refetch}
    />
  )

  if (!accident) return (
    <EntityState
      title="Accidente no encontrado"
      description="El accidente que intentas consultar no existe o fue eliminado."
      actionText="Volver"
      onAction={() => navigate(-1)}
    />
  )

  const isMedical = user?.role === RoleEnum.OCCUPATIONAL_DOCTOR
  const isHR = user?.role === RoleEnum.HR
  const canEdit = isMedical || isAdmin
  const canSendSummary = isAdmin || isHR

  return (
    <PageContainer
      title={`Accidente #${accident.id}`}
      description="Detalle del accidente registrado."
      action={
        <div className="flex flex-wrap items-center gap-2">
          {canSendSummary && (
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              isLoading={isSending}
              loadingText="Enviando..."
              onClick={() => void sendSummary(accident.id)}
            >
              Enviar resumen por correo
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Accidente #{accident.id}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {accident.occurredAt
                  ? format(new Date(accident.occurredAt), 'dd/MM/yyyy HH:mm')
                  : '-'}
              </p>
            </div>

            <div className="flex gap-2 text-xs">
              <span
                className={cn(
                  'rounded-xl px-3 py-1',
                  ACCIDENT_TYPE_CLASSNAME[accident.type],
                )}
              >
                {ACCIDENT_TYPE_LABEL[accident.type]}
              </span>

              <span
                className={cn(
                  'rounded-xl px-3 py-1',
                  ACCIDENT_STATUS_CLASSNAME[accident.status],
                )}
              >
                {ACCIDENT_STATUS_LABEL[accident.status]}
              </span>
            </div>
          </div>
        </div>

        <AccidentInfoSection
          accident={accident}
          isReadOnly={!canEdit}
          onRefresh={refetch}
        />

        {canEdit && (
          <AccidentFollowUpsSection
            followUps={accident.followUps}
            onCreateAttention={(followUpId) =>
              navigate(
                `/clinical-histories/${employeeId}/attentions/new?followUpId=${followUpId}&accidentId=${accident.id}`
              )
            }
            onViewAttention={(attentionId) =>
              navigate(
                `/clinical-histories/${employeeId}/attentions/${attentionId}`
              )
            }
          />
        )}

        <AccidentInvestigationSection
          accident={accident}
          isReadOnly={!canEdit}
          onRefresh={refetch}
        />

        <AccidentCaseSection
          accident={accident}
          onRefresh={refetch}
          isReadOnly={!canEdit}
        />

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm py-5">
          <ClinicalHistoryMedicalRestsSection
            clinicalHistoryId={accident.clinicalHistoryId}
            accidentId={accident.id}
            isReadOnly={accident.status === AccidentStatusEnum.CLOSED}
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default AccidentDetailPage
