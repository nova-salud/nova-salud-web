import { useMemo, useState } from 'react'
import { DispenseTypeEnum } from '../types/dispense-type.enum'
import type { CreateDispensationDto } from '../types/create-dispensation.dto'
import type { CreateDispensationItemDto } from '../types/create-dispensation-item.dto'

type CreateDispensationFormValues = {
  dispenseType: DispenseTypeEnum
  reason: string
  notes: string
  items: CreateDispensationItemDto[]
}

type UseCreateDispensationFormReturn = {
  values: CreateDispensationFormValues
  canSubmit: boolean
  handleChange: <K extends keyof CreateDispensationFormValues>(
    key: K,
  ) => (value: CreateDispensationFormValues[K]) => void
  handleAddItem: (medicationId: number, quantity: number) => void
  handleRemoveItem: (medicationId: number) => void
  buildDto: (employeeId?: number) => CreateDispensationDto | null
}

const INITIAL_VALUES: CreateDispensationFormValues = {
  dispenseType: DispenseTypeEnum.ATTENTION,
  reason: '',
  notes: '',
  items: [],
}

export const useCreateDispensationForm = (): UseCreateDispensationFormReturn => {
  const [values, setValues] = useState<CreateDispensationFormValues>(INITIAL_VALUES)

  const canSubmit = useMemo<boolean>(() => {
    return values.items.length > 0 && values.reason.trim().length > 0
  }, [values.items.length, values.reason])

  const handleChange =
    <K extends keyof CreateDispensationFormValues>(key: K) =>
    (value: CreateDispensationFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }))
    }

  const handleAddItem = (medicationId: number, quantity: number) => {
    if (!medicationId || quantity <= 0) return

    const exists = values.items.some((item) => item.medicationId === medicationId)
    if (exists) return

    setValues((prev) => ({
      ...prev,
      items: [...prev.items, { medicationId, quantity }],
    }))
  }

  const handleRemoveItem = (medicationId: number) => {
    setValues((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.medicationId !== medicationId),
    }))
  }

  const buildDto = (employeeId?: number): CreateDispensationDto | null => {
    if (!canSubmit) {
      return null
    }

    return {
      dispenseType: values.dispenseType,
      employeeId: employeeId ?? undefined,
      reason: values.reason.trim(),
      notes: values.notes.trim() || undefined,
      items: values.items,
    }
  }

  return {
    values,
    canSubmit,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    buildDto,
  }
}
