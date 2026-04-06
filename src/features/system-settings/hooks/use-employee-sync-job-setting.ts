import { useCallback, useEffect, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeSyncJobSettingService } from '../services/employee-sync-job-setting.service'
import type { EmployeeSyncJobSettingResponseDto } from '../types/employee-sync-job-setting-response.dto'

type UseEmployeeSyncJobSettingReturn = {
  data: EmployeeSyncJobSettingResponseDto | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useEmployeeSyncJobSetting =
  (): UseEmployeeSyncJobSettingReturn => {
    const [data, setData] =
      useState<EmployeeSyncJobSettingResponseDto | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchSetting = useCallback(async (): Promise<void> => {
      try {
        setIsLoading(true)
        setError(null)

        const result = await employeeSyncJobSettingService.findOne()
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