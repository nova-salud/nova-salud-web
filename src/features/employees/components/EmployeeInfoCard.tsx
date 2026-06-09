import { differenceInMonths, format } from 'date-fns'
import { cn } from '@/shared/utils'
import type { EmployeeResponseDto } from '../types/employee-response.dto'

type Props = {
  employee: EmployeeResponseDto
  className?: string
}

type InfoItemProps = {
  label: string
  value: string | null | undefined
  className?: string
  highlight?: boolean
}

const InfoItem = ({ label, value, className, highlight = false }: InfoItemProps) => (
  <div className={cn('rounded-2xl bg-slate-50 px-4 py-3', highlight && 'border border-red-200 bg-red-50', className)}>
    <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{label}</p>
    <p className={cn('mt-1 text-sm font-medium', highlight ? 'text-red-600' : 'text-slate-700')}>
      {value?.trim() ? value : '—'}
    </p>
  </div>
)

export const EmployeeInfoCard = ({ employee, className }: Props) => {
  const birthDate = employee.birthDate
    ? format(new Date(employee.birthDate), 'dd/MM/yyyy')
    : null

  const admissionDate = employee.admissionDate
    ? format(new Date(employee.admissionDate), 'dd/MM/yyyy')
    : null

  const isRecent = employee.admissionDate
    ? differenceInMonths(new Date(), new Date(employee.admissionDate)) < 4
    : false

  return (
    <div className={cn('grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4', className)}>
      <InfoItem label="Nombre completo" value={employee.fullName} />
      <InfoItem label="DNI" value={employee.dni} />
      <InfoItem label="Empresa" value={employee.company} />
      <InfoItem label="Área" value={employee.area?.name} />
      <InfoItem label="Puesto" value={employee.position?.name} />
      <InfoItem label="Jefe inmediato" value={employee.immediateBoss} />
      <InfoItem label="Estado laboral" value={employee.employmentStatus} />
      <InfoItem label="Fecha de nacimiento" value={birthDate} />
      <InfoItem label="Fecha de ingreso" value={admissionDate} highlight={isRecent} />
      <InfoItem label="Teléfono" value={employee.phone} />
      <InfoItem label="Correo personal" value={employee.personalEmail} />
      <InfoItem label="Sexo" value={employee.sex} />
    </div>
  )
}
