import { useState } from 'react'
import { useAttentionAttachments, useCreateAttentionAttachment, useRemoveAttentionAttachment } from '../hooks'
import { Button, Input } from '@/shared/components/ui/form'
import { getFileUrl } from '@/shared/utils'
import { toastService } from '@/core/services/toast.service'

type Props = {
  attentionId: number
}

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg', 'jpeg']

const isValidFile = (file: File) => {
  const ext = file.name.split('.').pop()?.toLowerCase()
  return ext && ALLOWED_EXTENSIONS.includes(ext)
}

const AttentionAttachmentsSection = ({ attentionId }: Props) => {
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const {
    data: attachments,
    isLoading,
    error,
    refetch,
  } = useAttentionAttachments(attentionId)

  const {
    createAttentionAttachment,
    isLoading: isCreating,
    error: createError,
  } = useCreateAttentionAttachment()

  const {
    removeAttentionAttachment,
    isLoading: isRemoving,
    error: removeError,
  } = useRemoveAttentionAttachment()


  const handleUpload = async () => {
    if (!file) {
      return
    }

    const result = await createAttentionAttachment(
      {
        attentionId,
        description: description.trim() || undefined,
      },
      file,
    )

    if (!result) {
      return
    }

    setDescription('')
    setFile(null)
    await refetch()
  }

  const handleRemove = async (id: number) => {
    await removeAttentionAttachment(id)
    await refetch()
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Adjuntos</h2>
        <p className="text-sm text-slate-500">
          Archivos relacionados con la atención.
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {createError ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {createError}
        </div>
      ) : null}

      {removeError ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {removeError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <Input
            label="Descripción"
            placeholder="Agrega una descripción del archivo"
            value={description}
            onChange={setDescription}
          />

          <input
            type="file"
            onChange={(e) => {
              const selected = e.target.files?.[0]

              if (!selected) return

              if (!isValidFile(selected)) {
                toastService.error('Formato no permitido')
                e.target.value = ''
                return
              }

              setFile(selected)
            }}
            className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-700"
            accept={
              ALLOWED_EXTENSIONS.map(ext => `.${ext}`).join(',')
            }
          />
        </div>

        <div className="flex items-end">
          <Button
            type="button"
            className="w-auto"
            onClick={() => void handleUpload()}
            disabled={!file}
            isLoading={isCreating}
            loadingText="Subiendo..."
          >
            Subir archivo
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="text-sm text-slate-500">Cargando adjuntos...</div>
        ) : attachments.length === 0 ? (
          <div className="text-sm text-slate-500">
            No hay adjuntos registrados para esta atención.
          </div>
        ) : (
          <div className="space-y-3">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {attachment.fileName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {attachment.description || 'Sin descripción'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-auto"
                    onClick={() => window.open(getFileUrl(attachment.fileUrl), '_blank')}
                  >
                    Ver archivo
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-auto"
                    onClick={() => void handleRemove(attachment.id)}
                    isLoading={isRemoving}
                    loadingText="Eliminando..."
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AttentionAttachmentsSection