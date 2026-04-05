import { useMemo, useState } from 'react'
import { SortOrder } from '@/core/types/query-params.type'
import { useStocks } from '@/features/inventory/stocks/hooks/useStocks'
import type { FindInventoryStocksDto } from '@/features/inventory/stocks/types/find-inventory-stocks.dto'
import { DispenseTypeEnum } from '../types/dispense-type.enum'
import type { CreateDispensationDto } from '../types/create-dispensation.dto'
import type { CreateDispensationItemDto } from '../types/create-dispensation-item.dto'

type MedicationOption = {
  label: string
  value: number
}

type CreateDispensationFormValues = {
  dispenseType: DispenseTypeEnum
  thirdPartyDni: string
  reason: string
  notes: string
  selectedMedicationId: string
  quantity: string
  doseInstruction: string
  observation: string
  items: CreateDispensationItemDto[]
}

type UseCreateDispensationFormReturn = {
  values: CreateDispensationFormValues
  medicationOptions: MedicationOption[]
  canSubmit: boolean
  handleChange: <K extends keyof CreateDispensationFormValues>(
    key: K,
  ) => (value: CreateDispensationFormValues[K]) => void
  handleAddItem: () => void
  handleRemoveItem: (medicationId: number) => void
  buildDto: () => CreateDispensationDto | null
  getMedicationName: (medicationId: number) => string
}

const INITIAL_VALUES: CreateDispensationFormValues = {
  dispenseType: DispenseTypeEnum.ATTENTION,
  thirdPartyDni: '',
  reason: '',
  notes: '',
  selectedMedicationId: '',
  quantity: '1',
  doseInstruction: '',
  observation: '',
  items: [],
}

export const useCreateDispensationForm = (): UseCreateDispensationFormReturn => {
  const [values, setValues] = useState<CreateDispensationFormValues>(INITIAL_VALUES)

  const stocksQuery = useMemo<FindInventoryStocksDto>(() => ({
    page: 1,
    pageSize: 100,
    sortBy: 'commercialName',
    sortOrder: SortOrder.ASC,
    isActive: true,
  }), [])

  const { data: stocks } = useStocks(stocksQuery)

  const medicationOptions = useMemo<MedicationOption[]>(
    () =>
      stocks
        .filter((item) => item.currentStock > 0)
        .map((item) => ({
          label: `${item.commercialName} (stock: ${item.currentStock})`,
          value: item.medicationId,
        })),
    [stocks],
  )

  const medicationNameMap = useMemo<Map<number, string>>(() => {
    return new Map(stocks.map((item) => [item.medicationId, item.commercialName]))
  }, [stocks])

  const canSubmit = useMemo<boolean>(() => {
    return values.items.length > 0 && values.reason.trim().length > 0
  }, [values.items.length, values.reason])

  const handleChange =
    <K extends keyof CreateDispensationFormValues>(key: K) =>
    (value: CreateDispensationFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }))
    }

  const handleAddItem = () => {
    const medicationId = Number(values.selectedMedicationId)
    const quantity = Number(values.quantity)

    if (!medicationId || quantity <= 0) {
      return
    }

    const exists = values.items.some((item) => item.medicationId === medicationId)

    if (exists) {
      return
    }

    setValues((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          medicationId,
          quantity,
          doseInstruction: prev.doseInstruction.trim() || undefined,
          observation: prev.observation.trim() || undefined,
        },
      ],
      selectedMedicationId: '',
      quantity: '1',
      doseInstruction: '',
      observation: '',
    }))
  }

  const handleRemoveItem = (medicationId: number) => {
    setValues((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.medicationId !== medicationId),
    }))
  }

  const buildDto = (): CreateDispensationDto | null => {
    if (!canSubmit) {
      return null
    }

    return {
      dispenseType: values.dispenseType,
      thirdPartyDni:
        values.dispenseType === DispenseTypeEnum.THIRD_PARTY
          ? values.thirdPartyDni.trim() || undefined
          : undefined,
      reason: values.reason.trim(),
      notes: values.notes.trim() || undefined,
      items: values.items,
    }
  }

  const getMedicationName = (medicationId: number): string => {
    return medicationNameMap.get(medicationId) ?? `Medicamento ${medicationId}`
  }

  return {
    values,
    medicationOptions,
    canSubmit,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    buildDto,
    getMedicationName,
  }
}