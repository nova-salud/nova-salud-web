import { ApiService } from '@/core/api/api.service'
import type { FollowUpResponseDto } from '../types/follow-up-response.dto'

class FollowUpService extends ApiService {
  async findPendingByClinicalHistory(
    employeeId: number,
  ): Promise<FollowUpResponseDto[]> {
    return await this.get<FollowUpResponseDto[]>(
      `/follow-ups/pending?employeeId=${employeeId}`,
    )
  }
}

export const followUpService = new FollowUpService()