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
    <div className="flex items-start justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-slate-900">{employee.fullName}</p>
        <p className="text-xs text-slate-500">DNI: {employee.dni}</p>
        <p className="text-xs text-slate-500">Área: {employee.area?.name ?? '—'}</p>
        <p className="text-xs text-slate-500">Cargo: {employee.position?.name ?? '—'}</p>
        <p className={isRecent ? 'text-xs font-medium text-red-600' : 'text-xs text-slate-500'}>
          Ingreso: {admissionDate ?? '—'}{isRecent ? ' · Sin cobertura' : ''}
        </p>
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={onClear}
        className="w-auto px-3 py-1.5 text-xs"
      >
        Cambiar trabajador
      </Button>
    </div>
  )
}

export default SelectedEmployeeCard
