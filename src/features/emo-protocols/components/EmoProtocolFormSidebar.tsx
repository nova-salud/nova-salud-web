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
  const [nextEmoDaysFit, setNextEmoDaysFit] = useState(365)
  const [nextEmoDaysFitWithRestrictions, setNextEmoDaysFitWithRestrictions] = useState(180)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (mode === 'edit' && emoProtocol) {
      setName(emoProtocol.name)
      setIsActive(emoProtocol.isActive)
      setNextEmoDaysFit(emoProtocol.nextEmoDaysFit)
      setNextEmoDaysFitWithRestrictions(emoProtocol.nextEmoDaysFitWithRestrictions)
      return
    }

    setName('')
    setIsActive(true)
    setNextEmoDaysFit(365)
    setNextEmoDaysFitWithRestrictions(180)
  }, [isOpen, mode, emoProtocol])

  const handleSubmit = async () => {
    if (!name.trim()) {
      return
    }

    if (mode === 'create') {
      await onCreate?.({
        name: name.trim(),
        nextEmoDaysFit,
        nextEmoDaysFitWithRestrictions
      })
      return
    }

    if (!emoProtocol) {
      return
    }

    await onUpdate?.(emoProtocol.id, {
      name: name.trim(),
      isActive,
      nextEmoDaysFit,
      nextEmoDaysFitWithRestrictions
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
          onChange={(val) => setName(String(val))}
        />

        <Input
          label="Días recurrentes - Personal Apto"
          placeholder="Ej. 365"
          value={nextEmoDaysFit}
          onChange={(val) => setNextEmoDaysFit(+val)}
          type='number'
        />

        <Input
          label="Días recurrentes - Personal Apto con restricciones"
          placeholder="Ej. 180"
          value={nextEmoDaysFitWithRestrictions}
          onChange={(val) => setNextEmoDaysFitWithRestrictions(+val)}
          type='number'
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