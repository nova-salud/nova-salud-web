import { useNavigate } from 'react-router'
import { Button, PageContainer } from '@/shared/components'
import { useCreateEmoProtocol, useEmoProtocols } from '../hooks'
import type {
  CreateEmoProtocolDto,
  EmoProtocolResponseDto,
} from '../types'
import { useDisclosure } from '@/shared/hooks'
import { EmoProtocolFilter, EmoProtocolFormSidebar, EmoProtocolTable } from '../components'

type EmoProtocolOverlayKey = 'create' | 'edit'

const EmoProtocolsPage = () => {
  const navigate = useNavigate()

  const { data, isLoading, error, refetch, pagination, onChangeFilters } = useEmoProtocols()

  const overlays = useDisclosure<EmoProtocolOverlayKey>()

  const {
    isLoading: isCreatingEmoProtocol,
    createEmoProtocol,
  } = useCreateEmoProtocol()

  const handleOpenDetailPage = (emoProtocol: EmoProtocolResponseDto) => {
    navigate(`/emo-protocols/${emoProtocol.id}`)
  }

  const handleCreateEmoProtocol = async (dto: CreateEmoProtocolDto) => {
    const result = await createEmoProtocol(dto)

    if (!result) {
      return
    }

    await refetch()
    overlays.close()
  }

  return (
    <>
      <PageContainer
        title="Protocolos EMO"
        description="Administra los protocolos EMO del sistema."
        action={(
          <Button
            type="button"
            className="w-auto"
            onClick={() => overlays.open('create')}
          >
            Nuevo protocolo
          </Button>
        )}
      >
        <div className="space-y-5">
          <EmoProtocolFilter onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <EmoProtocolTable
            items={data}
            isLoading={isLoading}
            onViewDetail={handleOpenDetailPage}
            pagination={pagination}
          />
        </div>
      </PageContainer>

      <EmoProtocolFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreatingEmoProtocol}
        onClose={overlays.close}
        onCreate={handleCreateEmoProtocol}
      />

    </>
  )
}

export default EmoProtocolsPage