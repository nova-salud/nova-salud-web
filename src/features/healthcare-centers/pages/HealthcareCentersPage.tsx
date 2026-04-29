import { SortOrder } from '@/core/types/query-params.type'
import { Button, Input, Select } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useState, useMemo } from 'react'
import { useHealthcareCenters, useCreateHealthcareCenter, useUpdateHealthcareCenter } from '../hooks'
import type { HealthcareCenterResponseDto, FindHealthcareCentersDto, CreateHealthcareCenterDto, UpdateHealthcareCenterDto } from '../types'
import HealthcareCenterTable from '../components/HealthcareCenterTable'
import HealthcareCenterFormSidebar from '../components/HealthcareCenterFormModal'

type HealthcareCenterSidebarMode = 'create' | 'edit' | null

const HEALTHCARE_CENTER_STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

const HealthcareCentersPage = () => {
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState('')
  const [selectedCenter, setSelectedCenter] = useState<HealthcareCenterResponseDto | null>(null)
  const [sidebarMode, setSidebarMode] = useState<HealthcareCenterSidebarMode>(null)

  const query = useMemo<FindHealthcareCentersDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    search: name.trim() || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [name, isActive])

  const { data, isLoading, error, refetch } = useHealthcareCenters(query)

  const {
    isLoading: isCreating,
    createHealthcareCenter,
  } = useCreateHealthcareCenter()

  const {
    isLoading: isUpdating,
    updateHealthcareCenter,
  } = useUpdateHealthcareCenter()

  const handleCloseSidebars = () => {
    setSidebarMode(null)
  }

  const handleOpenCreateSidebar = () => {
    setSelectedCenter(null)
    setSidebarMode('create')
  }

  const handleOpenEditSidebar = (center: HealthcareCenterResponseDto) => {
    setSelectedCenter(center)
    setSidebarMode('edit')
  }

  const handleCreate = async (dto: CreateHealthcareCenterDto) => {
    const result = await createHealthcareCenter(dto)

    if (!result) return

    await refetch()
    handleCloseSidebars()
  }

  const handleUpdate = async (
    id: number,
    dto: UpdateHealthcareCenterDto,
  ) => {
    const result = await updateHealthcareCenter(id, dto)

    if (!result) return

    setSelectedCenter(result)
    await refetch()
    handleCloseSidebars()
  }

  return (
    <>
      <PageContainer
        title="Establecimientos de salud"
        description="Administra los centros de salud para derivaciones médicas."
        action={(
          <Button
            type="button"
            className="w-auto"
            onClick={handleOpenCreateSidebar}
          >
            Nuevo establecimiento
          </Button>
        )}
      >
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              <Input
                label="Nombre"
                placeholder="Buscar por nombre"
                value={name}
                onChange={setName}
              />

              <Select
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={HEALTHCARE_CENTER_STATUS_OPTIONS}
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <HealthcareCenterTable
            items={data}
            isLoading={isLoading}
            onEdit={handleOpenEditSidebar}
          />
        </div>
      </PageContainer>

      <HealthcareCenterFormSidebar
        isOpen={sidebarMode === 'create'}
        mode="create"
        isLoading={isCreating}
        onClose={handleCloseSidebars}
        onCreate={handleCreate}
      />

      <HealthcareCenterFormSidebar
        isOpen={sidebarMode === 'edit'}
        mode="edit"
        healthcareCenter={selectedCenter}
        isLoading={isUpdating}
        onClose={handleCloseSidebars}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default HealthcareCentersPage