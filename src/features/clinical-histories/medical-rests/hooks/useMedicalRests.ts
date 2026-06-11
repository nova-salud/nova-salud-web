import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery'
import { medicalRestService } from '../services/medical-rest.service'
import type { FindMedicalRestsParams } from '../services/medical-rest.service'
import type { MedicalRestResponseDto } from '../types'

type Params = {
  clinicalHistoryId: number
  accidentId?: number
  attentionId?: number
}

export const useMedicalRests = ({ clinicalHistoryId, accidentId, attentionId }: Params) => {
  return usePaginatedQuery<MedicalRestResponseDto, FindMedicalRestsParams>({
    queryKey: ['medical-rests', { clinicalHistoryId, accidentId, attentionId }],
    queryFn: (filters) =>
      medicalRestService.findAll({ ...filters, clinicalHistoryId, accidentId, attentionId }),
  })
}
