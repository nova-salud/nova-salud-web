import { FileSpreadsheet } from 'lucide-react'
import { Button, PageContainer } from '@/shared/components'
import { MedicalRestFilter } from '../components/MedicalRestFilter'
import { MedicalRestTable } from '../components/MedicalRestTable'
import { useMedicalRestsList } from '../hooks/useMedicalRestsList'
import { useExportMedicalRests } from '../hooks/useExportMedicalRests'

const MedicalRestsPage = () => {
  const { data, isLoading, pagination, filters, onChangeFilters } = useMedicalRestsList()
  const { exportMedicalRests, isLoading: isExporting } = useExportMedicalRests()

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
        <MedicalRestTable items={data ?? []} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default MedicalRestsPage
