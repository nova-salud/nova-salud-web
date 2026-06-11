import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { employeeSyncConnectionSettingService } from '../services/employee-sync-connection-setting.service'
import type { TestEmployeeSyncConnectionDto } from '../types/test-employee-sync-connection.dto'

export const useTestEmployeeSyncConnection = () => {
  const { execute: testConnection, isLoading, error, clearError } = useAsyncAction(
    async (dto: TestEmployeeSyncConnectionDto) => {
      const result = await employeeSyncConnectionSettingService.testConnection(dto)
      if (!result.success) throw new Error('No se pudo establecer la conexión.')
      return result
    },
    { successMessage: 'Conexión exitosa.' },
  )
  return { testConnection, isLoading, error, clearError }
}
