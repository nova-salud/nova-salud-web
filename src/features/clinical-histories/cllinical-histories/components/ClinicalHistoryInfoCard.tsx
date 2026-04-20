import type { ClinicalHistoryFullResponseDto } from '../types/clinical-history-full-response.dto'

type Props = {
  data: ClinicalHistoryFullResponseDto
}

type ItemProps = {
  label: string
  value: string | null
}

const InfoItem = ({ label, value }: ItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="min-h-10 rounded-xl border border-black/25 bg-background px-3 py-2 text-sm">
        {value?.trim() ? value : 'No registrado'}
      </div>
    </div>
  )
}

const ClinicalHistoryInfoCard = ({ data }: Props) => {
  return (
    <div className="rounded-2xl  bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Información clínica</h2>
        <p className="text-sm text-muted-foreground">
          Datos generales y antecedentes registrados en la historia clínica.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoItem label="Grupo sanguíneo" value={data.bloodType} />
        <InfoItem
          label="Contacto de emergencia"
          value={data.emergencyContactName}
        />
        <InfoItem
          label="Teléfono de emergencia"
          value={data.emergencyContactPhone}
        />
        <InfoItem label="Condiciones conocidas" value={data.knownConditions} />
        <InfoItem label="Antecedentes quirúrgicos" value={data.surgicalHistory} />
        <InfoItem label="Antecedentes familiares" value={data.familyHistory} />
      </div>

      <div className="mt-4">
        <InfoItem label="Observaciones" value={data.observations} />
      </div>
    </div>
  )
}

export default ClinicalHistoryInfoCard