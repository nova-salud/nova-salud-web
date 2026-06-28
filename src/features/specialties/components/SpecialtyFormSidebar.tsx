import { Input, Button, Sidebar } from '@/shared/components'
import type { CreateSpecialtyDto, SpecialtyResponseDto, UpdateSpecialtyDto } from '../types'

type Mode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: Mode
  specialty?: SpecialtyResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateSpecialtyDto) => void | Promise<void>
  onUpdate?: (id: number, dto: UpdateSpecialtyDto) => void | Promise<void>
}

export const SpecialtyFormSidebar = ({
  isOpen,
  mode,
  specialty,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = (data.get('name') as string).trim()
    if (!name) return

    if (mode === 'create') {
      await onCreate?.({ name })
      return
    }

    if (!specialty) return
    await onUpdate?.(specialty.id, {
      name,
      isActive: data.get('isActive') === 'on',
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nueva especialidad' : 'Editar especialidad'}
      description={
        mode === 'create'
          ? 'Registra una nueva especialidad médica.'
          : 'Actualiza los datos de la especialidad.'
      }
    >
      <form key={isOpen ? 'si' : 'no'} onSubmit={(e) => void handleSubmit(e)}>
        <div className="space-y-5">
          <Input
            label="Nombre"
            name="name"
            type="text"
            required
            placeholder="Ej. Medicina General"
            value={specialty?.name ?? ''}
          />

          {mode === 'edit' && (
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={specialty?.isActive ?? true}
                className="h-4 w-4 rounded"
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
              {mode === 'create' ? 'Crear especialidad' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}
