import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { attentionService } from '../services/attention.service'

export const useSendAttentionSummary = () => {
  const { execute, isLoading, error } = useAsyncAction<[number], void>(
    attentionService.sendSummary.bind(attentionService),
    { successMessage: 'Resumen enviado por correo correctamente.' },
  )

  return {
    sendSummary: execute,
    isLoading,
    error,
  }
}
