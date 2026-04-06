import { ApiService } from '@/core/api/api.service'
import type { EmployeeSyncConnectionSettingResponseDto } from '../types/employee-sync-connection-setting-response.dto'
import type { TestEmployeeSyncConnectionDto } from '../types/test-employee-sync-connection.dto'
import type { UpdateEmployeeSyncConnectionSettingDto } from '../types/update-employee-sync-connection-setting.dto'

class EmployeeSyncConnectionSettingService extends ApiService {
  async findOne(): Promise<EmployeeSyncConnectionSettingResponseDto> {
    return await this.get<EmployeeSyncConnectionSettingResponseDto>(
      '/system-settings/employee-sync/connection',
    )
  }

  async update(
    dto: UpdateEmployeeSyncConnectionSettingDto,
  ): Promise<EmployeeSyncConnectionSettingResponseDto> {
    return await this.patch<EmployeeSyncConnectionSettingResponseDto>(
      '/system-settings/employee-sync/connection',
      dto,
    )
  }

  async testConnection(
    dto: TestEmployeeSyncConnectionDto,
  ): Promise<{ success: boolean }> {
    return await this.post<{ success: boolean }>(
      '/system-settings/employee-sync/connection/test',
      dto,
    )
  }
}

export const employeeSyncConnectionSettingService =
  new EmployeeSyncConnectionSettingService()