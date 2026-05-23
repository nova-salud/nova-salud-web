import { useCallback, useEffect, useState } from 'react'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { documentTemplateService } from '../services/document-template.service'
import type { DocumentTemplateResponseDto } from '../types/document-template.types'

export const useDocumentTemplates = () => {
  const [templates, setTemplates] = useState<DocumentTemplateResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTemplates = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await documentTemplateService.findAll()
      setTemplates(result)
    } catch (err) {
      const message = parseBackendError(err)
      setError(message)
      toastService.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchTemplates()
  }, [fetchTemplates])

  return { templates, isLoading, error, refetch: fetchTemplates }
}
