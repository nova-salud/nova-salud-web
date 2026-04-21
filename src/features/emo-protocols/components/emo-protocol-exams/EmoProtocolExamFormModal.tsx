import { useEffect, useMemo, useState } from 'react'
import { SortOrder } from '@/core/types/query-params.type'
import { Button, SearchSelect } from '@/shared/components/ui/form'
import { useExams } from '@/features/exams/hooks'
import type { FindExamsDto } from '@/features/exams/types'
import type {
  CreateEmoProtocolExamDto,
  EmoProtocolExamResponseDto,
  UpdateEmoProtocolExamDto,
} from '../../types'
import Modal from '@/shared/components/ui/modal/Modal'

type Mode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: Mode
  emoProtocolId: number
  emoProtocolExam?: EmoProtocolExamResponseDto | null
  existingExamIds: number[]
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateEmoProtocolExamDto) => void | Promise<void>
  onUpdate?: (id: number, dto: UpdateEmoProtocolExamDto) => void | Promise<void>
}

const EmoProtocolExamFormModal = ({
  isOpen,
  mode,
  emoProtocolId,
  existingExamIds,
  emoProtocolExam,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const [examId, setExamId] = useState('')
  const [isRequired, setIsRequired] = useState(true)
  const [orderIndex, setOrderIndex] = useState('1')

  const examsQuery = useMemo<FindExamsDto>(() => ({
    page: 1,
    pageSize: 100,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    isActive: true,
  }), [])

  const { data: exams } = useExams(examsQuery)

  useEffect(() => {
    if (!isOpen) return

    if (mode === 'edit' && emoProtocolExam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExamId(String(emoProtocolExam.examId))
      setIsRequired(emoProtocolExam.isRequired)
      setOrderIndex(String(emoProtocolExam.orderIndex))
      return
    }

    setExamId('')
    setIsRequired(true)
    setOrderIndex('1')
  }, [isOpen, mode, emoProtocolExam])

  const options = exams
  .filter((exam) => !existingExamIds.includes(exam.id))
  .map((item) => ({
    label: item.name,
    value: String(item.id),
  }))

  const handleSubmit = async () => {
    if (!examId || !orderIndex) return

    if (mode === 'create') {
      await onCreate?.({
        emoProtocolId,
        examId: Number(examId),
        isRequired,
        orderIndex: Number(orderIndex),
      })
      return
    }

    if (!emoProtocolExam) return

    await onUpdate?.(emoProtocolExam.id, {
      examId: Number(examId),
      isRequired,
      orderIndex: Number(orderIndex),
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Agregar examen al protocolo' : 'Editar examen del protocolo'}
      description="Selecciona el examen y configura su orden dentro del protocolo."
      size="md"
    >
      <div className="space-y-5">
        <SearchSelect
          label="Examen"
          value={examId}
          onChange={setExamId}
          options={options}
          placeholder="Buscar examen"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Orden</label>
            <input
              type="number"
              min={1}
              value={orderIndex}
              onChange={(e) => setOrderIndex(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#0B1739] focus:ring-2 focus:ring-[#0B1739]/10"
            />
          </div>

          <label className="mt-7 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
            Es obligatorio
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            className="w-auto"
            onClick={() => void handleSubmit()}
            isLoading={isLoading}
            loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
          >
            {mode === 'create' ? 'Agregar examen' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EmoProtocolExamFormModal