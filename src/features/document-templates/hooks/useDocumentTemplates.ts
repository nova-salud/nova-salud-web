import { useCallback } from 'react'
import { useQuery } from '@/core/hooks/useQuery'
import { documentTemplateService } from '../services/document-template.service'
import type { FindDocumentTemplatesDto } from '../types/document-template.types'

export const useDocumentTemplates = (query?: FindDocumentTemplatesDto) => {
  const fetcher = useCallback(
    () => documentTemplateService.findAll(query),
    [query],
  )

  const { data: templates, isLoading, error, refetch } = useQuery(fetcher, [])

  return { templates, isLoading, error, refetch }
}
