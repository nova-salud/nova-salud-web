import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import { EMO_CONCLUSION_LABEL, EMO_STATUS_CLASSNAME, EMO_STATUS_LABEL, type ClinicalHistoryEmoCycleResponseDto } from '../types'
import { ClinicalHistoryEmoCycleSectionSkeleton } from './ClinicalHistoryEmoCycleSectionSkeleton'

type Props = {
  cycle: ClinicalHistoryEmoCycleResponseDto | null
  isLoading?: boolean
  error?: string | null
  onViewHistory?: () => void
  onViewDetail?: (id: number) => void
}

const ClinicalHistoryEmoCycleSection = ({
  cycle,
  isLoading = false,
  error = null,
  onViewHistory,
  onViewDetail
}: Props) => {

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

        <div className="flex gap-2">
          {onViewHistory && (
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={onViewHistory}
            >
              Ver historial EMO
            </Button>
          )}

          {cycle && onViewDetail && (
            <Button
              type="button"
              className="w-auto"
              onClick={() => onViewDetail(cycle.id)}
            >
              Ver detalle
            </Button>
          )}
        </div>
      </div>
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {!cycle ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
          No hay un ciclo EMO activo para esta historia clínica.
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'rounded-xl px-3 py-1 text-xs font-medium',
                EMO_STATUS_CLASSNAME[cycle.status],
              )}
            >
              {EMO_STATUS_LABEL[cycle.status]}
            </span>

            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {cycle.exams.length} exámenes
            </span>

            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {cycle.conformities.length} conformidades
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Inicio del ciclo
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {cycle.startedAt
                  ? format(new Date(cycle.startedAt), 'dd/MM/yyyy', { locale: es })
                  : 'No registrado'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Cierre del ciclo
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {cycle.completedAt
                  ? format(new Date(cycle.completedAt), 'dd/MM/yyyy', { locale: es })
                  : 'Pendiente'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Conclusión
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {cycle.conclusion ? EMO_CONCLUSION_LABEL[cycle.conclusion] : '-'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Restricciones
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {cycle.restrictions?.trim() || 'No registradas'}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Exámenes completados
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  {cycle.exams.filter((exam) => exam.isCompleted).length} de {cycle.exams.length}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Firma del doctor
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  {cycle.conformities.some((item) => item.conformityType === 'DOCTOR')
                    ? 'Registrada'
                    : 'Pendiente'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Firma del trabajador
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  {cycle.conformities.some((item) => item.conformityType === 'EMPLOYEE')
                    ? 'Registrada'
                    : 'Pendiente'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClinicalHistoryEmoCycleSection