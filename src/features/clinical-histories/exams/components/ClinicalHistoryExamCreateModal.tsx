import { useState } from 'react'
import { useCreateClinicalHistoryExam } from '../hooks'
import { Button, Input } from '@/shared/components/ui/form'
import Modal from '@/shared/components/ui/modal/Modal'

type Props = {
  isOpen: boolean
  onClose: () => void
  clinicalHistoryId: number
  onSuccess: () => void
}

const ClinicalHistoryExamCreateModal = ({
  isOpen,
  onClose,
  clinicalHistoryId,
  onSuccess,
}: Props) => {
  const [examName, setExamName] = useState('')

  const {
    createClinicalHistoryExam,
    isLoading,
    error,
  } = useCreateClinicalHistoryExam()

  const handleSubmit = async () => {
    if (!examName.trim()) return

    const result = await createClinicalHistoryExam({
      clinicalHistoryId,
      examName: examName.trim(),
    })

    if (!result) return

    setExamName('')
    onSuccess()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar examen"
      description="Ingresa el nombre del examen clínico."
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <Input
            label="Nombre del examen"
            placeholder="Ej. Hemograma, Audiometría, Espirometría"
            value={examName}
            onChange={setExamName}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Guardando..."
              disabled={!examName.trim()}
            >
              Agregar examen
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default ClinicalHistoryExamCreateModal