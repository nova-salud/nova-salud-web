import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { accidentService } from '../services/accident.service'

export const useSendAccidentSummary = () => {
  const { execute, isLoading, error } = useAsyncAction<[number], void>(
    accidentService.sendSummary.bind(accidentService),
    { successMessage: 'Resumen enviado por correo correctamente.' },
  )

  return {
    sendSummary: execute,
    isLoading,
    error,
  }
}
