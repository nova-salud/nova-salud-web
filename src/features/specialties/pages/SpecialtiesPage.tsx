import { useState } from 'react'
import { Button, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { SpecialtyDeleteModal, SpecialtyFilter, SpecialtyFormSidebar, SpecialtyTable } from '../components'
import { useSpecialties, useCreateSpecialty, useUpdateSpecialty, useDeleteSpecialty } from '../hooks'
import type { CreateSpecialtyDto, SpecialtyResponseDto, UpdateSpecialtyDto } from '../types'

type OverlayKey = 'create' | 'edit' | 'delete'

const SpecialtiesPage = () => {
  const { data, isLoading, error, refetch, pagination, onChangeFilters } = useSpecialties()
  const overlays = useDisclosure<OverlayKey>()
  const [selected, setSelected] = useState<SpecialtyResponseDto | null>(null)

  const { createSpecialty, isLoading: isCreating } = useCreateSpecialty()
  const { updateSpecialty, isLoading: isUpdating } = useUpdateSpecialty()
  const { deleteSpecialty, isLoading: isDeleting } = useDeleteSpecialty()

  const handleCreate = async (dto: CreateSpecialtyDto) => {
    const result = await createSpecialty(dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleUpdate = async (id: number, dto: UpdateSpecialtyDto) => {
    const result = await updateSpecialty(id, dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleDelete = async () => {
    if (!selected) return
    await deleteSpecialty(selected.id)
    await refetch()
    overlays.close()
  }

  const handleOpenEdit = (item: SpecialtyResponseDto) => {
    setSelected(item)
    overlays.open('edit')
  }

  const handleOpenDelete = (item: SpecialtyResponseDto) => {
    setSelected(item)
    overlays.open('delete')
  }

  return (
    <>
      <PageContainer
        title="Especialidades"
        description="Administra las especialidades médicas disponibles."
        action={(
          <Button type="button" className="w-auto" onClick={() => overlays.open('create')}>
            Nueva especialidad
          </Button>
        )}
      >
        <div className="space-y-5">
          <SpecialtyFilter onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <SpecialtyTable
            items={data}
            isLoading={isLoading}
            pagination={pagination}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        </div>
      </PageContainer>

      <SpecialtyFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreating}
        onClose={overlays.close}
        onCreate={handleCreate}
      />

      <SpecialtyFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        specialty={selected}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdate}
      />

      <SpecialtyDeleteModal
        isOpen={overlays.isOpen('delete')}
        item={selected}
        isLoading={isDeleting}
        onClose={overlays.close}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default SpecialtiesPage
