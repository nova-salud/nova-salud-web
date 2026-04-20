import { Button } from '@/shared/components/ui/form'
import type { ClinicalHistoryExamResponseDto } from '../types'
import { useRemoveClinicalHistoryExam } from '../hooks'
import { useState } from 'react'
import { getFileUrl } from '@/shared/utils'
import ClinicalHistoryExamCreateModal from './ClinicalHistoryExamCreateModal'
import ClinicalHistoryExamCompleteSidebar from './ClinicalHistoryExamCompleteSidebar'

type Props = {
  clinicalHistoryId: number
  exams: ClinicalHistoryExamResponseDto[]
  onRefresh: () => Promise<void> | void
}

const ClinicalHistoryExamsSection = ({
  clinicalHistoryId,
  exams,
  onRefresh,
}: Props) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCompleteSidebarOpen, setIsCompleteSidebarOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState<ClinicalHistoryExamResponseDto | null>(null)

  const {
    removeClinicalHistoryExam,
    isLoading: isRemoving,
    error: removeError,
  } = useRemoveClinicalHistoryExam()

  const handleAddExam = () => {
    setIsCreateModalOpen(true)
  }

  const handleCompleteExam = (examId: number) => {
    const exam = exams.find((item) => item.id === examId) || null
    setSelectedExam(exam)
    setIsCompleteSidebarOpen(true)
  }

  const handleDeleteExam = async (examId: number) => {
    const confirmed = window.confirm('¿Eliminar examen?')
    if (!confirmed) return

    await removeClinicalHistoryExam(examId)
    await onRefresh()
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Exámenes EMO</h2>
            <p className="text-sm text-slate-500">
              Exámenes registrados en la historia clínica
            </p>
          </div>

          <Button type="button" className="w-auto" onClick={handleAddExam}>
            Agregar examen
          </Button>
        </div>

        {removeError ? (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {removeError}
          </div>
        ) : null}

        {exams.length === 0 ? (
          <div className="text-sm text-slate-500">
            No hay exámenes registrados
          </div>
        ) : (
          <div className="space-y-3">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-slate-900">{exam.examName}</p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${exam.isRequired
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-200 text-slate-600'
                          }`}
                      >
                        {exam.isRequired ? 'Obligatorio' : 'Opcional'}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${exam.isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {exam.isCompleted ? 'Completo' : 'Pendiente'}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                        Resultado
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {exam.resultNote || 'Sin resultado registrado'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                        Archivo
                      </p>

                      {exam.fileUrl ? (
                        <button
                          type="button"
                          className="mt-1 text-sm text-blue-600 hover:underline"
                          onClick={() => window.open(getFileUrl(exam.fileUrl!), '_blank')}
                        >
                          {exam.fileName || 'Ver archivo'}
                        </button>
                      ) : (
                        <p className="mt-1 text-sm text-slate-600">
                          Sin archivo adjunto
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex flex-wrap gap-2">
                      {!exam.isCompleted && (
                        <Button
                          type="button"
                          className="w-auto"
                          onClick={() => handleCompleteExam(exam.id)}
                        >
                          Completar
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-auto"
                        onClick={() => void handleDeleteExam(exam.id)}
                        isLoading={isRemoving}
                        loadingText="Eliminando..."
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ClinicalHistoryExamCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        clinicalHistoryId={clinicalHistoryId}
        onSuccess={() => void onRefresh()}
      />

      <ClinicalHistoryExamCompleteSidebar
        isOpen={isCompleteSidebarOpen}
        onClose={() => setIsCompleteSidebarOpen(false)}
        exam={selectedExam}
        onSuccess={() => void onRefresh()}
      />
    </>
  )
}

export default ClinicalHistoryExamsSection