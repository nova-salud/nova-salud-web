import { Button } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router'
import { useAccident } from '../hooks/useAccident'
import { ACCIDENT_TYPE_CLASSNAME, ACCIDENT_TYPE_LABEL, ACCIDENT_STATUS_CLASSNAME, ACCIDENT_STATUS_LABEL, AccidentStatusEnum } from '../types'
import { AccidentCaseSection } from '../../accident-cases/components/AccidentCaseSection'
import { AccidentFollowUpsSection } from '../../accident-cases/components/AccidentFollowUpsSection'
import { AccidentDetailSkeleton } from '../components/AccidentDetailSkeleton'
import AccidentInfoSection from '../../accident-cases/components/AccidentInfoSection'
import { AccidentInvestigationSection } from '../../accident-cases/components/AccidentInvestigationSection'
import { ClinicalHistoryMedicalRestsSection } from '@/features/clinical-histories/medical-rests/components/ClinicalHistoryMedicalRestsSection'
import { useAuth } from '@/shared/hooks/useAuth'
import { RoleEnum } from '@/core/enums/role.enum'
import { useSendAccidentSummary } from '../hooks/useSendAccidentSummary'

const AccidentDetailPage = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { accidentId: id, employeeId } = useParams()

  const numericId = Number(id)

  const { data: accident, isLoading, error, refetch } = useAccident(numericId)
  const { sendSummary, isLoading: isSending } = useSendAccidentSummary()

  if (isLoading) return <AccidentDetailSkeleton />
  if (!accident) return <div>No encontrado</div>

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
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

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
