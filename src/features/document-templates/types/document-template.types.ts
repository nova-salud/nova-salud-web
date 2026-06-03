export type FindDocumentTemplatesDto = {
  type?: DocumentTemplateType
  isActive?: boolean
}

export const DocumentTemplateType = {
  EMO_DELIVERY: 'EMO_DELIVERY',
  EMO_CERTIFICATE: 'EMO_CERTIFICATE',
} as const

export type DocumentTemplateType = typeof DocumentTemplateType[keyof typeof DocumentTemplateType];

export interface DocumentTemplateResponseDto {
  id: number
  type: DocumentTemplateType
  name: string
  filePath: string
  version: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}
