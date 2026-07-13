import { differenceInMonths } from 'date-fns'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { Button } from '../ui/form'

type Props = {
  employee: EmployeeResponseDto
  onClear: () => void
}

const SelectedEmployeeCard = ({ employee, onClear }: Props) => {
  const admissionDate = employee.admissionDate
    ? new Date(employee.admissionDate).toLocaleDateString('es-PE')
    : null

  const isRecent = employee.admissionDate
    ? differenceInMonths(new Date(), new Date(employee.admissionDate)) < 4
    : false

  return (
    <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-semibold text-slate-900">{employee.fullName}</p>

        <Button
          type="button"
          variant="secondary"
          onClick={onClear}
          className="w-auto shrink-0 px-3 py-1.5 text-xs"
        >
          Cambiar trabajador
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">DNI</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{employee.dni ?? '—'}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Área</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{employee.area?.name ?? '—'}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Cargo</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{employee.position?.name ?? '—'}</p>
        </div>

        <div className={isRecent ? 'rounded-2xl border border-red-200 bg-red-50 px-4 py-3' : 'rounded-2xl bg-slate-50 px-4 py-3'}>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Ingreso</p>
          <p className={isRecent ? 'mt-1 text-sm font-medium text-red-600' : 'mt-1 text-sm font-medium text-slate-700'}>
            {admissionDate ?? '—'}{isRecent ? ' · Sin cobertura' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SelectedEmployeeCard
