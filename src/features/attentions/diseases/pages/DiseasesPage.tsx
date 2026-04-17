import { useMemo, useState } from 'react'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Select } from '@/shared/components/ui/form'
import { SortOrder } from '@/core/types/query-params.type'
import DiseaseTable from '../components/DiseaseTable'
import DiseaseDetailSidebar from '../components/DiseaseDetailSidebar'
import DiseaseFormSidebar from '../components/DiseaseFormSidebar'
import { useCreateDisease, useUpdateDisease, useDiseases } from '../hooks'
import type {
  CreateDiseaseDto,
  DiseaseResponseDto,
  FindDiseasesDto,
  UpdateDiseaseDto,
} from '../types'

const DISEASE_STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

type DiseaseSidebarMode = 'create' | 'edit' | 'detail' | null

const DiseasesPage = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [isActive, setIsActive] = useState('')
  const [selectedDisease, setSelectedDisease] = useState<DiseaseResponseDto | null>(null)
  const [sidebarMode, setSidebarMode] = useState<DiseaseSidebarMode>(null)

  const query = useMemo<FindDiseasesDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    code: code.trim() || undefined,
    name: name.trim() || undefined,
    category: category.trim() || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [code, name, category, isActive])

  const { data, isLoading, error, refetch } = useDiseases(query)

  const {
    isLoading: isCreatingDisease,
    createDisease,
  } = useCreateDisease()

  const {
    isLoading: isUpdatingDisease,
    updateDisease,
  } = useUpdateDisease()

  const handleCloseSidebars = () => {
    setSidebarMode(null)
  }

  const handleOpenCreateSidebar = () => {
    setSelectedDisease(null)
    setSidebarMode('create')
  }

  const handleOpenDetailSidebar = (disease: DiseaseResponseDto) => {
    setSelectedDisease(disease)
    setSidebarMode('detail')
  }

  const handleOpenEditSidebar = (disease: DiseaseResponseDto) => {
    setSelectedDisease(disease)
    setSidebarMode('edit')
  }

  const handleCreateDisease = async (dto: CreateDiseaseDto) => {
    const result = await createDisease(dto)

    if (!result) {
      return
    }

    await refetch()
    handleCloseSidebars()
  }

  const handleUpdateDisease = async (
    id: number,
    dto: UpdateDiseaseDto,
  ) => {
    const result = await updateDisease(id, dto)

    if (!result) {
      return
    }

    setSelectedDisease(result)
    await refetch()
    setSidebarMode('detail')
  }

  return (
    <>
      <PageContainer
        title="Enfermedades"
        description="Administra el catálogo de enfermedades del sistema."
        action={
          <Button
            type="button"
            className="w-auto"
            onClick={handleOpenCreateSidebar}
          >
            Nueva enfermedad
          </Button>
        }
      >
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Input
                label="Código"
                placeholder="Buscar por código"
                value={code}
                onChange={setCode}
              />

              <Input
                label="Nombre"
                placeholder="Buscar por nombre"
                value={name}
                onChange={setName}
              />

              <Input
                label="Categoría"
                placeholder="Buscar por categoría"
                value={category}
                onChange={setCategory}
              />

              <Select
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={DISEASE_STATUS_OPTIONS}
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <DiseaseTable
            items={data}
            isLoading={isLoading}
            onViewDetail={handleOpenDetailSidebar}
          />
        </div>
      </PageContainer>

      <DiseaseDetailSidebar
        disease={selectedDisease}
        isOpen={sidebarMode === 'detail'}
        onClose={handleCloseSidebars}
        onEdit={handleOpenEditSidebar}
      />

      <DiseaseFormSidebar
        isOpen={sidebarMode === 'create'}
        mode="create"
        isLoading={isCreatingDisease}
        onClose={handleCloseSidebars}
        onCreate={handleCreateDisease}
      />

      <DiseaseFormSidebar
        isOpen={sidebarMode === 'edit'}
        mode="edit"
        disease={selectedDisease}
        isLoading={isUpdatingDisease}
        onClose={handleCloseSidebars}
        onUpdate={handleUpdateDisease}
      />
    </>
  )
}

export default DiseasesPage