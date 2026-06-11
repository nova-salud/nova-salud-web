import { useAppQuery } from '@/shared/hooks'
import { employeeSyncJobSettingService } from '../services/employee-sync-job-setting.service'

export const useEmployeeSyncJobSetting = () => {
  return useAppQuery({
    queryKey: ['employee-sync-job-setting'],
    queryFn: () => employeeSyncJobSettingService.findOne(),
  })
}
