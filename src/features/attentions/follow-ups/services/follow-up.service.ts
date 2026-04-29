import { ApiService } from '@/core/api/api.service'
import type { AttentionFollowUpResponseDto } from '../types/attention-follow-up-response.dto'

class FollowUpService extends ApiService {
  async findPendingByClinicalHistory(
    employeeId: number,
  ): Promise<AttentionFollowUpResponseDto[]> {
    return await this.get<AttentionFollowUpResponseDto[]>(
      `/follow-ups/pending?employeeId=${employeeId}`,
    )
  }
}

export const followUpService = new FollowUpService()