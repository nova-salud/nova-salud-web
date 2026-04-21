import { Input, Button } from '@/shared/components/ui/form'
import { useState, useEffect } from 'react'
import type { ExamResponseDto, CreateExamDto, UpdateExamDto } from '../types'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'

type ExamFormSidebarMode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: ExamFormSidebarMode
  exam?: ExamResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateExamDto) => void | Promise<void>
  onUpdate?: (id: number, dto: UpdateExamDto) => void | Promise<void>
}

const ExamFormSidebar = ({
  isOpen,
  mode,
  exam,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState(true)

  const updateExam = (exam?: ExamResponseDto | null) => {
    setName(exam?.name ?? '')
    setIsActive(exam?.isActive ?? true)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateExam(exam)
  }, [isOpen, mode, exam])

  const handleSubmit = async () => {
    if (!name.trim()) {
      return
    }

    if (mode === 'create') {
      await onCreate?.({
        name: name.trim()
      })
      return
    }

    if (!exam) {
      return
    }

    await onUpdate?.(exam.id, {
      name: name.trim(),
      isActive,
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nuevo examen' : 'Editar examen'}
      description={
        mode === 'create'
          ? 'Registra un nuevo examen en el catálogo.'
          : 'Actualiza la información del examen.'
      }
    >
      <form onSubmit={handleSubmit}>

        <div className="space-y-5">
          <Input
            label="Nombre"
            placeholder="Ej. Hemograma"
            value={name}
            onChange={setName}
          />

          {mode === 'edit' && <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Activo
          </label>}

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
              type="submit"
              className="w-auto"
              isLoading={isLoading}
              loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
            >
              {mode === 'create' ? 'Crear examen' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}

export default ExamFormSidebar