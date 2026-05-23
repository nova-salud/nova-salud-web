export enum DocumentTemplateType {
  EMO_DELIVERY = 'EMO_DELIVERY',
  EMO_CERTIFICATE = 'EMO_CERTIFICATE',
}

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
