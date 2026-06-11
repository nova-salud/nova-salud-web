import { Input, Button, Sidebar } from '@/shared/components'
import type { AllergyTypeResponseDto, CreateAllergyTypeDto, UpdateAllergyTypeDto } from '../types'

type Mode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: Mode
  allergyType?: AllergyTypeResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateAllergyTypeDto) => void | Promise<void>
  onUpdate?: (id: number, dto: UpdateAllergyTypeDto) => void | Promise<void>
}

const AllergyTypeFormSidebar = ({
  isOpen,
  mode,
  allergyType,
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

    if (mode === 'create') {
      await onCreate?.({ name })
      return
    }

    if (!allergyType) return

    await onUpdate?.(allergyType.id, {
      name,
      isActive: data.get('isActive') === 'on',
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nuevo tipo de alergia' : 'Editar tipo de alergia'}
      description={
        mode === 'create'
          ? 'Registra un nuevo tipo de alergia configurable.'
          : 'Actualiza el nombre del tipo de alergia.'
      }
    >
      <form
        key={`${mode}-${allergyType?.id ?? 'new'}`}
        onSubmit={(e) => void handleSubmit(e)}
      >
        <div className="space-y-5">
          <Input
            label="Nombre"
            name="name"
            type="text"
            required
            placeholder="Ej. Cutánea"
            value={allergyType?.name}
          />

          {mode === 'edit' && (
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={allergyType?.isActive ?? true}
              />
              Activo
            </label>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" className="w-auto" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-auto"
              isLoading={isLoading}
              loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
            >
              {mode === 'create' ? 'Crear tipo' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}

export default AllergyTypeFormSidebar
