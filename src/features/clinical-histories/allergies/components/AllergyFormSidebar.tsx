import { useState, useMemo } from 'react'
import { SortOrder } from '@/core/types/query-params.type'
import { useStocks } from '@/features/inventory/stocks/hooks/useStocks'
import { useAllergyTypes } from '@/features/clinical-histories/allergy-types/hooks'
import { Select, Textarea, Button } from '@/shared/components/ui/form'
import { SearchSelect } from '@/shared/components/ui/form/SearchSelect'
import { useCreateAllergy } from '../hooks'
import type { FindInventoryStocksDto } from '@/features/inventory/stocks/types/find-inventory-stocks.dto'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'

type Props = {
  isOpen: boolean
  clinicalHistoryId: number
  onClose: () => void
  onSuccess: () => void
}

const STOCKS_QUERY: FindInventoryStocksDto = {
  page: 1,
  pageSize: 100,
  sortBy: 'commercialName',
  sortOrder: SortOrder.ASC,
  isActive: true,
}

const ALLERGY_TYPES_QUERY = {
  page: 1,
  pageSize: 100,
  sortBy: 'name',
  sortOrder: SortOrder.ASC,
  isActive: true,
}

const AllergyFormSidebar = ({ isOpen, clinicalHistoryId, onClose, onSuccess }: Props) => {
  const [medicationId, setMedicationId] = useState('')
  const [allergyTypeId, setAllergyTypeId] = useState('')
  const [reaction, setReaction] = useState('')

  const { data: stocks, isLoading: isLoadingStocks } = useStocks(STOCKS_QUERY)
  const { data: allergyTypes, isLoading: isLoadingTypes } = useAllergyTypes(ALLERGY_TYPES_QUERY)

  const medicationOptions = useMemo(
    () => stocks.map((item) => ({ label: item.commercialName, value: item.medicationId })),
    [stocks],
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
          disabled={isLoadingStocks}
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
