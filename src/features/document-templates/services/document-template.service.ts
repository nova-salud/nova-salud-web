import { ApiService } from '@/core/api/api.service'
import { axiosInstance } from '@/core/api/axios.instance'
import type { DocumentTemplateResponseDto, DocumentTemplateType } from '../types/document-template.types'

class DocumentTemplateService extends ApiService {
  async findAll(): Promise<DocumentTemplateResponseDto[]> {
    return this.get<DocumentTemplateResponseDto[]>('/document-templates')
  }

  async upload(type: DocumentTemplateType, file: File): Promise<DocumentTemplateResponseDto> {
    const formData = new FormData()
    formData.append('type', type)
    formData.append('file', file)
    return this.post<DocumentTemplateResponseDto, FormData>('/document-templates/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  async downloadFile(type: DocumentTemplateType): Promise<void> {
    const response = await axiosInstance.get(`/document-templates/${type}/file`, {
      responseType: 'blob',
    })
    this.triggerDownload(response.data as Blob, `${type.toLowerCase()}.docx`)
  }

  async generate(type: DocumentTemplateType, emoCycleId: number): Promise<void> {
    const response = await axiosInstance.post(
      '/document-templates/generate',
      { type, emoCycleId },
      { responseType: 'blob' },
    )
    this.triggerDownload(response.data as Blob, `${type.toLowerCase()}_${emoCycleId}.docx`)
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
}

export const documentTemplateService = new DocumentTemplateService()
