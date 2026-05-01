import { format } from 'date-fns'
import { ACCIDENT_STATUS_LABEL, ACCIDENT_TYPE_LABEL, type AccidentResponseDto } from '../../accidents/types'

type Props = {
  accident: AccidentResponseDto
}

const AccidentInfoSection: React.FC<Props> = ({ accident }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Información del accidente
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Descripción
          </p>
          <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {accident.description || 'No registrado'}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Tipo
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {ACCIDENT_TYPE_LABEL[accident.type]}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Estado
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {ACCIDENT_STATUS_LABEL[accident.status]}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Fecha
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {accident.occurredAt
              ? format(new Date(accident.occurredAt), 'dd/MM/yyyy HH:mm')
              : '-'}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Derivación
          </p>
          <div className="mt-1 text-sm text-slate-700">
            {accident.requiresExternalReferral
              ? 'Sí'
              : 'No'}
          </div>
        </div>

        {accident.requiresExternalReferral && (
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Centro de salud
            </p>
            <div className="mt-1 text-sm text-slate-700">
              {accident.healthcareCenter?.name || 'No registrado'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccidentInfoSection