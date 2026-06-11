import { useState, useMemo } from 'react'
import { useAllergyTypes } from '@/features/clinical-histories/allergy-types/hooks'
import { Select, Textarea, Button, SearchSelect, Sidebar } from '@/shared/components'
import { useCreateAllergy, useSearchMedications } from '../hooks'

type Props = {
  isOpen: boolean
  clinicalHistoryId: number
  onClose: () => void
  onSuccess: () => void
}

const AllergyFormSidebar = ({ isOpen, clinicalHistoryId, onClose, onSuccess }: Props) => {
  const [medicationId, setMedicationId] = useState('')
  const [allergyTypeId, setAllergyTypeId] = useState('')
  const [reaction, setReaction] = useState('')

  const { data: medications, isLoading: isLoadingMedications } = useSearchMedications()
  const { data: allergyTypes, isLoading: isLoadingTypes } = useAllergyTypes()

  const medicationOptions = useMemo(
    () => medications.map((item) => ({ label: item.commercialName, value: item.id })),
    [medications],
  )

  const allergyTypeOptions = useMemo(
    () => [
      { label: 'Sin tipo', value: '' },
      ...allergyTypes.map((t) => ({ label: t.name, value: String(t.id) })),
    ],
    [allergyTypes],
  )

  const { createAllergy, isLoading, error } = useCreateAllergy()

  const handleSubmit = async () => {
    if (!medicationId) return

    const result = await createAllergy({
      clinicalHistoryId,
      medicationId: Number(medicationId),
      allergyTypeId: allergyTypeId ? Number(allergyTypeId) : undefined,
      reaction: reaction.trim() || undefined,
    })

    if (!result) return

    setMedicationId('')
    setAllergyTypeId('')
    setReaction('')
    onSuccess()
    onClose()
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar alergia"
      description="Registra una alergia a medicamento para esta historia clínica."
    >
      <div className="flex flex-col gap-4">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <Select
          label="Tipo de alergia"
          name="allergyTypeId"
          value={allergyTypeId}
          onChange={setAllergyTypeId}
          options={allergyTypeOptions}
          disabled={isLoadingTypes}
        />

        <SearchSelect
          label="Medicamento"
          value={medicationId}
          onChange={setMedicationId}
          options={medicationOptions}
          disabled={isLoadingMedications}
          placeholder="Buscar medicamento..."
        />

        <Textarea
          label="Reacción"
          placeholder="Describe la reacción alérgica"
          value={reaction}
          onChange={setReaction}
          rows={4}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => void handleSubmit()}
            isLoading={isLoading}
            loadingText="Guardando..."
            disabled={!medicationId}
          >
            Guardar alergia
          </Button>
        </div>
      </div>
    </Sidebar>
  )
}

export default AllergyFormSidebar
