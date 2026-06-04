import { SortOrder } from '@/core/types/query-params.type'
import { Button, Input, Select } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useHealthcareCenters, useCreateHealthcareCenter } from '../hooks'
import type { FindHealthcareCentersDto, CreateHealthcareCenterDto, HealthcareCenterResponseDto } from '../types'
import HealthcareCenterTable from '../components/HealthcareCenterTable'
import HealthcareCenterFormSidebar from '../components/HealthcareCenterFormSidebar'

const HEALTHCARE_CENTER_STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
]

const HealthcareCentersPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const query = useMemo<FindHealthcareCentersDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    search: name.trim() || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [name, isActive])

  const { data, isLoading, error, refetch } = useHealthcareCenters(query)
  const { isLoading: isCreating, createHealthcareCenter } = useCreateHealthcareCenter()

  const handleView = (center: HealthcareCenterResponseDto) => {
    navigate(`/healthcare-centers/${center.id}`)
  }

  const handleCreate = async (dto: CreateHealthcareCenterDto) => {
    const result = await createHealthcareCenter(dto)
    if (!result) return
    await refetch()
    setIsCreateOpen(false)
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
            onClick={() => setIsCreateOpen(true)}
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
                name="search"
                type="text"
                placeholder="Buscar por nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Select
                name='status'
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
            onView={handleView}
          />
        </div>
      </PageContainer>

      <HealthcareCenterFormSidebar
        isOpen={isCreateOpen}
        mode="create"
        isLoading={isCreating}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
      />
    </>
  )
}

export default HealthcareCentersPage
