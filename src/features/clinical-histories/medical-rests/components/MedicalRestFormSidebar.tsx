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
  accidentId?: number
  onClose: () => void
  onSuccess: () => void
}

const MedicalRestFormSidebar = ({ isOpen, clinicalHistoryId, accidentId, onClose, onSuccess }: Props) => {
  const [startDate, setStartDate] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { isLoading, error, createMedicalRest, clearError } = useCreateMedicalRest()

  useEffect(() => {
    if (!isOpen) return
    setStartDate('')
    setFile(null)
    clearError()
  }, [isOpen, clearError])

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const start = data.get('startDate') as string
    const end = data.get('endDate') as string
    if (!start || !end) return

    const result = await createMedicalRest(
      {
        clinicalHistoryId,
        accidentId,
        startDate: start,
        endDate: end,
        notes: (data.get('notes') as string).trim() || undefined,
      },
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
      <form
        key={isOpen ? 'open' : 'closed'}
        className="space-y-5"
        onSubmit={(e) => void handleSubmit(e)}
      >
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <Input
          label="Fecha de inicio"
          name="startDate"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          label="Fecha de fin"
          name="endDate"
          type="date"
          min={startDate}
        />

        <Textarea
          label="Observaciones (opcional)"
          name="notes"
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
            type="submit"
            className="w-auto"
            isLoading={isLoading}
            loadingText="Guardando..."
          >
            Registrar
          </Button>
        </div>
      </form>
    </Sidebar>
  )
}

export default MedicalRestFormSidebar
