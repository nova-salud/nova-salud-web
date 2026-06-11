import { cn } from '@/shared/utils'
import type { ClinicalHistoryFullResponseDto } from '../types/clinical-history-full-response.dto'

type Props = {
  data: ClinicalHistoryFullResponseDto
}

type ItemProps = {
  label: string
  value: string | null
  className?: string
}

const InfoItem = ({ label, value, className }: ItemProps) => {
  return (
    <div className={cn('rounded-2xl bg-slate-50 px-4 py-3', className)}>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        {value?.trim() ? value : 'No registrado'}
      </p>
    </div>
  )
}

const ClinicalHistoryInfoCard = ({ data }: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Información clínica
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Datos generales y antecedentes registrados en la historia clínica.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoItem label="Grupo sanguíneo" value={data.bloodType} />
        <InfoItem label="Contacto de emergencia" value={data.emergencyContactName} />
        <InfoItem label="Teléfono de emergencia" value={data.emergencyContactPhone} />
        <InfoItem label="Condiciones conocidas" value={data.knownConditions} />
        <InfoItem label="Antecedentes quirúrgicos" value={data.surgicalHistory} />
        <InfoItem label="Antecedentes familiares" value={data.familyHistory} />
        <InfoItem
          label="Observaciones"
          value={data.observations}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default ClinicalHistoryInfoCard