import { useState, useEffect } from 'react'
import { useCreateMedicalRest } from '../hooks/useCreateMedicalRest'
import { Button, Textarea, Sidebar, InputFile, SearchSelect, DateRangeInput } from '@/shared/components'
import type { DateRangeValue } from '@/shared/components'
import { useSearchSpecialties } from '@/features/specialties/hooks'

const MAX_REST_DAYS = 30

function diffDays(from: string, to: string): number {
  const ms = new Date(to).getTime() - new Date(from).getTime()
  return Math.round(ms / 86400000)
}

type Props = {
  isOpen: boolean
  clinicalHistoryId: number
  accidentId?: number
  attentionId?: number
  onClose: () => void
  onSuccess: () => void
}

const MedicalRestFormSidebar = ({ isOpen, clinicalHistoryId, accidentId, attentionId, onClose, onSuccess }: Props) => {
  const [dateRange, setDateRange] = useState<DateRangeValue>({ from: '', to: '' })
  const [dateRangeError, setDateRangeError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [specialtyId, setSpecialtyId] = useState<string>('')
  const [specialtyError, setSpecialtyError] = useState<string | null>(null)

  const { isLoading, error, createMedicalRest, clearError } = useCreateMedicalRest()
  const { specialties } = useSearchSpecialties()

  useEffect(() => {
    if (!isOpen) return
    setDateRange({ from: '', to: '' })
    setDateRangeError(null)
    setFile(null)
    setSpecialtyId('')
    setSpecialtyError(null)
    clearError()
  }, [isOpen, clearError])

  const handleDateRangeChange = (val: DateRangeValue) => {
    setDateRange(val)
    if (val.from && val.to && diffDays(val.from, val.to) > MAX_REST_DAYS) {
      setDateRangeError(`El descanso médico no puede superar los ${MAX_REST_DAYS} días.`)
    } else {
      setDateRangeError(null)
    }
  }

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    let hasError = false

    if (!dateRange.from || !dateRange.to) {
      setDateRangeError('Selecciona el rango de fechas.')
      hasError = true
    } else if (diffDays(dateRange.from, dateRange.to) > MAX_REST_DAYS) {
      setDateRangeError(`El descanso médico no puede superar los ${MAX_REST_DAYS} días.`)
      hasError = true
    }

    if (!specialtyId) {
      setSpecialtyError('Selecciona una especialidad.')
      hasError = true
    }

    if (hasError) return

    setDateRangeError(null)
    setSpecialtyError(null)

    const result = await createMedicalRest(
      {
        clinicalHistoryId,
        accidentId,
        attentionId,
        specialtyId: Number(specialtyId),
        startDate: dateRange.from,
        endDate: dateRange.to,
        notes: (data.get('notes') as string).trim() || undefined,
      },
      file ?? undefined,
    )

    if (!result) return

    onSuccess()
    onClose()
  }

  const specialtyOptions = specialties.map((s) => ({ label: s.name, value: s.id }))

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      size='md'
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

        <SearchSelect
          label="Especialidad"
          placeholder="Buscar especialidad..."
          options={specialtyOptions}
          value={specialtyId}
          onChange={(val) => {
            setSpecialtyId(val)
            if (val) setSpecialtyError(null)
          }}
          error={specialtyError ?? undefined}
        />

        <div className="space-y-1">
          <DateRangeInput
            labelFrom="Fecha de inicio"
            labelTo="Fecha de fin"
            value={dateRange}
            onChange={handleDateRangeChange}
            maxDays={MAX_REST_DAYS}
          />
          {dateRangeError ? (
            <p className="px-1 text-xs text-red-500">{dateRangeError}</p>
          ) : null}
        </div>

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
