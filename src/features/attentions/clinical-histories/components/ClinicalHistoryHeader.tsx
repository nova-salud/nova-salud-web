import { Button } from '@/shared/components/ui/form'
import type { ClinicalHistoryFullResponseDto } from '../types/clinical-history-full-response.dto'

type Props = {
  data: ClinicalHistoryFullResponseDto
  onEdit?: () => void
  onCreateAttention?: () => void
}

const ClinicalHistoryHeader = ({
  data,
  onEdit,
  onCreateAttention,
}: Props) => {
  return (
    <div className="rounded-2xl  bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Historia clínica #{data.id}
            </h1>
            <p className="text-sm text-muted-foreground">
              Empleado ID: {data.employeeId}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full  px-3 py-1">
              Grupo sanguíneo: {data.bloodType || 'No registrado'}
            </span>

            <span
              className={`rounded-full px-3 py-1  ${
                data.isActive ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              {data.isActive ? 'Activa' : 'Inactiva'}
            </span>

            <span className="rounded-full  px-3 py-1">
              Alergias: {data.allergies.length}
            </span>

            <span className="rounded-full  px-3 py-1">
              Atenciones: {data.attentions.length}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onEdit}>
            Editar historia
          </Button>

          <Button onClick={onCreateAttention}>
            Nueva atención
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ClinicalHistoryHeader