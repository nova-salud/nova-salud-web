import { ApiService } from '@/core/api/api.service'
import type { EmployeeSyncJobSettingResponseDto } from '../types/employee-sync-job-setting-response.dto'
import type { UpdateEmployeeSyncJobSettingDto } from '../types/update-employee-sync-job-setting.dto'

class EmployeeSyncJobSettingService extends ApiService {
  async findOne(): Promise<EmployeeSyncJobSettingResponseDto> {
    return await this.get<EmployeeSyncJobSettingResponseDto>(
      '/system-settings/employee-sync/job',
    )
  }

  async update(
    dto: UpdateEmployeeSyncJobSettingDto,
  ): Promise<EmployeeSyncJobSettingResponseDto> {
    return await this.patch<EmployeeSyncJobSettingResponseDto>(
      '/system-settings/employee-sync/job',
      dto,
    )
  }
}

export const employeeSyncJobSettingService =
  new EmployeeSyncJobSettingService()