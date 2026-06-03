import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import Modal from '@/shared/components/ui/modal/Modal'
import { Button } from '@/shared/components/ui/form'
import AssignAreaToEmoProtocolModal from '../components/AssignAreaToEmoProtocolModal'
import AssignPositionToEmoProtocolModal from '../components/AssignPositionToEmoProtocolModal'
import EmoProtocolAreasSection from '../components/EmoProtocolAreasSection'
import EmoProtocolPositionsSection from '../components/EmoProtocolPositionsSection'
import EmoProtocolExamsSection from '../components/emo-protocol-exams/EmoProtocolExamsSection'
import {
  useAssignOrUnassignEmoProtocolArea,
  useAssignOrUnassignEmoProtocolPosition,
  useDeleteEmoProtocol,
  useEmoProtocol,
  useEmoProtocolExams,
} from '../hooks'

const EmoProtocolDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const emoProtocolId = Number(id)

  const [isAssignAreaModalOpen, setIsAssignAreaModalOpen] = useState(false)
  const [isAssignPositionModalOpen, setIsAssignPositionModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data, isLoading, error, refetch } = useEmoProtocol(emoProtocolId)

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
    if (!data) return
    const result = await assignOrUnassignArea(data.id, areaId)
    if (!result) return
    await refetch()
  }

  const handleUnassignPosition = async (positionId: number) => {
    if (!data) return
    const result = await assignOrUnassignPosition(data.id, positionId)
    if (!result) return
    await refetch()
  }

  const handleDelete = async () => {
    if (!data) return
    const ok = await deleteEmoProtocol(data.id)
    if (ok === null) return
    void navigate('/emo-protocols')
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!data) {
    return <div>No se encontró el protocolo EMO.</div>
  }

  return (
    <>
      <PageContainer
        title={`Protocolo EMO #${data.id}`}
        description="Gestiona la configuración del protocolo EMO."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-auto border-red-200 text-red-600 hover:bg-red-50"
          >
            Eliminar
          </Button>
        }
      >
        <div className="space-y-5">
          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Nombre
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {data.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Estado
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {data.isActive ? 'Activo' : 'Inactivo'}
                </p>
              </div>
            </div>
          </div>

          <EmoProtocolAreasSection
            areas={data.areas}
            onAssignArea={() => setIsAssignAreaModalOpen(true)}
            onUnassignArea={handleUnassignArea}
          />

          <EmoProtocolPositionsSection
            positions={data.positions}
            onAssignPosition={() => setIsAssignPositionModalOpen(true)}
            onUnassignPosition={handleUnassignPosition}
          />

          {protocolExamsError ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {protocolExamsError}
            </div>
          ) : null}

          <EmoProtocolExamsSection
            emoProtocolId={data.id}
            items={protocolExams}
            isLoading={isLoadingProtocolExams}
            onRefresh={refetchProtocolExams}
          />
        </div>
      </PageContainer>

      <AssignAreaToEmoProtocolModal
        isOpen={isAssignAreaModalOpen}
        emoProtocol={data}
        onClose={() => setIsAssignAreaModalOpen(false)}
        onSuccess={() => void refetch()}
      />

      <AssignPositionToEmoProtocolModal
        isOpen={isAssignPositionModalOpen}
        emoProtocol={data}
        onClose={() => setIsAssignPositionModalOpen(false)}
        onSuccess={() => void refetch()}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar protocolo EMO"
        description="Esta acción no se puede deshacer."
        size="sm"
      >
        <p className="mb-6 text-sm text-slate-600">
          ¿Estás seguro que deseas eliminar el protocolo{' '}
          <span className="font-semibold text-slate-900">{data.name}</span>?
          Las áreas que lo tenían asignado quedarán sin protocolo.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={() => setIsDeleteModalOpen(false)}
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
