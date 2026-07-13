import { useNavigate } from 'react-router'
import { FilterContainer, PageContainer } from '@/shared/components'
import { RoleEnum } from '@/core/enums/role.enum'
import { useAuth } from '@/shared/hooks'
import { RequirementFilter } from '../components/RequirementFilter'
import RequirementTable from '../components/RequirementTable'
import { useRequirements } from '../hooks/useRequirements'

const RequirementsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data, isLoading, error, pagination, onChangeFilters } = useRequirements()

  const canCreate =
    user?.role === RoleEnum.ADMIN ||
    user?.role === RoleEnum.OCCUPATIONAL_DOCTOR ||
    user?.role === RoleEnum.NURSE

  return (
    <PageContainer
      title="Requerimientos"
      description="Solicitudes de compra y recepción de medicamentos"
      action={
        canCreate ? (
          <button
            type="button"
            onClick={() => navigate('/requirements/create')}
            className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
          >
            Nuevo requerimiento
          </button>
        ) : null
      }
    >
      <div className="space-y-5">
        <FilterContainer>
          <RequirementFilter onChangeFilters={onChangeFilters} />
        </FilterContainer>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border-2 border-slate-300 bg-white shadow-lg overflow-hidden">
          <RequirementTable items={data} isLoading={isLoading} pagination={pagination} />
        </div>
      </div>
    </PageContainer>
  )
}

export default RequirementsPage
