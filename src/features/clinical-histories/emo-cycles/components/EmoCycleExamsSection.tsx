import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import type { ClinicalHistoryEmoCycleResponseDto, ClinicalHistoryExamResponseDto } from '../types'

type Props = {
  exams: ClinicalHistoryExamResponseDto[]
  cycle: ClinicalHistoryEmoCycleResponseDto
  onRefresh: () => void
}

const EmoCycleExamsSection = ({
  exams,
}: Props) => {

  const completedCount = exams.filter((e) => e.isCompleted).length

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Exámenes del ciclo
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Completa los exámenes requeridos para continuar el proceso.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {completedCount} de {exams.length} completados
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-medium text-slate-700">
                {exam.examName}
              </h3>

              <span
                className={cn(
                  'rounded-xl px-3 py-1 text-xs font-medium',
                  exam.isCompleted
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700',
                )}
              >
                {exam.isCompleted ? 'Completado' : 'Pendiente'}
              </span>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              {exam.isRequired ? 'Obligatorio' : 'Opcional'}
            </div>

            <div className="mt-2 text-sm text-slate-700">
              {exam.resultNote?.trim() || 'Sin resultado registrado'}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-auto text-xs"
                onClick={() => {
                  // 👉 luego abrimos sidebar
                }}
              >
                {exam.isCompleted ? 'Ver detalle' : 'Completar'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmoCycleExamsSection