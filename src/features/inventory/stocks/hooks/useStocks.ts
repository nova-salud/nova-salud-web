import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import { stockService } from '../services/stock.service'
import type { FindInventoryStocksDto } from '../types/find-inventory-stocks.dto'
import type { InventoryStockResponseDto } from '../types/inventory-stock-response.dto'

type UseStocksReturn = {
  data: InventoryStockResponseDto[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useStocks = (query: FindInventoryStocksDto): UseStocksReturn => {
  const [response, setResponse] = useState<PaginatedResponse<InventoryStockResponseDto>>({
    data: [],
    total: 0,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    totalPages: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStocks = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await stockService.findAll(query)
      setResponse(result)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0] ?? 'No se pudo obtener el stock.')
      } else {
        setError(backendError.message ?? 'No se pudo obtener el stock.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchStocks()
  }, [
    query.page,
    query.pageSize,
    query.sortBy,
    query.sortOrder,
    query.commercialName,
    query.genericName,
    query.therapeuticCategoryId,
    query.isOtc,
    query.isActive
  ])

  return {
    data: response.data,
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    isLoading,
    error,
    refetch: fetchStocks,
  }
}