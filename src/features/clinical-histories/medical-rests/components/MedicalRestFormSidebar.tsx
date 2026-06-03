import { useState, useEffect } from 'react'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { Input } from '@/shared/components/ui/form/Input'
import { Textarea } from '@/shared/components/ui/form/Textarea'
import { InputFile } from '@/shared/components/ui/form/InputFile'
import { Button } from '@/shared/components/ui/form'
import { useCreateMedicalRest } from '../hooks/useCreateMedicalRest'

type Props = {
  isOpen: boolean
  clinicalHistoryId: number
  onClose: () => void
  onSuccess: () => void
}

const MedicalRestFormSidebar = ({ isOpen, clinicalHistoryId, onClose, onSuccess }: Props) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [notes, setNotes] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { isLoading, error, createMedicalRest, clearError } = useCreateMedicalRest()

  useEffect(() => {
    if (!isOpen) return
    setStartDate('')
    setEndDate('')
    setNotes('')
    setFile(null)
    clearError()
  }, [isOpen, clearError])

  const isValid = startDate && endDate

  const handleSubmit = async () => {
    if (!isValid) return

    const result = await createMedicalRest(
      { clinicalHistoryId, startDate, endDate, notes: notes.trim() || undefined },
      file ?? undefined,
    )

    if (!result) return

    onSuccess()
    onClose()
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar descanso médico"
      description="Ingresa las fechas del descanso médico y adjunta el documento PDF."
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <Input
          label="Fecha de inicio"
          type="date"
          value={startDate}
          onChange={setStartDate}
        />

        <Input
          label="Fecha de fin"
          type="date"
          value={endDate}
          onChange={setEndDate}
          min={startDate}
        />

        <Textarea
          label="Observaciones (opcional)"
          value={notes}
          onChange={setNotes}
          placeholder="Notas adicionales sobre el descanso médico"
          rows={3}
        />

        <InputFile
          label="Documento DM (PDF)"
          value={file}
          onChange={setFile}
          allowedExtensions={['pdf']}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" className="w-auto" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            className="w-auto"
            onClick={() => void handleSubmit()}
            isLoading={isLoading}
            loadingText="Guardando..."
            disabled={!isValid}
          >
            Registrar
          </Button>
        </div>
      </div>
    </Sidebar>
  )
}

export default MedicalRestFormSidebar
