import { Textarea, Button, InputFile } from '@/shared/components/ui/form'
import { getFileUrl } from '@/shared/utils'
import { useState, useEffect } from 'react'
import type { ClinicalHistoryExamResponseDto } from '../../emo-cycles/types'
import { useCompleteClinicalHistoryExam } from '../hooks'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'


type Props = {
  isOpen: boolean
  exam: ClinicalHistoryExamResponseDto | null
  onClose: () => void
  onSuccess: () => void
}

const CompleteClinicalHistoryExamSidebar = ({
  isOpen,
  exam,
  onClose,
  onSuccess,
}: Props) => {
  const [resultNote, setResultNote] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const {
    isLoading,
    error,
    completeClinicalHistoryExam,
  } = useCompleteClinicalHistoryExam()

  useEffect(() => {
    if (!isOpen) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResultNote(exam?.resultNote ?? '')
    setFile(null)
  }, [isOpen, exam])

  const isCompleted = exam?.isCompleted ?? false

  const handleSubmit = async () => {
    if (!exam || !resultNote.trim() || !file) {
      return
    }

    const result = await completeClinicalHistoryExam(
      exam.id,
      { resultNote: resultNote.trim() },
      file,
    )

    if (!result) {
      return
    }

    onSuccess()
    onClose()
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isCompleted ? 'Detalle del examen' : 'Completar examen'}
      description={
        isCompleted
          ? 'Consulta la información registrada del examen.'
          : 'Registra el resultado y adjunta el archivo del examen.'
      }
    >
      {!exam ? null : (
        <div className="space-y-5">
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Examen
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700">
              {exam.examName}
            </p>
          </div>

          <Textarea
            label="Resultado"
            value={resultNote}
            onChange={setResultNote}
            placeholder="Describe el resultado del examen"
            rows={5}
            disabled={isCompleted}
          />

          {isCompleted ? (
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Archivo adjunto
              </p>

              <div className="mt-2">
                {exam.fileUrl ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-auto"
                    onClick={() => window.open(getFileUrl(exam.fileUrl!), '_blank')}
                  >
                    Ver archivo
                  </Button>
                ) : (
                  <p className="text-sm text-slate-700">No registrado</p>
                )}
              </div>
            </div>
          ) : (
            <InputFile
              label="Archivo del examen"
              value={file}
              onChange={setFile}
              allowedExtensions={['pdf', 'png', 'jpg', 'jpeg']}
            />
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={onClose}
            >
              {isCompleted ? 'Cerrar' : 'Cancelar'}
            </Button>

            {!isCompleted ? (
              <Button
                type="button"
                className="w-auto"
                onClick={() => void handleSubmit()}
                isLoading={isLoading}
                loadingText="Guardando..."
                disabled={!resultNote.trim() || !file}
              >
                Completar examen
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default CompleteClinicalHistoryExamSidebar