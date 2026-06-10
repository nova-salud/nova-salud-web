import { useCallback, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeSyncConnectionSettingService } from '../services/employee-sync-connection-setting.service'
import type { EmployeeSyncConnectionSettingResponseDto } from '../types/employee-sync-connection-setting-response.dto'
import type { UpdateEmployeeSyncConnectionSettingDto } from '../types/update-employee-sync-connection-setting.dto'

type UseUpdateEmployeeSyncConnectionSettingReturn = {
  update: (
    dto: UpdateEmployeeSyncConnectionSettingDto,
  ) => Promise<EmployeeSyncConnectionSettingResponseDto | null>
  isLoading: boolean
  error: string | null
}

export const useUpdateEmployeeSyncConnectionSetting =
  (): UseUpdateEmployeeSyncConnectionSettingReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const update = useCallback(
      async (
        dto: UpdateEmployeeSyncConnectionSettingDto,
      ): Promise<EmployeeSyncConnectionSettingResponseDto | null> => {
        try {
          setIsLoading(true)
          setError(null)

          const result = await employeeSyncConnectionSettingService.update(dto)
          toastService.success('Configuración de conexión actualizada correctamente.')
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