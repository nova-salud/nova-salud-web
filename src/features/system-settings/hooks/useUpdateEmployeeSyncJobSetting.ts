import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { employeeSyncJobSettingService } from '../services/employee-sync-job-setting.service'
import type { UpdateEmployeeSyncJobSettingDto } from '../types/update-employee-sync-job-setting.dto'

export const useUpdateEmployeeSyncJobSetting = () => {
  const { execute: update, isLoading, error, clearError } = useAsyncAction(
    (dto: UpdateEmployeeSyncJobSettingDto) =>
      employeeSyncJobSettingService.update(dto),
    { successMessage: 'Configuración del job actualizada correctamente.' },
  )
  return { update, isLoading, error, clearError }
}
