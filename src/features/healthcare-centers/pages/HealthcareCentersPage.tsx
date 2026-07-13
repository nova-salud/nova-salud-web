import { useNavigate } from 'react-router'
import { useDisclosure } from '@/shared/hooks'
import { useCreateHealthcareCenter, useHealthcareCenters } from '../hooks'
import type { CreateHealthcareCenterDto, HealthcareCenterResponseDto } from '../types'
import { Button, FilterContainer, PageContainer } from '@/shared/components'
import HealthcareCenterTable from '../components/HealthcareCenterTable'
import HealthcareCenterFormSidebar from '../components/HealthcareCenterFormSidebar'
import { HealthcareCenterFilter } from '../components/HealthcareCenterFilter'

type OverlayKeys = 'create'

const HealthcareCentersPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, refetch, pagination, onChangeFilters} = useHealthcareCenters()
  const { isLoading: isCreating, createHealthcareCenter } = useCreateHealthcareCenter()

  const overlays = useDisclosure<OverlayKeys>()

  const handleView = (center: HealthcareCenterResponseDto) => {
    navigate(`/healthcare-centers/${center.id}`)
  }

  const handleCreate = async (dto: CreateHealthcareCenterDto) => {
    const result = await createHealthcareCenter(dto)
    if (!result) return
    await refetch()
    overlays.close()
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
            onClick={() => overlays.open('create')}
          >
            Nuevo establecimiento
          </Button>
        )}
      >
        <div className="space-y-5">
          <FilterContainer>
            <HealthcareCenterFilter onChangeFilters={onChangeFilters} />
          </FilterContainer>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <HealthcareCenterTable
            items={data}
            isLoading={isLoading}
            onView={handleView}
            pagination={pagination}
          />
        </div>
      </PageContainer>

      <HealthcareCenterFormSidebar
        isOpen={overlays.isOpen('create')}
        mode="create"
        isLoading={isCreating}
        onClose={overlays.close}
        onCreate={handleCreate}
      />
    </>
  )
}

export default HealthcareCentersPage
