import { useCallback, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeSyncJobSettingService } from '../services/employee-sync-job-setting.service'
import type { EmployeeSyncJobSettingResponseDto } from '../types/employee-sync-job-setting-response.dto'
import type { UpdateEmployeeSyncJobSettingDto } from '../types/update-employee-sync-job-setting.dto'

type UseUpdateEmployeeSyncJobSettingReturn = {
  update: (
    dto: UpdateEmployeeSyncJobSettingDto,
  ) => Promise<EmployeeSyncJobSettingResponseDto | null>
  isLoading: boolean
  error: string | null
}

export const useUpdateEmployeeSyncJobSetting =
  (): UseUpdateEmployeeSyncJobSettingReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const update = useCallback(
      async (
        dto: UpdateEmployeeSyncJobSettingDto,
      ): Promise<EmployeeSyncJobSettingResponseDto | null> => {
        try {
          setIsLoading(true)
          setError(null)

          const result = await employeeSyncJobSettingService.update(dto)
          toastService.success('Configuración del job actualizada correctamente.')
          return result
        } catch (error) {
          const message = parseBackendError(error)
          setError(message)
          toastService.error(message)
          return null
        } finally {
          setIsLoading(false)
        }
      },
      [],
    )

    return {
      update,
      isLoading,
      error,
    }
  }