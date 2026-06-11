import { useState, useCallback } from 'react'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { documentTemplateService } from '@/features/document-templates/services/document-template.service'
import { DocumentTemplateType } from '@/features/document-templates/types/document-template.types'

export const useGenerateEmoCycleDocument = (cycleId: number) => {
  const [generatingType, setGeneratingType] = useState<DocumentTemplateType | null>(null)

  const action = useCallback(
    async (type: DocumentTemplateType) => {
      setGeneratingType(type)
      try {
        await documentTemplateService.generate(type, { emoCycleId: cycleId })
      } finally {
        setGeneratingType(null)
      }
    },
    [cycleId],
  )

  const { execute: generate } = useAsyncAction(action, { showSuccessToast: false })

  return { generate, generatingType }
}
