import type { EmployeeAllergyResponseDto } from '@/features/employees/types/employee-allergy-response.dto'
import type { CreateDispensationItemDto } from '@/features/inventory/dispensations/types/create-dispensation-item.dto'
import { MedicationDispenserSection } from '@/shared/components/dispensation/MedicationDispenserSection'
import { Input, Textarea } from '@/shared/components/ui/form'

type Props = {
  requiresDispensation: boolean
  onRequiresDispensationChange: (value: boolean) => void
  reason: string
  onReasonChange: (value: string) => void
  notes: string
  onNotesChange: (value: string) => void
  items: CreateDispensationItemDto[]
  onAdd: (medicationId: number, quantity: number, commercialName: string) => void
  onRemove: (medicationId: number) => void
  allergies?: EmployeeAllergyResponseDto[]
}

const DispensationSection = ({
  requiresDispensation,
  onRequiresDispensationChange,
  reason,
  onReasonChange,
  notes,
  onNotesChange,
  items,
  onAdd,
  onRemove,
  allergies = [],
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Dispensación</h2>

      <div className="mt-4 space-y-4">
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="checkbox"
            checked={requiresDispensation}
            onChange={(e) => onRequiresDispensationChange(e.target.checked)}
          />
          <span className="text-sm text-slate-700">Esta atención requiere dispensación</span>
        </label>

        {requiresDispensation ? (
          <div className="space-y-5">
            <Input
              label="Motivo de la dispensación"
              name="dispensationReason"
              type="text"
              placeholder="Ej. Tratamiento sintomático"
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
            />

            <Textarea
              label="Dosis / Indicaciones / Observaciones"
              placeholder="Ej: Paracetamol 1 tab c/8h. Ibuprofeno 400mg c/12h con comida."
              value={notes}
              onChange={onNotesChange}
              rows={3}
            />

            <div className="border-t border-slate-100 pt-5">
              <MedicationDispenserSection
                allergies={allergies}
                items={items}
                onAdd={onAdd}
                onRemove={onRemove}
                noCard
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DispensationSection
