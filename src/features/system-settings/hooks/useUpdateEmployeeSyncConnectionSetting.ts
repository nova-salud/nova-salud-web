import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { employeeSyncConnectionSettingService } from '../services/employee-sync-connection-setting.service'
import type { UpdateEmployeeSyncConnectionSettingDto } from '../types/update-employee-sync-connection-setting.dto'

export const useUpdateEmployeeSyncConnectionSetting = () => {
  const { execute: update, isLoading, error, clearError } = useAsyncAction(
    (dto: UpdateEmployeeSyncConnectionSettingDto) =>
      employeeSyncConnectionSettingService.update(dto),
    { successMessage: 'Configuración de conexión actualizada correctamente.' },
  )
  return { update, isLoading, error, clearError }
}
