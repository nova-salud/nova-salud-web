import { ApiService } from '@/core/api/api.service'
import type { CreateSignatureDto, SignatureResponseDto } from '../types'

class SignatureService extends ApiService {
  async create(dto: CreateSignatureDto): Promise<SignatureResponseDto> {
    return await this.post<SignatureResponseDto>('/attentions/signatures', dto)
  }

  async findByAttentionId(attentionId: number): Promise<SignatureResponseDto[]> {
    return await this.get<SignatureResponseDto[]>(
      `/attentions/signatures/attention/${attentionId}`,
    )
  }
}

export const signatureService = new SignatureService()