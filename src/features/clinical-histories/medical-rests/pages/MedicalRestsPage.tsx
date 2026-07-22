import { FileSpreadsheet } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button, PageContainer } from '@/shared/components'
import { RoleEnum } from '@/core/enums/role.enum'
import { useAuth } from '@/shared/hooks'
import { MedicalRestFilter } from '../components/MedicalRestFilter'
import { MedicalRestTable } from '../components/MedicalRestTable'
import { useMedicalRestsList } from '../hooks/useMedicalRestsList'
import { useExportMedicalRests } from '../hooks/useExportMedicalRests'
import { useMedicalRestsSummary } from '../hooks/useMedicalRestsSummary'

const MedicalRestsPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data, isLoading, pagination, filters, onChangeFilters } = useMedicalRestsList()
  const { exportMedicalRests, isLoading: isExporting } = useExportMedicalRests()

  const hasActiveFilters = Boolean(
    filters.employeeFullName || filters.dni || filters.startDateFrom || filters.startDateTo,
  )
  const { summary } = useMedicalRestsSummary(filters, hasActiveFilters)

  const canCreate =
    user?.role === RoleEnum.ADMIN ||
    user?.role === RoleEnum.SST ||
    user?.role === RoleEnum.MANAGEMENT

  return (
    <PageContainer
      title="Descansos Médicos"
      description="Registro de descansos médicos emitidos"
      action={
        <div className="flex items-center gap-3">
          {canCreate && (
            <Button type="button" className="w-auto" onClick={() => navigate('/medical-rests/create')}>
              Agregar DM
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            isLoading={isExporting}
            loadingText="Exportando..."
            onClick={() => void exportMedicalRests(filters)}
          >
            <FileSpreadsheet size={15} className="mr-1.5" />
            Exportar Excel
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <MedicalRestFilter filters={filters} onChangeFilters={onChangeFilters} />

        {hasActiveFilters && (
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
            Total filtrado: <span className="font-semibold">{summary.count}</span> descansos médicos,{' '}
            <span className="font-semibold">{summary.totalDmDays}</span> días DM y{' '}
            <span className="font-semibold">{summary.totalSubsidizedDays}</span> días subsidiados acumulados.
          </div>
        )}

        <MedicalRestTable items={data ?? []} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default MedicalRestsPage
