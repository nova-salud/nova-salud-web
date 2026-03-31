import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { movementService } from '../services/movement.service'
import type { InventoryMovementResponseDto } from '../types/inventory-movement-response.dto'

type UseMedicationMovementsReturn = {
  data: InventoryMovementResponseDto[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useMedicationMovements = (
  medicationId: number,
): UseMedicationMovementsReturn => {
  const [data, setData] = useState<InventoryMovementResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMovements = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await movementService.findAll({
        page: 1,
        pageSize: 50,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
        medicationId,
      })

      setData(result.data)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener los movimientos del medicamento.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener los movimientos del medicamento.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!Number.isNaN(medicationId)) {
      void fetchMovements()
    }
  }, [medicationId])

  return {
    data,
    isLoading,
    error,
    refetch: fetchMovements,
  }
}