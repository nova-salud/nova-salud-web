import { cn } from '@/shared/utils'
import { EMO_CONCLUSION_CLASSNAME, EMO_CONCLUSION_LABEL, type ClinicalHistoryEmoCycleResponseDto } from '../types'
import { Button } from '@/shared/components/ui/form'

type Props = {
  cycle: ClinicalHistoryEmoCycleResponseDto
  canEmitConclusion: boolean
  areRequiredExamsCompleted: boolean
}
const EmoCycleConclusionSection = ({ cycle, canEmitConclusion, areRequiredExamsCompleted }: Props) => {
  const doctorConformity = cycle.conformities.find(
    (item) => item.conformityType === 'DOCTOR',
  )

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Conclusión médica
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Resultado emitido por el médico ocupacional para este ciclo EMO.
        </p>
      </div>

      {!areRequiredExamsCompleted ? (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Debes completar todos los exámenes obligatorios antes de emitir la conclusión médica.
        </div>
      ) : null}

      {canEmitConclusion ? (
        <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Ya puedes emitir la conclusión médica para este ciclo EMO.
        </div>
      ) : null}

      {canEmitConclusion ? (
        <div className="mb-4 flex justify-end">
          <Button type="button" className="w-auto">
            Emitir conclusión
          </Button>
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className={cn(
            'rounded-xl px-3 py-1 text-xs font-medium',
            cycle.conclusion ? EMO_CONCLUSION_CLASSNAME[cycle.conclusion] : 'bg-slate-100 text-slate-600',
          )}
        >
          {cycle.conclusion ? EMO_CONCLUSION_LABEL[cycle.conclusion] : 'Pendiente'}
        </span>

        {doctorConformity ? (
          <span className="rounded-xl bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            Firma del doctor registrada
          </span>
        ) : (
          <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Sin firma del doctor
          </span>
        )}
      </div>

      {cycle.conclusion === 'NO_APTO' ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          El trabajador fue declarado no apto. Este estado debe considerarse para bloquear acciones operativas posteriores.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Conclusión
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {cycle.conclusion ? EMO_CONCLUSION_LABEL[cycle.conclusion] : 'Pendiente'}
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

        <div className="rounded-2xl bg-slate-50 px-4 py-3 md:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Médico firmante
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {doctorConformity?.fullName || 'Pendiente'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmoCycleConclusionSection