import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { CreateSignatureDto, SignatureResponseDto } from '../types'
import { signatureService } from '../services/signature.service'

export const useCreateSignature = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [CreateSignatureDto],
    SignatureResponseDto
  >(
    signatureService.create.bind(signatureService),
    {
      successMessage: 'Firma registrada correctamente.',
    },
  )

  return {
    createSignature: execute,
    isLoading,
    error,
    clearError,
  }
}