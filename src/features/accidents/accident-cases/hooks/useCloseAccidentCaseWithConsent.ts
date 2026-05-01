import { useAsyncAction } from '@/core/hooks/use-async-action'
import { accidentCaseService } from '../services/accident-case.service'
import type { CloseAccidentCaseWithConsentDto } from '../types/close-accident-case-with-consent.dto'

export const useCloseAccidentCaseWithConsent = () => {
  const { execute, isLoading, error } = useAsyncAction<
    [number, CloseAccidentCaseWithConsentDto],
    void
  >(
    accidentCaseService.closeWithConsent.bind(accidentCaseService),
    {
      successMessage: 'Caso cerrado con consentimiento.',
    }
  )

  return {
    closeWithConsent: execute,
    isLoading,
    error,
  }
}