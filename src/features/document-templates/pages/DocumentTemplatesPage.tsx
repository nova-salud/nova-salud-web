import { useRef, useState } from 'react'
import { Download, FileText, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import PageContainer from '@/shared/components/ui/PageContainer'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { documentTemplateService } from '../services/document-template.service'
import { useDocumentTemplates } from '../hooks/useDocumentTemplates'
import { useUploadDocumentTemplate } from '../hooks/useUploadDocumentTemplate'
import { DocumentTemplateType, type DocumentTemplateResponseDto } from '../types/document-template.types'

const TEMPLATE_META: Record<DocumentTemplateType, { label: string; description: string }> = {
  [DocumentTemplateType.EMO_DELIVERY]: {
    label: 'Entrega de Resultados',
    description: 'Formato de entrega de resultados médico ocupacionales al trabajador.',
  },
  [DocumentTemplateType.EMO_CERTIFICATE]: {
    label: 'Certificado de Aptitud',
    description: 'Formato de aptitud médico ocupacional con resultado y recomendaciones.',
  },
  [DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS]: {
    label: 'Conformidad con Restricciones',
    description: 'Formato de conformidad para el trabajador que realizará sus labores con restricciones médicas.',
  },
  [DocumentTemplateType.EMO_CONFORMITY_DOCTOR]: {
    label: 'Conformidad Médico Ocupacional',
    description: 'Formato de conformidad del médico ocupacional sobre el resultado del EMO.',
  },
}

const ALL_TYPES = [
  DocumentTemplateType.EMO_DELIVERY,
  DocumentTemplateType.EMO_CERTIFICATE,
  DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS,
  DocumentTemplateType.EMO_CONFORMITY_DOCTOR,
]

const DocumentTemplatesPage = () => {
  const { templates, isLoading, refetch } = useDocumentTemplates()
  const { upload, isLoading: isUploading } = useUploadDocumentTemplate()
  const [uploadingType, setUploadingType] = useState<DocumentTemplateType | null>(null)
  const [downloadingType, setDownloadingType] = useState<DocumentTemplateType | null>(null)
  const fileInputRefs = useRef<Record<DocumentTemplateType, HTMLInputElement | null>>({
    [DocumentTemplateType.EMO_DELIVERY]: null,
    [DocumentTemplateType.EMO_CERTIFICATE]: null,
    [DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS]: null,
    [DocumentTemplateType.EMO_CONFORMITY_DOCTOR]: null,
  })

  const getTemplate = (type: DocumentTemplateType): DocumentTemplateResponseDto | undefined =>
    templates.find(t => t.type === type)

  const handleUploadClick = (type: DocumentTemplateType) => {
    fileInputRefs.current[type]?.click()
  }

  const handleFileChange = async (type: DocumentTemplateType, file: File | null) => {
    if (!file) return
    setUploadingType(type)
    await upload(type, file)
    setUploadingType(null)
    await refetch()
    if (fileInputRefs.current[type]) {
      fileInputRefs.current[type]!.value = ''
    }
  }

  const handleDownload = async (type: DocumentTemplateType) => {
    setDownloadingType(type)
    try {
      await documentTemplateService.downloadFile(type)
    } catch (err) {
      toastService.error(parseBackendError(err))
    } finally {
      setDownloadingType(null)
    }
  }

  return (
    <PageContainer
      title="Plantillas de Documentos"
      description="Gestiona las plantillas Word utilizadas para generar documentos médico ocupacionales."
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-sm text-slate-500">
          Cargando plantillas...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {ALL_TYPES.map(type => {
            const meta = TEMPLATE_META[type]
            const template = getTemplate(type)
            const isThisUploading = uploadingType === type && isUploading
            const isThisDownloading = downloadingType === type

            return (
              <div
                key={type}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5"
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-slate-900">{meta.label}</h2>
                      {template ? (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Configurado · v{template.version}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                          Sin plantilla
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{meta.description}</p>
                    {template && (
                      <p className="mt-1 text-xs text-slate-400">
                        Actualizado{' '}
                        {format(new Date(template.updatedAt), "d 'de' MMMM 'de' yyyy", { locale: es })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleUploadClick(type)}
                    disabled={isThisUploading}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                  >
                    <Upload className="h-4 w-4" />
                    {isThisUploading ? 'Subiendo...' : template ? 'Actualizar' : 'Subir plantilla'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(type)}
                    disabled={!template || isThisDownloading}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Download className="h-4 w-4" />
                    {isThisDownloading ? '...' : 'Descargar'}
                  </button>
                </div>

                {/* Hidden file input */}
                <input
                  ref={el => { fileInputRefs.current[type] = el }}
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={e => handleFileChange(type, e.target.files?.[0] ?? null)}
                />
              </div>
            )
          })}
        </div>
      )}
    </PageContainer>
  )
}

export default DocumentTemplatesPage
