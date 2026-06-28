import { useRef, useState, useEffect } from 'react'
import { Paperclip, X } from 'lucide-react'
import { Button, Sidebar, Select, Textarea, Input } from '@/shared/components'
import { useCreateEmoLegacyRecord } from '../hooks/useCreateEmoLegacyRecord'
import type { ClinicalHistoryConclusion } from '../types/emo-legacy-record.types'

const EMO_TYPE_OPTIONS = [
  { label: 'Pre-Ocupacional', value: 'Pre-Ocupacional' },
  { label: 'Periódico', value: 'Periódico' },
  { label: 'Cambio de puesto', value: 'Cambio de puesto' },
  { label: 'Reincorporación', value: 'Reincorporación' },
  { label: 'Retiro', value: 'Retiro' },
]

const CONCLUSION_OPTIONS: { label: string; value: ClinicalHistoryConclusion }[] = [
  { label: 'Apto', value: 'APTO' },
  { label: 'Apto con restricciones', value: 'APTO_CON_RESTRICCIONES' },
  { label: 'No apto', value: 'NO_APTO' },
]

const today = () => new Date().toISOString().split('T')[0]

type Props = {
  isOpen: boolean
  clinicalHistoryId: number
  onClose: () => void
  onSuccess: () => void
}

const EmoLegacyRecordFormSidebar = ({ isOpen, clinicalHistoryId, onClose, onSuccess }: Props) => {
  const [evaluatedAt, setEvaluatedAt] = useState('')
  const [evaluatedAtError, setEvaluatedAtError] = useState<string | null>(null)
  const [emoType, setEmoType] = useState('')
  const [conclusion, setConclusion] = useState('')
  const [notes, setNotes] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { createRecord, isLoading, error, clearError } = useCreateEmoLegacyRecord()

  useEffect(() => {
    if (!isOpen) return
    setEvaluatedAt('')
    setEvaluatedAtError(null)
    setEmoType('')
    setConclusion('')
    setNotes('')
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    clearError()
  }, [isOpen, clearError])

  const validateDate = (value: string) => {
    if (!value) {
      setEvaluatedAtError('La fecha de evaluación es requerida.')
      return false
    }
    if (value > today()) {
      setEvaluatedAtError('La fecha de evaluación no puede ser futura.')
      return false
    }
    setEvaluatedAtError(null)
    return true
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEvaluatedAt(value)
    if (evaluatedAtError) validateDate(value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null)
  }

  const handleClearFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateDate(evaluatedAt)) return

    const result = await createRecord(
      {
        clinicalHistoryId,
        evaluatedAt,
        emoType: emoType || undefined,
        conclusion: (conclusion as ClinicalHistoryConclusion) || undefined,
        notes: notes || undefined,
      },
      file ?? undefined,
    )

    if (result) {
      onSuccess()
      onClose()
    }
  }

  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Agregar registro histórico">
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Input
            label="Fecha de evaluación"
            name="evaluatedAt"
            type="date"
            value={evaluatedAt}
            onChange={handleDateChange}
            max={today()}
            required
          />
          {evaluatedAtError && (
            <p className="text-xs text-red-600">{evaluatedAtError}</p>
          )}
        </div>

        <Select
          label="Tipo de EMO"
          name="emoType"
          value={emoType}
          onChange={setEmoType}
          options={EMO_TYPE_OPTIONS}
          placeholder="Seleccionar tipo"
        />

        <Select
          label="Conclusión"
          name="conclusion"
          value={conclusion}
          onChange={setConclusion}
          options={CONCLUSION_OPTIONS}
          placeholder="Seleccionar conclusión"
        />

        <Textarea
          label="Observaciones"
          value={notes}
          onChange={setNotes}
          rows={3}
          placeholder="Notas adicionales..."
        />

        {/* File input nativo para evitar problemas de ref dentro de portales */}
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Adjunto (PDF o imagen)</span>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            {file ? (
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Paperclip className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="truncate text-sm text-slate-700">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center justify-between gap-2">
                <span className="text-sm text-slate-500">Selecciona un archivo</span>
                <span className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  Elegir archivo
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="flex-1" isLoading={isLoading} loadingText="Guardando...">
            Guardar
          </Button>
        </div>
      </form>
    </Sidebar>
  )
}

export default EmoLegacyRecordFormSidebar
