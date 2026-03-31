import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { deliveryService } from '../services/delivery.service'
import type { FindInventoryDeliveriesDto } from '../types/find-inventory-deliveries.dto'
import type { InventoryDeliveryResponseDto } from '../types/inventory-delivery-response.dto'

type UseDeliveriesReturn = {
  data: InventoryDeliveryResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useDeliveries = (
  query: FindInventoryDeliveriesDto,
): UseDeliveriesReturn => {
  const [response, setResponse] = useState<PaginatedResponse<InventoryDeliveryResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDeliveries = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await deliveryService.findAll(query)
      setResponse(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener las entregas.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener las entregas.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchDeliveries()
  }, [
    query.page,
    query.pageSize,
    query.sortBy,
    query.sortOrder,
    query.status,
    query.deliveredByUserId,
    query.receivedByUserId,
  ])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchDeliveries,
  }
}