import type { ClinicalHistoryAllergyResponseDto } from '../types/clinical-history-full-response.dto'

type Props = {
  allergies: ClinicalHistoryAllergyResponseDto[]
}

const ClinicalHistoryAllergies = ({ allergies }: Props) => {
  return (
    <div className="rounded-2xl  bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Alergias</h2>
          <p className="text-sm text-muted-foreground">
            Alergias registradas en la historia clínica
          </p>
        </div>
      </div>

      {allergies.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No hay alergias registradas
        </div>
      ) : (
        <div className="space-y-3">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="flex flex-col gap-2 rounded-xl  p-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium">{allergy.allergen}</p>

                {allergy.reaction && (
                  <p className="text-sm text-muted-foreground">
                    Reacción: {allergy.reaction}
                  </p>
                )}

                {allergy.medicationId && (
                  <p className="text-xs text-muted-foreground">
                    Medicamento ID: {allergy.medicationId}
                  </p>
                )}
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs  ${
                    allergy.isActive ? 'bg-red-50' : 'bg-gray-100'
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