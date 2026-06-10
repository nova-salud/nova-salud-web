import { useNavigate } from 'react-router'
import { PageContainer } from '@/shared/components'
import { RequirementFilter } from '../components/RequirementFilter'
import RequirementTable from '../components/RequirementTable'
import { useRequirements } from '../hooks/useRequirements'

const RequirementsPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, pagination, onChangeFilters } = useRequirements()

  return (
    <PageContainer
      title="Requerimientos"
      description="Solicitudes de compra y recepción de medicamentos"
      action={
        <button
          type="button"
          onClick={() => navigate('/requirements/create')}
          className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
        >
          Nuevo requerimiento
        </button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <RequirementFilter onChangeFilters={onChangeFilters} />
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <RequirementTable items={data} isLoading={isLoading} pagination={pagination} />
        </div>
      </div>
    </PageContainer>
  )
}

export default RequirementsPage
