import { Textarea, Button, InputFile, Sidebar, SearchSelect,  } from '@/shared/components'
import { getFileUrl } from '@/shared/utils'
import { useState, useEffect } from 'react'
import type { ClinicalHistoryExamResponseDto } from '../../emo-cycles/types'
import { useCompleteClinicalHistoryExam } from '../hooks'
import { healthcareCenterService } from '@/features/healthcare-centers/services/healthcare-center.service'
import type { HealthcareCenterResponseDto } from '@/features/healthcare-centers/types'

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
  const [file, setFile] = useState<File | null>(null)
  const [healthcareCenterId, setHealthcareCenterId] = useState<string>('')
  const [healthcareCenters, setHealthcareCenters] = useState<HealthcareCenterResponseDto[]>([])

  const {
    isLoading,
    error,
    completeClinicalHistoryExam,
  } = useCompleteClinicalHistoryExam()

  useEffect(() => {
    healthcareCenterService.findAll({ pageSize: 200, page: 1, isActive: true })
      .then((res) => setHealthcareCenters(res.data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!isOpen) return
    setFile(null)
    setHealthcareCenterId(exam?.healthcareCenterId ? String(exam.healthcareCenterId) : '')
  }, [isOpen, exam])

  const isCompleted = exam?.isCompleted ?? false

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    if (!exam || !file) return
    const data = new FormData(e.currentTarget)
    const resultNote = (data.get('resultNote') as string).trim()
    if (!resultNote) return

    const result = await completeClinicalHistoryExam(
      exam.id,
      {
        resultNote,
        healthcareCenterId: healthcareCenterId ? Number(healthcareCenterId) : undefined,
      },
      file,
    )

    if (!result) return

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
        <form
          key={`${exam.id}-${isOpen}`}
          className="space-y-5"
          onSubmit={(e) => void handleSubmit(e)}
        >
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
            name="resultNote"
            defaultValue={exam?.resultNote ?? ''}
            placeholder="Describe el resultado del examen"
            rows={5}
            disabled={isCompleted}
          />

          {isCompleted ? (
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Proveedor / Clínica
              </p>
              <p className="mt-2 text-sm text-slate-700">
                {exam.healthcareCenterName ?? 'No registrado'}
              </p>
            </div>
          ) : (
            <SearchSelect
              label="Proveedor / Clínica (opcional)"
              value={healthcareCenterId}
              options={[
                { label: 'Sin proveedor', value: '' },
                ...healthcareCenters.map((hc) => ({ label: hc.name, value: String(hc.id) })),
              ]}
              onChange={setHealthcareCenterId}
              placeholder="Buscar proveedor..."
            />
          )}

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
                type="submit"
                className="w-auto"
                isLoading={isLoading}
                loadingText="Guardando..."
              >
                Completar examen
              </Button>
            ) : null}
          </div>
        </form>
      )}
    </Sidebar>
  )
}

export default CompleteClinicalHistoryExamSidebar
