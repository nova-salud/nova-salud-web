import { useNavigate, useParams } from 'react-router'
import { useDisclosure } from '@/shared/hooks'
import { Button, EntityState, Modal, PageContainer } from '@/shared/components'
import {
  useAssignOrUnassignEmoProtocolArea,
  useAssignOrUnassignEmoProtocolPosition,
  useDeleteEmoProtocol,
  useEmoProtocol,
  useEmoProtocolExams,
  useUpdateEmoProtocol,
} from '../hooks'
import { AssignAreaToEmoProtocolModal, AssignPositionToEmoProtocolModal, EmoProtocolAreasSection, EmoProtocolDetailSkeleton, EmoProtocolExamsSection, EmoProtocolFormSidebar, EmoProtocolPositionsSection } from '../components'
import type { UpdateEmoProtocolDto } from '../types'

type EmoProtocolDetailOverlaysKey = 'assign-area' | 'assign-position' | 'delete' | 'edit'

const EmoProtocolDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const emoProtocolId = Number(id)

  const { data: emo, isLoading, error, refetch } = useEmoProtocol(emoProtocolId)
  const overlays = useDisclosure<EmoProtocolDetailOverlaysKey>()

  const {
    updateEmoProtocol,
    isLoading: isUpdating,
  } = useUpdateEmoProtocol()

  const {
    data: protocolExams,
    isLoading: isLoadingProtocolExams,
    error: protocolExamsError,
    refetch: refetchProtocolExams,
  } = useEmoProtocolExams(emoProtocolId)

  const { assignOrUnassignArea } = useAssignOrUnassignEmoProtocolArea({
    successMessage: 'Área desasignada correctamente',
  })

  const { assignOrUnassignPosition } = useAssignOrUnassignEmoProtocolPosition({
    successMessage: 'Puesto desasignado correctamente',
  })

  const { deleteEmoProtocol, isLoading: isDeleting } = useDeleteEmoProtocol()

  const handleUnassignArea = async (areaId: number) => {
    if (!emo) return
    const result = await assignOrUnassignArea(emo.id, areaId)
    if (!result) return
    await refetch()
  }

  const handleUnassignPosition = async (positionId: number) => {
    if (!emo) return
    const result = await assignOrUnassignPosition(emo.id, positionId)
    if (!result) return
    await refetch()
  }

  const handleUpdateEmoProtocol = async (
    id: number,
    dto: UpdateEmoProtocolDto,
  ) => {
    const result = await updateEmoProtocol(id, dto)

    if (!result) {
      return
    }

    await refetch()
    overlays.close()
  }

  const handleDelete = async () => {
    if (!emo) return
    const ok = await deleteEmoProtocol(emo.id)
    if (ok === null) return
    void navigate('/emo-protocols')
  }

  if (isLoading) return <EmoProtocolDetailSkeleton />

  if (error) {
    return (
      <EntityState
        title="Ocurrió un error"
        description={error.message}
        actionText="Reintentar"
        onAction={refetch}
      />
    )
  }

  if (!emo) {
    return (
      <EntityState
        title="Protocolo EMO no encontrado"
        description="El protocolo EMO que intentas consultar no existe o fue eliminado."
        actionText="Regresar"
        onAction={() => navigate('/emo-protocols')}
      />
    )
  }

  return (
    <>
      <PageContainer
        title={emo.name}
        description="Gestiona la configuración del protocolo EMO."
        action={(
          <div className='flex items-center gap-x-2'>
            <Button
              type="button"
              variant="primary"
              onClick={() => overlays.open('edit')}
            >
              Editar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => overlays.open('delete')}
              className="w-auto border-red-200 text-red-600 hover:bg-red-50"
            >
              Eliminar
            </Button>
          </div>
        )
        }
      >
        <div className="space-y-5">
          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Nombre
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {emo.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Estado
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {emo.isActive ? 'Activo' : 'Inactivo'}
                </p>
              </div>
            </div>
          </div>

          <EmoProtocolAreasSection
            areas={emo.areas}
            onAssignArea={() => overlays.open('assign-area')}
            onUnassignArea={handleUnassignArea}
          />

          <EmoProtocolPositionsSection
            positions={emo.positions}
            onAssignPosition={() => overlays.open('assign-position')}
            onUnassignPosition={handleUnassignPosition}
          />

          {protocolExamsError ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {protocolExamsError?.message}
            </div>
          ) : null}

          <EmoProtocolExamsSection
            emoProtocolId={emo.id}
            items={protocolExams}
            isLoading={isLoadingProtocolExams}
            onRefresh={() => void refetchProtocolExams()}
          />
        </div>
      </PageContainer>

      <AssignAreaToEmoProtocolModal
        isOpen={overlays.isOpen('assign-area')}
        emoProtocol={emo}
        onClose={overlays.close}
        onSuccess={() => void refetch()}
      />

      <AssignPositionToEmoProtocolModal
        isOpen={overlays.isOpen('assign-position')}
        emoProtocol={emo}
        onClose={overlays.close}
        onSuccess={() => void refetch()}
      />

      <EmoProtocolFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        emoProtocol={emo}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdateEmoProtocol}
      />

      <Modal
        isOpen={overlays.isOpen('delete')}
        onClose={overlays.close}
        title="Eliminar protocolo EMO"
        description="Esta acción no se puede deshacer."
        size="sm"
      >
        <p className="mb-6 text-sm text-slate-600">
          ¿Estás seguro que deseas eliminar el protocolo{' '}
          <span className="font-semibold text-slate-900">{emo.name}</span>?
          Las áreas que lo tenían asignado quedarán sin protocolo.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={overlays.close}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            className="w-auto bg-red-600 hover:bg-red-700"
            isLoading={isDeleting}
            loadingText="Eliminando..."
            onClick={() => void handleDelete()}
          >
            Eliminar
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default EmoProtocolDetailPage
