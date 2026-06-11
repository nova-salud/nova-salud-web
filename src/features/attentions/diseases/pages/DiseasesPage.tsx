import { useState } from 'react'
import { Button, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { useCreateDisease, useUpdateDisease, useDiseases } from '../hooks'
import type { CreateDiseaseDto, DiseaseResponseDto, UpdateDiseaseDto } from '../types'
import { DiseaseDetailSidebar, DiseaseFilter, DiseaseFormSidebar, DiseaseTable } from '../components'

type OverlayKey = 'create' | 'edit' | 'detail'

const DiseasesPage = () => {
  const { data, isLoading, error, refetch, pagination, onChangeFilters } = useDiseases()
  const overlays = useDisclosure<OverlayKey>()
  const [selected, setSelected] = useState<DiseaseResponseDto | null>(null)

  const { isLoading: isCreating, createDisease } = useCreateDisease()
  const { isLoading: isUpdating, updateDisease } = useUpdateDisease()

  const handleCreate = async (dto: CreateDiseaseDto) => {
    const result = await createDisease(dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  const handleUpdate = async (id: number, dto: UpdateDiseaseDto) => {
    const result = await updateDisease(id, dto)
    if (!result) return
    setSelected(result)
    await refetch()
    overlays.open('detail')
  }

  const handleOpenDetail = (disease: DiseaseResponseDto) => {
    setSelected(disease)
    overlays.open('detail')
  }

  const handleOpenEdit = (disease: DiseaseResponseDto) => {
    setSelected(disease)
    overlays.open('edit')
  }

  return (
    <>
      <PageContainer
        title="Enfermedades"
        description="Administra el catálogo de enfermedades del sistema."
        action={(
          <Button type="button" className="w-auto" onClick={() => overlays.open('create')}>
            Nueva enfermedad
          </Button>
        )}
      >
        <div className="space-y-5">
          <DiseaseFilter onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <DiseaseTable
            items={data}
            isLoading={isLoading}
            pagination={pagination}
            onViewDetail={handleOpenDetail}
          />
        </div>
      </PageContainer>

      <DiseaseDetailSidebar
        disease={selected}
        isOpen={overlays.isOpen('detail')}
        onClose={overlays.close}
        onEdit={handleOpenEdit}
      />

      <DiseaseFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreating}
        onClose={overlays.close}
        onCreate={handleCreate}
      />

      <DiseaseFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        disease={selected}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default DiseasesPage
