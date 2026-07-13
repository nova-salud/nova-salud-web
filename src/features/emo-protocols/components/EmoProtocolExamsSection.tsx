import { cn } from '@/shared/utils'
import {
  useCreateEmoProtocolExam,
  useRemoveEmoProtocolExam,
} from '../hooks'
import type {
  CreateEmoProtocolExamDto,
  EmoProtocolExamResponseDto,
} from '../types'
import { useDisclosure } from '@/shared/hooks'
import { EmoProtocolExamsSkeleton } from './EmoProtocolExamsSkeleton'
import { Button } from '@/shared/components'
import { EmoProtocolExamFormModal } from './EmoProtocolExamFormModal'
import { DeleteEmoProtocolExamModal } from './DeleteEmoProtocolExamModal'
import { useState } from 'react'

type Props = {
  emoProtocolId: number
  items: EmoProtocolExamResponseDto[]
  isLoading?: boolean
  onRefresh: () => Promise<void> | void
}

type OverlayKey = 'create' | 'edit' | 'delete'

export const EmoProtocolExamsSection = ({
  emoProtocolId,
  items,
  isLoading = false,
  onRefresh,
}: Props) => {
  const overlays = useDisclosure<OverlayKey>()
  const [examToDelete, setExamToDelete] = useState<EmoProtocolExamResponseDto | null>(null)

  const existingExamIds = items.map(item => item.examId)

  const {
    createEmoProtocolExam,
    isLoading: isCreating,
  } = useCreateEmoProtocolExam()

  const {
    removeEmoProtocolExam,
    isLoading: isRemoving,
  } = useRemoveEmoProtocolExam()

  const handleOpenCreate = () => {
    overlays.open('create')
  }

  const handleCloseModal = () => {
    overlays.close()
  }

  const handleCreate = async (dto: CreateEmoProtocolExamDto) => {
    const result = await createEmoProtocolExam(dto)
    if (!result) return

    await onRefresh()
    handleCloseModal()
  }

  const handleOpenDelete = (item: EmoProtocolExamResponseDto) => {
    setExamToDelete(item)
    overlays.open('delete')
  }

  const handleCloseDelete = () => {
    overlays.close()
    setExamToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!examToDelete) return

    await removeEmoProtocolExam(examToDelete.id)
    await onRefresh()
    handleCloseDelete()
  }

  if (isLoading) {
    return <EmoProtocolExamsSkeleton  />
  }

  return (
    <>
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
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
                className="flex flex-col justify-between rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-lg transition hover:border-slate-400"
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
                    disabled={items.length === 1}
                    title={
                      items.length === 1
                        ? 'Debes mantener al menos un examen en el protocolo'
                        : undefined
                    }
                    onClick={() => handleOpenDelete(item)}
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
        isOpen={overlays.isOpen('create')}
        mode="create"
        emoProtocolId={emoProtocolId}
        existingExamIds={existingExamIds}
        isLoading={isCreating}
        onClose={handleCloseModal}
        onCreate={handleCreate}
      />

      <DeleteEmoProtocolExamModal
        isOpen={overlays.isOpen('delete')}
        item={examToDelete}
        isLoading={isRemoving}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}