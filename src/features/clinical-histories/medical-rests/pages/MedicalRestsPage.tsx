import { FileSpreadsheet } from 'lucide-react'
import { Button, PageContainer } from '@/shared/components'
import { MedicalRestFilter } from '../components/MedicalRestFilter'
import { MedicalRestTable } from '../components/MedicalRestTable'
import { useMedicalRestsList } from '../hooks/useMedicalRestsList'
import { useExportMedicalRests } from '../hooks/useExportMedicalRests'
import { useMedicalRestsSummary } from '../hooks/useMedicalRestsSummary'

const MedicalRestsPage = () => {
  const { data, isLoading, pagination, filters, onChangeFilters } = useMedicalRestsList()
  const { exportMedicalRests, isLoading: isExporting } = useExportMedicalRests()

  const hasActiveFilters = Boolean(
    filters.employeeFullName || filters.dni || filters.startDateFrom || filters.startDateTo,
  )
  const { summary } = useMedicalRestsSummary(filters, hasActiveFilters)

  return (
    <PageContainer
      title="Descansos Médicos"
      description="Registro de descansos médicos emitidos"
      action={
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
      }
    >
      <div className="space-y-6">
        <MedicalRestFilter filters={filters} onChangeFilters={onChangeFilters} />

        {hasActiveFilters && (
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
            Total filtrado: <span className="font-semibold">{summary.count}</span> descansos médicos,{' '}
            <span className="font-semibold">{summary.totalDays}</span> días acumulados.
          </div>
        )}

        <MedicalRestTable items={data ?? []} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default MedicalRestsPage
