import { Button } from '@/shared/components/ui/form'
import type { ClinicalHistoryEmoCycleResponseDto } from '../types'
import { cn } from '@/shared/utils'

type Props = {
  cycle: ClinicalHistoryEmoCycleResponseDto
  showEmployeeConformity: boolean
  canEmployeeSign: boolean
}
const EmoCycleConformitySection = ({ cycle, showEmployeeConformity, canEmployeeSign }: Props) => {
  const doctorConformity = cycle.conformities.find(
    (item) => item.conformityType === 'DOCTOR',
  )

  const employeeConformity = cycle.conformities.find(
    (item) => item.conformityType === 'EMPLOYEE',
  )

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Conformidades
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Firmas registradas para este ciclo EMO.
        </p>
      </div>

      {cycle.conclusion === 'NO_APTO' ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No corresponde conformidad del trabajador porque la conclusión médica del ciclo es no apto.
        </div>
      ) : null}

      {canEmployeeSign ? (
        <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Ya puedes registrar la conformidad del trabajador para este ciclo EMO.
        </div>
      ) : null}

      <div className={cn('grid grid-cols-1 gap-4', showEmployeeConformity && 'md:grid-cols-2')}>
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Firma del doctor
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {doctorConformity ? 'Registrada' : 'Pendiente'}
          </p>

          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-700">Nombre:</span>{' '}
              {doctorConformity?.fullName || '—'}
            </p>
            <p>
              <span className="font-medium text-slate-700">Fecha:</span>{' '}
              {doctorConformity?.signedAt
                ? new Date(doctorConformity.signedAt).toLocaleString()
                : '—'}
            </p>
          </div>
        </div>

        {showEmployeeConformity ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Firma del trabajador
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">
              {employeeConformity ? 'Registrada' : 'Pendiente'}
            </p>

            <div className="mt-3 space-y-1 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-700">Nombre:</span>{' '}
                {employeeConformity?.fullName || '—'}
              </p>
              <p>
                <span className="font-medium text-slate-700">Fecha:</span>{' '}
                {employeeConformity?.signedAt
                  ? new Date(employeeConformity.signedAt).toLocaleString()
                  : '—'}
              </p>
            </div>

            {canEmployeeSign ? (
              <div className="mt-4 flex justify-end">
                <Button type="button" className="w-auto">
                  Firmar conformidad
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default EmoCycleConformitySection