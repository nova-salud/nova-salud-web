import { cn } from '@/shared/utils'
import type { ClinicalHistoryFullResponseDto } from '../types'
import { Button } from '@/shared/components'
import { useNavigate } from 'react-router'
import { EmployeeInfoCard } from '@/features/employees/components'

type Props = {
  data: ClinicalHistoryFullResponseDto
}

const ClinicalHistoryHeader = ({ data }: Props) => {
  const { employee } = data
  const navigate = useNavigate()

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Historia clínica #{data.id}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Grupo {data.bloodType || '—'}
            </span>

            <span
              className={cn(
                'rounded-xl px-3 py-1 text-xs font-medium',
                data.isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700',
              )}
            >
              {data.isActive ? 'Activa' : 'Inactiva'}
            </span>

            <span className="rounded-xl bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {data.allergies?.length ?? 0} alergias
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="warning" className="w-auto" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </div>

      {employee && <EmployeeInfoCard employee={employee} />}
    </div>
  )
}

export default ClinicalHistoryHeader
