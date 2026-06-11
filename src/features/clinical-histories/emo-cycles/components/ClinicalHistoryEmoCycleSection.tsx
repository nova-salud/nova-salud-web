import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import {
  EMO_CONCLUSION_LABEL,
  EMO_STATUS_CLASSNAME,
  EMO_STATUS_LABEL,
} from '../types'
import { ClinicalHistoryEmoCycleSectionSkeleton } from './ClinicalHistoryEmoCycleSectionSkeleton'
import { useState } from 'react'
import {
  useActiveClinicalHistoryEmoCycle,
  useCreateEmoCycle,
  useGenerateNextEmoCycle,
  useCancelEmoCycle,
} from '../hooks'
import { useAuth } from '@/shared/hooks/useAuth'
import { RoleEnum } from '@/core/enums/role.enum'
import { CreateEmoCycleModal } from './CreateEmoCycleModal'
import { CancelEmoCycleModal } from './CancelEmoCycleModal'
import type { CancelEmoCycleDto } from '../types'

type Props = {
  clinicalHistoryId: number
  onViewHistory?: () => void
  onViewDetail?: (id: number) => void
}

const ClinicalHistoryEmoCycleSection = ({
  clinicalHistoryId,
  onViewHistory,
  onViewDetail,
}: Props) => {
  const { user } = useAuth()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  const { data: cycle, isLoading, error, refetch } = useActiveClinicalHistoryEmoCycle(clinicalHistoryId)

  const { createEmoCycle, isLoading: isCreating } = useCreateEmoCycle()
  const { generateNextEmoCycle, isLoading: isGeneratingNext } = useGenerateNextEmoCycle()
  const { cancelEmoCycle, isLoading: isCancelling } = useCancelEmoCycle()

  const canGenerateEmo = user?.role === RoleEnum.OCCUPATIONAL_DOCTOR || user?.role === RoleEnum.ADMIN

  const isCycleCompleted = cycle?.status === 'COMPLETED'
  const isCycleActive = cycle !== null && cycle !== undefined && cycle.status !== 'COMPLETED' && cycle.status !== 'CANCELLED'

  const handleCreateCycle = async () => {
    if (!clinicalHistoryId) return
    await createEmoCycle(clinicalHistoryId)
    setIsCreateModalOpen(false)
    await refetch()
  }

  const handleGenerateNext = async () => {
    await generateNextEmoCycle(clinicalHistoryId)
    await refetch()
  }

  const handleCancel = async (dto: CancelEmoCycleDto) => {
    if (!cycle) return
    await cancelEmoCycle(cycle.id, dto)
    setIsCancelModalOpen(false)
    await refetch()
  }

  if (isLoading) return <ClinicalHistoryEmoCycleSectionSkeleton />

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Ciclo EMO actual</h2>
          <p className="mt-1 text-sm text-slate-500">
            Estado actual del proceso de evaluación médica ocupacional.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {onViewHistory && (
            <Button type="button" variant="outline" className="w-auto" onClick={onViewHistory}>
              Ver historial EMO
            </Button>
          )}

          {!cycle && canGenerateEmo && (
            <Button type="button" className="w-auto" onClick={() => setIsCreateModalOpen(true)}>
              EMO extraordinario
            </Button>
          )}

          {isCycleCompleted && canGenerateEmo && (
            <Button
              type="button"
              className="w-auto"
              isLoading={isGeneratingNext}
              loadingText="Generando..."
              onClick={() => void handleGenerateNext()}
            >
              Generar siguiente ciclo
            </Button>
          )}

          {isCycleActive && canGenerateEmo && (
            <Button
              type="button"
              variant="error"
              className="w-auto"
              onClick={() => setIsCancelModalOpen(true)}
            >
              Cancelar EMO
            </Button>
          )}

          {cycle && onViewDetail && (
            <Button type="button" className="w-auto" onClick={() => onViewDetail(cycle.id)}>
              Ver detalle
            </Button>
          )}
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error.message}
        </div>
      ) : null}

      {!cycle ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
          No hay un ciclo EMO activo para esta historia clínica.
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('rounded-xl px-3 py-1 text-xs font-medium', EMO_STATUS_CLASSNAME[cycle.status])}>
              {EMO_STATUS_LABEL[cycle.status]}
            </span>

            {cycle.emoType && (
              <span className="rounded-xl bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                {cycle.emoType}
              </span>
            )}

            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {cycle.exams.length} exámenes
            </span>

            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {cycle.conformities.length} conformidades
            </span>
          </div>

          {cycle.status === 'PENDING_EXAM_REVIEW' && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm text-amber-700">
                ⚠ Revisión de exámenes pendiente — Ve al detalle del ciclo para revisar y confirmar los exámenes antes de iniciar el proceso.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Protocolo EMO</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{cycle.emoProtocolName ?? '—'}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Tipo de EMO</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{cycle.emoType ?? '—'}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Conclusión</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {cycle.conclusion ? EMO_CONCLUSION_LABEL[cycle.conclusion] : '—'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fecha de cierre</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {cycle.completedAt
                  ? format(new Date(cycle.completedAt), 'dd/MM/yyyy', { locale: es })
                  : 'Pendiente'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fecha de vencimiento</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {cycle.expirationDate
                  ? format(new Date(cycle.expirationDate), 'dd/MM/yyyy', { locale: es })
                  : '—'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Exámenes completados</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {cycle.exams.filter((e) => e.isCompleted).length} de {cycle.exams.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Firma del doctor</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {cycle.conformities.some((c) => c.conformityType === 'DOCTOR') ? 'Registrada' : 'Pendiente'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Firma del trabajador</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {cycle.conformities.some((c) => c.conformityType === 'EMPLOYEE') ? 'Registrada' : 'Pendiente'}
              </p>
            </div>
          </div>

          {cycle.status === 'CANCELLED' && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-red-400">
                Información de cancelación
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Motivo</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{cycle.cancellationReason ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fecha de cancelación</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {cycle.cancelledAt
                      ? format(new Date(cycle.cancelledAt), 'dd/MM/yyyy HH:mm', { locale: es })
                      : '—'}
                  </p>
                </div>
                {cycle.cancellationNotes && (
                  <div className="md:col-span-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Notas</p>
                    <p className="mt-1 text-sm text-slate-600">{cycle.cancellationNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      <CreateEmoCycleModal
        isOpen={isCreateModalOpen}
        isLoading={isCreating}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreateCycle}
      />

      <CancelEmoCycleModal
        isOpen={isCancelModalOpen}
        isLoading={isCancelling}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancel}
      />
    </div>
  )
}

export default ClinicalHistoryEmoCycleSection
