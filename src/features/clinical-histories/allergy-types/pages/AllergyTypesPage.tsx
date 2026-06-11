import { useState } from 'react'
import { Button, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { AllergyTypeFilter, AllergyTypeFormSidebar, AllergyTypeTable } from '../components'
import { useAllergyTypes, useCreateAllergyType, useUpdateAllergyType } from '../hooks'
import type { AllergyTypeResponseDto, CreateAllergyTypeDto, UpdateAllergyTypeDto } from '../types'

type OverlayKey = 'create' | 'edit'

const AllergyTypesPage = () => {
  const { data, isLoading, error, refetch, pagination, onChangeFilters } = useAllergyTypes()
  const overlays = useDisclosure<OverlayKey>()
  const [selected, setSelected] = useState<AllergyTypeResponseDto | null>(null)

  const { isLoading: isCreating, createAllergyType } = useCreateAllergyType()
  const { isLoading: isUpdating, updateAllergyType } = useUpdateAllergyType()

  const handleCreate = async (dto: CreateAllergyTypeDto) => {
    const result = await createAllergyType(dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleUpdate = async (id: number, dto: UpdateAllergyTypeDto) => {
    const result = await updateAllergyType(id, dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleOpenEdit = (item: AllergyTypeResponseDto) => {
    setSelected(item)
    overlays.open('edit')
  }

  return (
    <>
      <PageContainer
        title="Tipos de alergia"
        description="Administra los tipos de alergia disponibles para el historial clínico."
        action={(
          <Button type="button" className="w-auto" onClick={() => overlays.open('create')}>
            Nuevo tipo
          </Button>
        )}
      >
        <div className="space-y-5">
          <AllergyTypeFilter onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <AllergyTypeTable
            items={data}
            isLoading={isLoading}
            pagination={pagination}
            onEdit={handleOpenEdit}
          />
        </div>
      </PageContainer>

      <AllergyTypeFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreating}
        onClose={overlays.close}
        onCreate={handleCreate}
      />

      <AllergyTypeFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        allergyType={selected}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default AllergyTypesPage
