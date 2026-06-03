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
  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = (data.get('name') as string).trim()
    if (!name) return

    const nextEmoDaysFit = Number(data.get('nextEmoDaysFit'))
    const nextEmoDaysFitWithRestrictions = Number(data.get('nextEmoDaysFitWithRestrictions'))

    if (mode === 'create') {
      await onCreate?.({ name, nextEmoDaysFit, nextEmoDaysFitWithRestrictions })
      return
    }

    if (!emoProtocol) return

    await onUpdate?.(emoProtocol.id, {
      name,
      isActive: data.get('isActive') === 'on',
      nextEmoDaysFit,
      nextEmoDaysFitWithRestrictions,
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nuevo protocolo EMO' : 'Editar protocolo EMO'}
      description={
        mode === 'create'
          ? 'Registra un nuevo protocolo EMO.'
          : 'Actualiza la información del protocolo EMO.'
      }
    >
      <form
        key={`${mode}-${emoProtocol?.id ?? 'new'}`}
        onSubmit={(e) => void handleSubmit(e)}
      >
        <div className="space-y-5">
          <Input
            label="Nombre"
            name="name"
            type="text"
            placeholder="Ej. Protocolo administrativo"
            defaultValue={emoProtocol?.name}
          />

          <Input
            label="Días recurrentes - Personal Apto"
            name="nextEmoDaysFit"
            type="number"
            placeholder="Ej. 365"
            defaultValue={emoProtocol?.nextEmoDaysFit ?? 365}
          />

          <Input
            label="Días recurrentes - Personal Apto con restricciones"
            name="nextEmoDaysFitWithRestrictions"
            type="number"
            placeholder="Ej. 180"
            defaultValue={emoProtocol?.nextEmoDaysFitWithRestrictions ?? 180}
          />

          {mode === 'edit' && (
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={emoProtocol?.isActive ?? true}
              />
              Activo
            </label>
          )}

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
              {mode === 'create' ? 'Crear protocolo' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}

export default EmoProtocolFormSidebar
