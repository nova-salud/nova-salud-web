import { useState, useEffect } from 'react'
import { Button, Input, Select, Sidebar } from '@/shared/components'
import type { CreateEmoProtocolDto, EmoProtocolResponseDto, UpdateEmoProtocolDto } from '../types'
import { EMO_CYCLE_TYPE_OPTIONS } from '@/features/clinical-histories/emo-cycles/types/emo-cycle-type.constants'
import { useSearchExams } from '../hooks/useSearchExams'
import { toastService } from '@/core/services/toast.service'

type EmoProtocolFormSidebarMode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: EmoProtocolFormSidebarMode
  emoProtocol?: EmoProtocolResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateEmoProtocolDto) => void | Promise<void>
  onUpdate?: (id: number, dto: UpdateEmoProtocolDto) => void | Promise<void>
}

const EMO_TYPE_SELECT_OPTIONS = [
  { label: 'Sin tipo', value: '' },
  ...EMO_CYCLE_TYPE_OPTIONS,
]

export const EmoProtocolFormSidebar = ({
  isOpen,
  mode,
  emoProtocol,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const [emoType, setEmoType] = useState(emoProtocol?.emoType ?? '')
  const [examIds, setExamIds] = useState<number[]>([])

  const { exams } = useSearchExams()

  useEffect(() => {
    setEmoType(emoProtocol?.emoType ?? '')
  }, [emoProtocol])

  useEffect(() => {
    if (isOpen && mode === 'create') {
      setExamIds([])
    }
  }, [isOpen, mode])

  const toggleExam = (examId: number) => {
    setExamIds((prev) =>
      prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId],
    )
  }

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = (data.get('name') as string).trim()
    if (!name) return

    const daysToExpire = Number(data.get('daysToExpire'))
    const nextEmoDaysFit = Number(data.get('nextEmoDaysFit'))
    const nextEmoDaysFitWithRestrictions = Number(data.get('nextEmoDaysFitWithRestrictions'))

    if (mode === 'create') {
      if (examIds.length === 0) {
        toastService.error('Debes seleccionar al menos un examen para el protocolo.')
        return
      }

      await onCreate?.({
        name,
        examIds,
        emoType: emoType || undefined,
        daysToExpire,
        nextEmoDaysFit,
        nextEmoDaysFitWithRestrictions,
      })
      return
    }

    if (!emoProtocol) return

    await onUpdate?.(emoProtocol.id, {
      name,
      emoType: emoType || undefined,
      daysToExpire,
      isActive: data.get('isActive') === 'on',
      nextEmoDaysFit,
      nextEmoDaysFitWithRestrictions,
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nuevo protocolo EMO' : 'Editar protocolo EMO'}
      description={
        mode === 'create'
          ? 'Registra un nuevo protocolo EMO.'
          : 'Actualiza la información del protocolo EMO.'
      }
    >
      <form
        key={`${mode}-${emoProtocol?.id ?? 'new'}`}
        onSubmit={(e) => void handleSubmit(e)}
      >
        <div className="space-y-5">
          <Input
            label="Nombre"
            name="name"
            type="text"
            required
            placeholder="Ej. Protocolo administrativo"
            value={emoProtocol?.name}
          />

          <Select
            label="Tipo de EMO"
            name="emoType"
            value={emoType}
            onChange={setEmoType}
            options={EMO_TYPE_SELECT_OPTIONS}
          />

          <Input
            label="Días para completar el EMO"
            name="daysToExpire"
            type="number"
            placeholder="Ej. 365"
            value={emoProtocol?.daysToExpire ?? 365}
          />

          <Input
            label="Días recurrentes - Personal Apto"
            name="nextEmoDaysFit"
            type="number"
            placeholder="Ej. 365"
            value={emoProtocol?.nextEmoDaysFit ?? 365}
          />

          <Input
            label="Días recurrentes - Personal Apto con restricciones"
            name="nextEmoDaysFitWithRestrictions"
            type="number"
            placeholder="Ej. 180"
            value={emoProtocol?.nextEmoDaysFitWithRestrictions ?? 180}
          />

          {mode === 'edit' && (
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={emoProtocol?.isActive ?? true}
              />
              Activo
            </label>
          )}

          {mode === 'create' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Exámenes</label>
              <div className="max-h-56 space-y-2 overflow-y-auto rounded-2xl border border-slate-200 p-3">
                {exams.length === 0 ? (
                  <p className="text-sm text-slate-500">No hay exámenes disponibles.</p>
                ) : (
                  exams.map((exam) => (
                    <label
                      key={exam.id}
                      className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={examIds.includes(exam.id)}
                        onChange={() => toggleExam(exam.id)}
                      />
                      {exam.name}
                    </label>
                  ))
                )}
              </div>
              <p className="text-xs text-slate-500">Selecciona al menos un examen.</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" className="w-auto" onClick={onClose}>
              Cancelar
            </Button>

            <Button
              type="submit"
              className="w-auto"
              isLoading={isLoading}
              disabled={mode === 'create' && examIds.length === 0}
              loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
            >
              {mode === 'create' ? 'Crear protocolo' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}