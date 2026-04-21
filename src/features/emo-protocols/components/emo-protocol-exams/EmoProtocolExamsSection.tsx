import { useState } from 'react'
import { Button } from '@/shared/components/ui/form'
import EmoProtocolExamFormModal from './EmoProtocolExamFormModal'
import {
  useCreateEmoProtocolExam,
  useRemoveEmoProtocolExam,
  useUpdateEmoProtocolExam,
} from '../../hooks'
import type {
  CreateEmoProtocolExamDto,
  EmoProtocolExamResponseDto,
  UpdateEmoProtocolExamDto,
} from '../../types'
import { cn } from '@/shared/utils'
import EmoProtocolExamsSkeleton from './EmoProtocolExamsSkeleton'

type Props = {
  emoProtocolId: number
  items: EmoProtocolExamResponseDto[]
  isLoading?: boolean
  onRefresh: () => Promise<void> | void
}

type ModalMode = 'create' | 'edit' | null

const EmoProtocolExamsSection = ({
  emoProtocolId,
  items,
  isLoading = false,
  onRefresh,
}: Props) => {
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedItem, setSelectedItem] = useState<EmoProtocolExamResponseDto | null>(null)

  const existingExamIds = items.map(item => item.examId)

  const {
    createEmoProtocolExam,
    isLoading: isCreating,
  } = useCreateEmoProtocolExam()

  const {
    updateEmoProtocolExam,
    isLoading: isUpdating,
  } = useUpdateEmoProtocolExam()

  const {
    removeEmoProtocolExam,
    isLoading: isRemoving,
  } = useRemoveEmoProtocolExam()

  const handleOpenCreate = () => {
    setSelectedItem(null)
    setModalMode('create')
  }

  const handleOpenEdit = (item: EmoProtocolExamResponseDto) => {
    setSelectedItem(item)
    setModalMode('edit')
  }

  const handleCloseModal = () => {
    setModalMode(null)
    setSelectedItem(null)
  }

  const handleCreate = async (dto: CreateEmoProtocolExamDto) => {
    const result = await createEmoProtocolExam(dto)
    if (!result) return

    await onRefresh()
    handleCloseModal()
  }

  const handleUpdate = async (id: number, dto: UpdateEmoProtocolExamDto) => {
    const result = await updateEmoProtocolExam(id, dto)
    if (!result) return

    await onRefresh()
    handleCloseModal()
  }

  const handleDelete = async (item: EmoProtocolExamResponseDto) => {
    const confirmed = window.confirm(`¿Eliminar "${item.examName ?? 'este examen'}" del protocolo?`)
    if (!confirmed) return

    await removeEmoProtocolExam(item.id)
    await onRefresh()
  }

  if (isLoading) {
    return <EmoProtocolExamsSkeleton  />
  }

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Exámenes del protocolo</h2>
            <p className="text-sm text-slate-500">
              Configura los exámenes que forman parte de este protocolo EMO.
            </p>
          </div>

          <Button
            type="button"
            className="w-auto"
            onClick={handleOpenCreate}
          >
            Agregar examen
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
            No hay exámenes configurados en este protocolo.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-slate-900 leading-5">
                    {item.examName ?? '—'}
                  </h3>

                  <span
                    className={cn(
                      'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                      item.isRequired
                        ? 'border-amber-100 bg-amber-50 text-amber-700'
                        : 'border-slate-200 bg-slate-50 text-slate-500',
                    )}
                  >
                    {item.isRequired ? 'Obligatorio' : 'Opcional'}
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-400">
                  Orden #{item.orderIndex}
                </div>

                <div className="mt-4 flex justify-start gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-auto rounded-xl px-3 py-2 text-xs"
                    onClick={() => handleOpenEdit(item)}
                  >
                    Editar
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-auto rounded-xl px-3 py-2 text-xs"
                    onClick={() => void handleDelete(item)}
                    isLoading={isRemoving}
                    loadingText='Eliminando...'
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EmoProtocolExamFormModal
        isOpen={modalMode === 'create'}
        mode="create"
        emoProtocolId={emoProtocolId}
        existingExamIds={existingExamIds}
        isLoading={isCreating}
        onClose={handleCloseModal}
        onCreate={handleCreate}
      />

      <EmoProtocolExamFormModal
        isOpen={modalMode === 'edit'}
        mode="edit"
        emoProtocolId={emoProtocolId}
        emoProtocolExam={selectedItem}
        existingExamIds={existingExamIds}
        isLoading={isUpdating}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default EmoProtocolExamsSection