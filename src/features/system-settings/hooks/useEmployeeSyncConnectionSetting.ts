import { useCallback, useEffect, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeSyncConnectionSettingService } from '../services/employee-sync-connection-setting.service'
import type { EmployeeSyncConnectionSettingResponseDto } from '../types/employee-sync-connection-setting-response.dto'

type UseEmployeeSyncConnectionSettingReturn = {
  data: EmployeeSyncConnectionSettingResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useEmployeeSyncConnectionSetting =
  (): UseEmployeeSyncConnectionSettingReturn => {
    const [data, setData] =
      useState<EmployeeSyncConnectionSettingResponseDto | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchSetting = useCallback(async (): Promise<void> => {
      try {
        setIsLoading(true)
        setError(null)

        const result = await employeeSyncConnectionSettingService.findOne()
        setData(result)
      } catch (error) {
        const message = parseBackendError(error)
        setError(message)
        toastService.error(message)
      } finally {
        setIsLoading(false)
      }
    }, [])

    useEffect(() => {
      void fetchSetting()
    }, [fetchSetting])

    return {
      data,
      isLoading,
      error,
      refetch: fetchSetting,
    }
  }