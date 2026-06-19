import { Input, Textarea, Button, Sidebar } from '@/shared/components'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'
import type { CreateTherapeuticCategoryDto } from '../types/create-therapeutic-category.dto'
import type { UpdateTherapeuticCategoryDto } from '../types/update-therapeutic-category.dto'

type Mode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: Mode
  therapeuticCategory?: TherapeuticCategoryResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateTherapeuticCategoryDto) => void | Promise<void>
  onUpdate?: (id: number, dto: UpdateTherapeuticCategoryDto) => void | Promise<void>
}

const TherapeuticCategoryFormSidebar = ({
  isOpen,
  mode,
  therapeuticCategory,
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

    const description = (data.get('description') as string).trim() || undefined

    if (mode === 'create') {
      await onCreate?.({ name, description })
      return
    }

    if (!therapeuticCategory) return

    await onUpdate?.(therapeuticCategory.id, {
      name,
      description,
      isActive: data.get('isActive') === 'on',
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nueva categoría de medicamento' : 'Editar categoría de medicamento'}
      description={
        mode === 'create'
          ? 'Registra una nueva categoría de medicamento para el inventario.'
          : 'Actualiza los datos de la categoría de medicamento.'
      }
    >
      <form
        key={isOpen ? 'true' : 'false'}
        onSubmit={(e) => void handleSubmit(e)}
      >
        <div className="space-y-5">
          <Input
            label="Nombre"
            name="name"
            type="text"
            required
            placeholder="Ej. Analgésicos"
            value={therapeuticCategory?.name}
          />

          <Textarea
            label="Descripción"
            name="description"
            placeholder="Descripción opcional de la categoría"
            rows={3}
            defaultValue={therapeuticCategory?.description ?? undefined}
          />

          {mode === 'edit' && (
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={therapeuticCategory?.isActive ?? true}
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
              {mode === 'create' ? 'Crear categoría' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}

export default TherapeuticCategoryFormSidebar
