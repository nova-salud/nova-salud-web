import { useAppQuery } from '@/shared/hooks'
import { employeeSyncConnectionSettingService } from '../services/employee-sync-connection-setting.service'

export const useEmployeeSyncConnectionSetting = () => {
  return useAppQuery({
    queryKey: ['employee-sync-connection-setting'],
    queryFn: () => employeeSyncConnectionSettingService.findOne(),
  })
}
