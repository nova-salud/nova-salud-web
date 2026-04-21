import type { AllergyResponseDto } from '@/features/clinical-histories/allergies/types'
import { Button } from '@/shared/components/ui/form'

type Props = {
  allergies: AllergyResponseDto[]
  onAdd: () => void
}

const ClinicalHistoryAllergies = ({
  allergies,
  onAdd,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Alergias</h2>
          <p className="text-sm text-slate-500">
            Alergias registradas en la historia clínica.
          </p>
        </div>

        <Button type="button" className="w-auto" onClick={onAdd}>
          Agregar alergia
        </Button>
      </div>

      {allergies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
          No hay alergias registradas.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="rounded-2xl bg-slate-50 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-slate-700">
                  {allergy.medication?.name || 'Medicamento no disponible'}
                </h3>

                <span
                  className={`inline-flex rounded-xl px-3 py-1 text-xs ${allergy.isActive
                      ? 'bg-red-100 text-red-700'
                      : 'bg-slate-200 text-slate-600'
                    }`}
                >
                  {allergy.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              <div className="mt-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Reacción
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {allergy.reaction?.trim() || 'No registrada'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClinicalHistoryAllergies