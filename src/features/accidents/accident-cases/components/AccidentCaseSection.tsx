import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import type { AccidentResponseDto } from '../../accidents/types'
import { useCreateEmployeeRestriction, useLiftRestriction } from '../../employee-restrinctions/hooks'
import { useRegisterDischarge } from '../hooks/useRegisterDischarge'
import { AccidentCaseStatusEnum, AccidentDischargeTypeEnum, ACCIDENT_CASE_STATUS_CLASSNAME, ACCIDENT_CASE_STATUS_LABEL, ACCIDENT_DISCHARGE_TYPE_CLASSNAME, ACCIDENT_DISCHARGE_TYPE_LABEL } from '../types'
import { useParams } from 'react-router'
import { useCloseAccidentCase } from '../hooks/useCloseAccidentCase'
import { useState } from 'react'
import Modal from '@/shared/components/ui/modal/Modal'
import { FollowUpStatusEnum } from '@/features/follow-ups/types/follow-up-status.enum'
import { CloseWithConsentSidebar } from './CloseWithConsentSidebar'

type Props = {
  accident: AccidentResponseDto
  onRefresh: () => void
  isReadOnly: boolean
}

export const AccidentCaseSection = ({
  accident,
  onRefresh,
  isReadOnly
}: Props) => {
  const { employeeId } = useParams()
  const accidentCase = accident.accidentCase

  const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false)
  const [isConsentOpen, setIsConsentOpen] = useState(false)

  const {
    registerDischarge,
    isLoading: isDischarging,
  } = useRegisterDischarge()

  const {
    createRestriction,
    isLoading: isCreatingRestriction,
  } = useCreateEmployeeRestriction()

  const {
    liftRestriction,
    isLoading: isLifting,
  } = useLiftRestriction()

  const {
    closeCase,
    isLoading: isClosing,
  } = useCloseAccidentCase()

  if (!accidentCase) return null

  const restrictions = accidentCase.restrictions ?? []
  const activeRestrictions = restrictions.filter((r) => r.isActive)
  const hasActiveRestrictions = activeRestrictions.length > 0

  const canDischarge = accidentCase.status === AccidentCaseStatusEnum.OPEN
    && accident.followUps.every(
      f => f.status === FollowUpStatusEnum.COMPLETED
    )
  const canCreateRestriction =
    accidentCase.dischargeType ===
    AccidentDischargeTypeEnum.WITH_RESTRICTIONS
    && accidentCase.status !== AccidentCaseStatusEnum.CLOSED

  const canCloseCase =
    accidentCase.dischargeType ===
    AccidentDischargeTypeEnum.WITH_RESTRICTIONS &&
    !hasActiveRestrictions &&
    accidentCase.status !== AccidentCaseStatusEnum.CLOSED

  const canCloseWithConsent = accidentCase.status !== AccidentCaseStatusEnum.CLOSED

  const handleDischarge = async (type: AccidentDischargeTypeEnum) => {
    await registerDischarge(accidentCase.id, {
      dischargeType: type,
    })

    onRefresh()
    return true
  }

  const handleCreateRestriction = async () => {
    const result = await createRestriction({
      accidentCaseId: accidentCase.id,
      employeeId: Number(employeeId ?? 0),
      description: 'Restricción médica temporal',
    })
    if (!result) return
    onRefresh()
  }

  const handleCloseCase = async () => {
    const result = await closeCase(accidentCase.id)
    if (!result) return
    onRefresh()
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className='flex items-center gap-x-2'>
          <h2 className="text-lg font-semibold text-slate-900">
            Estado del caso
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('rounded-xl px-3 py-1 text-xs',
              ACCIDENT_CASE_STATUS_CLASSNAME[accidentCase.status])}>
              {ACCIDENT_CASE_STATUS_LABEL[accidentCase.status]}
            </span>

            <span className={cn('rounded-xl px-3 py-1 text-xs',
              ACCIDENT_DISCHARGE_TYPE_CLASSNAME[
              accidentCase.dischargeType ?? 'NONE'
              ])}>
              {
                ACCIDENT_DISCHARGE_TYPE_LABEL[
                accidentCase.dischargeType ?? 'NONE'
                ]
              }
            </span>

            <span className={cn(
              'rounded-xl px-3 py-1 text-xs',
              accidentCase.isBlocked
                ? 'bg-red-100 text-red-700'
                : 'bg-emerald-100 text-emerald-700'
            )}>
              {accidentCase.isBlocked ? 'Bloqueado' : 'Activo'}
            </span>
          </div>
        </div>

        {!isReadOnly && <div className="flex gap-2 flex-wrap">
          {canCloseWithConsent && (
            <Button
              variant="outline"
              onClick={() => setIsConsentOpen(true)}
            >
              Alta con consentimiento
            </Button>
          )}

          {canDischarge && (
            <Button onClick={() => setIsDischargeModalOpen(true)}>
              Dar alta médica
            </Button>
          )}

          {canCreateRestriction && (
            <Button
              onClick={handleCreateRestriction}
              isLoading={isCreatingRestriction}
              variant="secondary"
            >
              Crear restricción
            </Button>
          )}

          {canCloseCase && (
            <Button
              onClick={handleCloseCase}
              isLoading={isClosing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Dar alta definitiva
            </Button>
          )}
        </div>}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Restricciones
        </h3>

        {restrictions.length === 0 && (
          <p className="text-sm text-slate-500">
            No hay restricciones registradas.
          </p>
        )}

        {restrictions.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">
                {r.description}
              </p>
              <p className="text-xs text-slate-500">
                {r.isActive ? 'Activa' : 'Levantada'}
              </p>
            </div>

            {r.isActive && !isReadOnly && (
              <Button
                variant="outline"
                onClick={async () => {
                  const result = await liftRestriction(r.id)
                  if (result === undefined) return
                  onRefresh()
                }}
                isLoading={isLifting}
              >
                Levantar
              </Button>
            )}
          </div>
        ))}

        {!hasActiveRestrictions &&
          accidentCase.dischargeType ===
          AccidentDischargeTypeEnum.WITH_RESTRICTIONS && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
              Todas las restricciones han sido levantadas. Puedes dar alta definitiva.
            </div>
          )}
      </div>

      {isDischargeModalOpen && (
        <Modal
          isOpen={isDischargeModalOpen}
          title="Registrar alta médica"
          onClose={() => setIsDischargeModalOpen(false)}
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Selecciona el tipo de alta que deseas registrar.
            </p>

            <div className="flex flex-col gap-2">
              <Button
                onClick={async () => {
                  const result = await handleDischarge(
                    AccidentDischargeTypeEnum.WITHOUT_RESTRICTIONS
                  )
                  if (!result) return
                  setIsDischargeModalOpen(false)
                }}
                isLoading={isDischarging}
              >
                Alta sin restricciones
              </Button>

              <Button
                onClick={async () => {
                  const result = await handleDischarge(
                    AccidentDischargeTypeEnum.WITH_RESTRICTIONS
                  )
                  if (!result) return
                  setIsDischargeModalOpen(false)
                }}
                isLoading={isDischarging}
                variant="secondary"
              >
                Alta con restricciones
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <CloseWithConsentSidebar
        isOpen={isConsentOpen}
        onClose={() => setIsConsentOpen(false)}
        accidentCaseId={accidentCase.id}
        onSuccess={onRefresh}
      />
    </div>
  )
}