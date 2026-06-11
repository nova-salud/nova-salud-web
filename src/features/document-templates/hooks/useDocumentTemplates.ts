import { useAppQuery } from '@/shared/hooks'
import { DOCUMENT_TEMPLATE_QUERY_KEYS } from '../constants/document-template-query-keys'
import { documentTemplateService } from '../services/document-template.service'
import type { DocumentTemplateResponseDto } from '../types/document-template.types'

export const useDocumentTemplates = () => {
  const { data, ...rest } = useAppQuery<DocumentTemplateResponseDto[]>({
    queryKey: DOCUMENT_TEMPLATE_QUERY_KEYS.list(),
    queryFn: () => documentTemplateService.findAll(),
  })
  return { ...rest, templates: data ?? [] }
}
