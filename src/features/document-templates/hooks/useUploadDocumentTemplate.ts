import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { documentTemplateService } from '../services/document-template.service'
import type { DocumentTemplateResponseDto, DocumentTemplateType } from '../types/document-template.types'

export const useUploadDocumentTemplate = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [DocumentTemplateType, File],
    DocumentTemplateResponseDto
  >(
    documentTemplateService.upload.bind(documentTemplateService),
    {
      successMessage: 'Plantilla actualizada correctamente.',
    },
  )

  return {
    upload: execute,
    isLoading,
    error,
    clearError,
  }
}
