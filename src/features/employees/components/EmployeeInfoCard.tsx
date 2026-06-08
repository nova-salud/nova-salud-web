import { format } from 'date-fns'
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
}

const InfoItem = ({ label, value, className }: InfoItemProps) => (
  <div className={cn('rounded-2xl bg-slate-50 px-4 py-3', className)}>
    <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{label}</p>
    <p className="mt-1 text-sm font-medium text-slate-700">
      {value?.trim() ? value : '—'}
    </p>
  </div>
)

const EmployeeInfoCard = ({ employee, className }: Props) => {
  const birthDate = employee.birthDate
    ? format(new Date(employee.birthDate), 'dd/MM/yyyy')
    : null

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
      <InfoItem label="Teléfono" value={employee.phone} />
      <InfoItem label="Correo personal" value={employee.personalEmail} />
      <InfoItem label="Sexo" value={employee.sex} />
    </div>
  )
}

export default EmployeeInfoCard
