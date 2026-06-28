import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { emoLegacyRecordService } from '../services/emo-legacy-record.service'

export const useDeleteEmoLegacyRecord = () => {
  const { execute, isLoading } = useAsyncAction<[number], void>(
    emoLegacyRecordService.remove.bind(emoLegacyRecordService),
    { successMessage: 'Registro eliminado correctamente.' },
  )

  return { deleteRecord: execute, isDeleting: isLoading }
}
