import { Button } from '@/shared/components/ui/form'
import type { AllergyResponseDto } from '../../allergies/types'

type Props = {
  allergies: AllergyResponseDto[]
  onAdd: () => void
}

const ClinicalHistoryAllergies = ({
  allergies,
  onAdd,
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Alergias</h2>
          <p className="text-sm text-slate-500">
            Alergias registradas en la historia clínica
          </p>
        </div>

        <Button type="button" className="w-auto" onClick={onAdd}>
          Agregar alergia
        </Button>
      </div>

      {allergies.length === 0 ? (
        <div className="text-sm text-slate-500">
          No hay alergias registradas
        </div>
      ) : (
        <div className="space-y-3">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium text-slate-900">
                  {allergy.medication?.name || 'Medicamento no disponible'}
                </p>

                <p className="text-sm text-slate-600">
                  Reacción: {allergy.reaction || 'No registrada'}
                </p>
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${allergy.isActive
                    ? 'bg-red-100 text-red-700'
                    : 'bg-slate-200 text-slate-600'
                    }`}
                >
                  {allergy.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClinicalHistoryAllergies