import { useEffect, useState } from 'react'
import { Button, Input } from '@/shared/components/ui/form'
import type {
  CreateEmoProtocolDto,
  EmoProtocolResponseDto,
  UpdateEmoProtocolDto,
} from '../types'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'

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

const EmoProtocolFormSidebar = ({
  isOpen,
  mode,
  emoProtocol,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (mode === 'edit' && emoProtocol) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(emoProtocol.name)
      setIsActive(emoProtocol.isActive)
      return
    }

    setName('')
    setIsActive(true)
  }, [isOpen, mode, emoProtocol])

  const handleSubmit = async () => {
    if (!name.trim()) {
      return
    }

    if (mode === 'create') {
      await onCreate?.({
        name: name.trim(),
      })
      return
    }

    if (!emoProtocol) {
      return
    }

    await onUpdate?.(emoProtocol.id, {
      name: name.trim(),
      isActive,
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nuevo protocolo EMO' : 'Editar protocolo EMO'}
      description={mode === 'create'
        ? 'Registra un nuevo protocolo EMO.'
        : 'Actualiza la información del protocolo EMO.'}
    >
      <div className="space-y-5">
        <Input
          label="Nombre"
          placeholder="Ej. Protocolo administrativo"
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
            type="button"
            className="w-auto"
            onClick={() => void handleSubmit()}
            isLoading={isLoading}
            loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
          >
            {mode === 'create' ? 'Crear protocolo' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </Sidebar>
  )
}

export default EmoProtocolFormSidebar