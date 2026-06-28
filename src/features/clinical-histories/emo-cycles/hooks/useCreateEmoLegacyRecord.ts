import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { emoLegacyRecordService } from '../services/emo-legacy-record.service'
import type { CreateEmoLegacyRecordDto, EmoLegacyRecordDto } from '../types/emo-legacy-record.types'

export const useCreateEmoLegacyRecord = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateEmoLegacyRecordDto, File | undefined],
    EmoLegacyRecordDto
  >(
    emoLegacyRecordService.create.bind(emoLegacyRecordService),
    { successMessage: 'Registro histórico creado correctamente.' },
  )

  return { createRecord: execute, isLoading, error, clearError }
}
