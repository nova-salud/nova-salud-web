import { useState } from 'react'
import { useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import AssignAreaToEmoProtocolModal from '../components/AssignAreaToEmoProtocolModal'
import EmoProtocolAreasSection from '../components/EmoProtocolAreasSection'
import EmoProtocolExamsSection from '../components/emo-protocol-exams/EmoProtocolExamsSection'
import { useAssignOrUnassignEmoProtocolArea, useEmoProtocol, useEmoProtocolExams } from '../hooks'

const EmoProtocolDetailPage = () => {
  const { id } = useParams()
  const emoProtocolId = Number(id)

  const [isAssignAreaModalOpen, setIsAssignAreaModalOpen] = useState(false)

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useEmoProtocol(emoProtocolId)

  const {
    data: protocolExams,
    isLoading: isLoadingProtocolExams,
    error: protocolExamsError,
    refetch: refetchProtocolExams,
  } = useEmoProtocolExams(emoProtocolId)

  const {
    assignOrUnassignArea
  } = useAssignOrUnassignEmoProtocolArea({
    successMessage: 'Área desasignada correctamente'
  })

  const handleUnassignArea = async (areaId: number) => {
    if (!data) return

    const result = await assignOrUnassignArea(data.id, areaId)

    if (!result) return

    await refetch()
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
    </>
  )
}

export default EmoProtocolDetailPage