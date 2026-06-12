import { useState } from 'react'
import { Button, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { TherapeuticCategoryFilter, TherapeuticCategoryFormSidebar, TherapeuticCategoryTable } from '../components'
import { useTherapeuticCategories, useCreateTherapeuticCategory, useUpdateTherapeuticCategory } from '../hooks'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'
import type { CreateTherapeuticCategoryDto } from '../types/create-therapeutic-category.dto'
import type { UpdateTherapeuticCategoryDto } from '../types/update-therapeutic-category.dto'

type OverlayKey = 'create' | 'edit'

const TherapeuticCategoriesPage = () => {
  const { data, isLoading, error, refetch, pagination, onChangeFilters } = useTherapeuticCategories()
  const overlays = useDisclosure<OverlayKey>()
  const [selected, setSelected] = useState<TherapeuticCategoryResponseDto | null>(null)

  const { isLoading: isCreating, createTherapeuticCategory } = useCreateTherapeuticCategory()
  const { isLoading: isUpdating, updateTherapeuticCategory } = useUpdateTherapeuticCategory()

  const handleCreate = async (dto: CreateTherapeuticCategoryDto) => {
    const result = await createTherapeuticCategory(dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleUpdate = async (id: number, dto: UpdateTherapeuticCategoryDto) => {
    const result = await updateTherapeuticCategory(id, dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleOpenEdit = (item: TherapeuticCategoryResponseDto) => {
    setSelected(item)
    overlays.open('edit')
  }

  return (
    <>
      <PageContainer
        title="Categorías de medicamentos"
        description="Administra las categorías de medicamentos disponibles para el inventario."
        action={(
          <Button type="button" className="w-auto" onClick={() => overlays.open('create')}>
            Nueva categoría
          </Button>
        )}
      >
        <div className="space-y-5">
          <TherapeuticCategoryFilter onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <TherapeuticCategoryTable
            items={data}
            isLoading={isLoading}
            pagination={pagination}
            onEdit={handleOpenEdit}
          />
        </div>
      </PageContainer>

      <TherapeuticCategoryFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreating}
        onClose={overlays.close}
        onCreate={handleCreate}
      />

      <TherapeuticCategoryFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        therapeuticCategory={selected}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default TherapeuticCategoriesPage
