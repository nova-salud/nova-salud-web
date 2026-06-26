import { useState } from 'react'
import { Button, Input, Textarea } from '@/shared/components/ui/form'
import { Sidebar } from '@/shared/components/ui/sidebar/Sidebar'
import { MedicationDispenserSection } from '@/shared/components/dispensation/MedicationDispenserSection'
import type { EmployeeAllergyResponseDto } from '@/features/employees/types/employee-allergy-response.dto'
import type { CreateDispensationItemDto } from '@/features/inventory/dispensations/types/create-dispensation-item.dto'
import { toastService } from '@/core/services/toast.service'

type DispensationDraftItem = { medicationId: number; quantity: number; commercialName: string }

type DraftState = { reason: string; notes: string; items: DispensationDraftItem[] }

export type DispensationFormState = {
  reason: string
  notes: string
  items: CreateDispensationItemDto[]
}

type Props = {
  dispensation: DispensationFormState | null
  onChange: (value: DispensationFormState | null) => void
  allergies?: EmployeeAllergyResponseDto[]
}

const emptyDraft = (): DraftState => ({ reason: '', notes: '', items: [] })

const AttentionDispensationSection = ({ dispensation, onChange, allergies = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState<DraftState>(emptyDraft)
  const [nameMap, setNameMap] = useState<Map<number, string>>(new Map())

  const openSidebar = () => {
    setDraft(
      dispensation
        ? {
            reason: dispensation.reason,
            notes: dispensation.notes,
            items: dispensation.items.map((i) => ({ ...i, commercialName: nameMap.get(i.medicationId) ?? '' })),
          }
        : emptyDraft(),
    )
    setIsOpen(true)
  }

  const handleAdd = (medicationId: number, quantity: number, commercialName: string) => {
    setDraft((prev) => {
      if (prev.items.some((i) => i.medicationId === medicationId)) return prev
      return { ...prev, items: [...prev.items, { medicationId, quantity, commercialName }] }
    })
  }

  const handleRemove = (medicationId: number) => {
    setDraft((prev) => ({ ...prev, items: prev.items.filter((i) => i.medicationId !== medicationId) }))
  }

  const handleConfirm = () => {
    if (!draft.reason.trim()) {
      toastService.error('El motivo de la dispensación es obligatorio.')
      return
    }
    if (!draft.notes.trim()) {
      toastService.error('Las dosis / indicaciones son obligatorias.')
      return
    }
    if (draft.items.length === 0) {
      toastService.error('Debes agregar al menos un medicamento.')
      return
    }
    setNameMap(new Map(draft.items.map((i) => [i.medicationId, i.commercialName])))
    onChange({
      reason: draft.reason,
      notes: draft.notes,
      items: draft.items.map(({ medicationId, quantity }) => ({ medicationId, quantity })),
    })
    setIsOpen(false)
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">Medicina entregada</h2>

        {dispensation ? (
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={openSidebar} className="w-auto">
              Editar
            </Button>
            <Button type="button" variant="error" onClick={() => onChange(null)} className="w-auto">
              Quitar
            </Button>
          </div>
        ) : (
          <Button type="button" variant="secondary" onClick={openSidebar} className="w-auto">
            Registrar
          </Button>
        )}
      </div>

      {dispensation ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-medium text-slate-900">{dispensation.reason}</p>
          {dispensation.notes ? (
            <p className="mt-1 text-xs text-slate-500">{dispensation.notes}</p>
          ) : null}
          {dispensation.items.length > 0 ? (
            <ul className="mt-2 space-y-0.5">
              {dispensation.items.map((item) => (
                <li key={item.medicationId} className="text-xs text-slate-500">
                  · {nameMap.get(item.medicationId) ?? `Medicamento ${item.medicationId}`}
                  <span className="text-slate-400"> ×{item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400">Sin dispensación registrada para esta atención.</p>
      )}

      <Sidebar
        isOpen={isOpen}
        title="Configurar dispensación"
        description="Completa el motivo, indicaciones y los medicamentos a dispensar."
        onClose={() => setIsOpen(false)}
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="w-auto">
              Cancelar
            </Button>
            <Button type="button" onClick={handleConfirm} className="w-auto">
              Confirmar dispensación
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <Input
            name=''
            label="Motivo de la dispensación"
            type="text"
            placeholder="Ej. Tratamiento sintomático"
            value={draft.reason}
            onChange={(e) => setDraft((prev) => ({ ...prev, reason: e.target.value }))}
          />

          <Textarea
            label="Dosis / Indicaciones / Observaciones"
            placeholder="Ej: Paracetamol 1 tab c/8h. Ibuprofeno 400mg c/12h con comida."
            value={draft.notes}
            onChange={(value) => setDraft((prev) => ({ ...prev, notes: value }))}
            rows={3}
          />

          <div className="border-t border-slate-100 pt-5">
            <MedicationDispenserSection
              allergies={allergies}
              items={draft.items}
              onAdd={handleAdd}
              onRemove={handleRemove}
              noCard
            />
          </div>
        </div>
      </Sidebar>
    </div>
  )
}

export default AttentionDispensationSection
