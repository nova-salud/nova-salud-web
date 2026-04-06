import { useCallback, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeSyncConnectionSettingService } from '../services/employee-sync-connection-setting.service'
import type { TestEmployeeSyncConnectionDto } from '../types/test-employee-sync-connection.dto'

type UseTestEmployeeSyncConnectionReturn = {
  testConnection: (dto: TestEmployeeSyncConnectionDto) => Promise<boolean>
  isLoading: boolean
  error: string | null
}

export const useTestEmployeeSyncConnection =
  (): UseTestEmployeeSyncConnectionReturn => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const testConnection = useCallback(
      async (dto: TestEmployeeSyncConnectionDto): Promise<boolean> => {
        try {
          setIsLoading(true)
          setError(null)

          const result =
            await employeeSyncConnectionSettingService.testConnection(dto)

          if (result.success) {
            toastService.success('Conexión exitosa.')
          } else {
            toastService.error('No se pudo establecer la conexión.')
          }

          return result.success
        } catch (error) {
          const message = parseBackendError(error)
          setError(message)
          toastService.error(message)
          return false
        } finally {
          setIsLoading(false)
        }
      },
      [],
    )

    return {
      testConnection,
      isLoading,
      error,
    }
  }