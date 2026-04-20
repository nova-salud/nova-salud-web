import { useState } from 'react'
import type { ClinicalHistoryExamResponseDto } from '../types'
import { useCompleteClinicalHistoryExam } from '../hooks'
import { Button, Input, InputFile, Textarea } from '@/shared/components/ui/form'
import { getFileUrl } from '@/shared/utils'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'

type Props = {
  isOpen: boolean
  onClose: () => void
  exam: ClinicalHistoryExamResponseDto | null
  onSuccess: () => void
}

const ClinicalHistoryExamCompleteContent = ({
  exam,
  onClose,
  onSuccess,
}: Omit<Props, 'isOpen'>) => {
  const isReadOnly = Boolean(exam?.isCompleted)

  const [resultNote, setResultNote] = useState(exam?.resultNote ?? '')
  const [file, setFile] = useState<File | null>(null)

  const {
    completeClinicalHistoryExam,
    isLoading,
    error,
  } = useCompleteClinicalHistoryExam()

  const handleSubmit = async () => {
    if (!exam || !resultNote.trim() || !file) return

    const result = await completeClinicalHistoryExam(
      exam.id,
      { resultNote: resultNote.trim() },
      file,
    )

    if (!result) return

    onSuccess()
    onClose()
  }

  return (
    <div className="flex flex-col gap-4">
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <Input
        label="Nombre del examen"
        value={exam?.examName ?? ''}
        onChange={() => {}}
        disabled
      />

      <Textarea
        label="Resultado"
        placeholder="Describe el resultado o notas del examen"
        value={resultNote}
        onChange={setResultNote}
        rows={5}
        disabled={isReadOnly}
      />

      {isReadOnly ? (
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Archivo adjunto</p>
          {exam?.fileUrl ? (
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={() => window.open(getFileUrl(exam.fileUrl!), '_blank')}
            >
              Ver archivo
            </Button>
          ) : (
            <p className="text-sm text-slate-500">Sin archivo adjunto</p>
          )}
        </div>
      ) : (
        <InputFile
          label="Archivo del examen"
          value={file}
          onChange={setFile}
          allowedExtensions={['pdf', 'png', 'jpg', 'jpeg']}
        />
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          {isReadOnly ? 'Cerrar' : 'Cancelar'}
        </Button>

        {!isReadOnly ? (
          <Button
            type="button"
            onClick={() => void handleSubmit()}
            isLoading={isLoading}
            loadingText="Guardando..."
            disabled={!exam || !resultNote.trim() || !file}
          >
            Completar examen
          </Button>
        ) : null}
      </div>
    </div>
  )
}

const ClinicalHistoryExamCompleteSidebar = ({
  isOpen,
  onClose,
  exam,
  onSuccess,
}: Props) => {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={exam?.isCompleted ? 'Detalle del examen' : 'Completar examen'}
      description={exam?.isCompleted ? 'Consulta el resultado y archivo del examen.' : 'Registra el resultado del examen y adjunta el archivo correspondiente.'}
    >
      <ClinicalHistoryExamCompleteContent
        key={exam?.id ?? 'empty'}
        exam={exam}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </Sidebar>
  )
}

export default ClinicalHistoryExamCompleteSidebar