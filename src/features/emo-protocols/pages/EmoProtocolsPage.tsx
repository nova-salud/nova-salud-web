import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { SortOrder } from '@/core/types/query-params.type'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Select } from '@/shared/components/ui/form'
import EmoProtocolFormSidebar from '../components/EmoProtocolFormSidebar'
import EmoProtocolTable from '../components/EmoProtocolTable'
import { useCreateEmoProtocol, useEmoProtocols, useUpdateEmoProtocol } from '../hooks'
import type {
  CreateEmoProtocolDto,
  EmoProtocolResponseDto,
  FindEmoProtocolsDto,
  UpdateEmoProtocolDto,
} from '../types'

type EmoProtocolSidebarMode = 'create' | 'edit' | null

const EMO_PROTOCOL_STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

const EmoProtocolsPage = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState('')
  const [selectedEmoProtocol, setSelectedEmoProtocol] = useState<EmoProtocolResponseDto | null>(null)
  const [sidebarMode, setSidebarMode] = useState<EmoProtocolSidebarMode>(null)

  const query = useMemo<FindEmoProtocolsDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    search: name.trim() || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [name, isActive])

  const { data, isLoading, error, refetch } = useEmoProtocols(query)

  const {
    isLoading: isCreatingEmoProtocol,
    createEmoProtocol,
  } = useCreateEmoProtocol()

  const {
    isLoading: isUpdatingEmoProtocol,
    updateEmoProtocol,
  } = useUpdateEmoProtocol()

  const handleCloseSidebars = () => {
    setSidebarMode(null)
    setSelectedEmoProtocol(null)
  }

  const handleOpenCreateSidebar = () => {
    setSelectedEmoProtocol(null)
    setSidebarMode('create')
  }

  const handleOpenEditSidebar = (emoProtocol: EmoProtocolResponseDto) => {
    setSelectedEmoProtocol(emoProtocol)
    setSidebarMode('edit')
  }

  const handleOpenDetailPage = (emoProtocol: EmoProtocolResponseDto) => {
    navigate(`/emo-protocols/${emoProtocol.id}`)
  }

  const handleCreateEmoProtocol = async (dto: CreateEmoProtocolDto) => {
    const result = await createEmoProtocol(dto)

    if (!result) {
      return
    }

    await refetch()
    handleCloseSidebars()
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
    handleCloseSidebars()
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
            onClick={handleOpenCreateSidebar}
          >
            Nuevo protocolo
          </Button>
        )}
      >
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              <Input
                label="Nombre"
                placeholder="Buscar por nombre"
                value={name}
                onChange={setName}
              />

              <Select
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={EMO_PROTOCOL_STATUS_OPTIONS}
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <EmoProtocolTable
            items={data}
            isLoading={isLoading}
            onEdit={handleOpenEditSidebar}
            onViewDetail={handleOpenDetailPage}
          />
        </div>
      </PageContainer>

      <EmoProtocolFormSidebar
        isOpen={sidebarMode === 'create'}
        mode="create"
        isLoading={isCreatingEmoProtocol}
        onClose={handleCloseSidebars}
        onCreate={handleCreateEmoProtocol}
      />

      <EmoProtocolFormSidebar
        isOpen={sidebarMode === 'edit'}
        mode="edit"
        emoProtocol={selectedEmoProtocol}
        isLoading={isUpdatingEmoProtocol}
        onClose={handleCloseSidebars}
        onUpdate={handleUpdateEmoProtocol}
      />
    </>
  )
}

export default EmoProtocolsPage