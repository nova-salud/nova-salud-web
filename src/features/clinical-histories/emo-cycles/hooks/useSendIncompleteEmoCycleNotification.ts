import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { clinicalHistoryEmoCycleService } from '../services/clinical-history-emo-cycle.service'

export const useSendIncompleteEmoCycleNotification = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<[number], void>(
    clinicalHistoryEmoCycleService.sendIncompleteNotification.bind(clinicalHistoryEmoCycleService),
    { successMessage: 'Notificación enviada correctamente.' },
  )

  return { sendNotification: execute, isLoading, error, clearError }
}
