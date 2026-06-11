import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { Button, InputFile } from '@/shared/components'
import { documentTemplateService } from '../services/document-template.service'
import { useUploadDocumentTemplate } from '../hooks/useUploadDocumentTemplate'
import { DOCUMENT_TEMPLATE_META } from '../constants/document-template.constants'
import type { DocumentTemplateResponseDto, DocumentTemplateType } from '../types/document-template.types'

type Props = {
  type: DocumentTemplateType
  template: DocumentTemplateResponseDto | undefined
  onUploaded: () => void
}

export const DocumentTemplateCard = ({ type, template, onUploaded }: Props) => {
  const { upload, isLoading: isUploading } = useUploadDocumentTemplate()
  const [file, setFile] = useState<File | null>(null)

  const meta = DOCUMENT_TEMPLATE_META[type]

  const handleFileChange = async (selected: File | null) => {
    if (!selected) return
    setFile(selected)
    const result = await upload(type, selected)
    setFile(null)
    if (result) onUploaded()
  }

  const { execute: handleDownload, isLoading: isDownloading } = useAsyncAction(
    () => documentTemplateService.downloadFile(type),
    { showSuccessToast: false },
  )

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
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

      <InputFile
        value={file}
        allowedExtensions={['docx']}
        placeholder={isUploading ? 'Subiendo...' : template ? 'Actualizar plantilla...' : 'Selecciona un .docx'}
        onChange={(f) => { void handleFileChange(f) }}
      />

      <Button
        type="button"
        variant="outline"
        disabled={!template || isDownloading}
        isLoading={isDownloading}
        loadingText="Descargando..."
        className="w-full gap-1.5"
        onClick={() => { void handleDownload() }}
      >
        <Download className="h-4 w-4" />
        Descargar plantilla
      </Button>
    </div>
  )
}
