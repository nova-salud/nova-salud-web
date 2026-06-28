import { FileSpreadsheet } from 'lucide-react'
import { Button, PageContainer } from '@/shared/components'
import { EventReportFilter } from '../components/EventReportFilter'
import { EventReportTable } from '../components/EventReportTable'
import { useEventsReport } from '../hooks/useEventsReport'
import { useExportEventsReport } from '../hooks/useExportEventsReport'

const EventReportPage = () => {
  const { data, isLoading, pagination, filters, onChangeFilters } = useEventsReport()
  const { exportEvents, isLoading: isExporting } = useExportEventsReport()

  return (
    <PageContainer
      title="Reporte de Eventos"
      description="Vista unificada de atenciones médicas, accidentes e incidentes."
      action={
        <Button
          type="button"
          variant="outline"
          className="w-auto"
          isLoading={isExporting}
          loadingText="Exportando..."
          onClick={() => void exportEvents(filters)}
        >
          <FileSpreadsheet size={15} className="mr-1.5" />
          Exportar Excel
        </Button>
      }
    >
      <div className="space-y-6">
        <EventReportFilter filters={filters} onChangeFilters={onChangeFilters} />
        <EventReportTable items={data ?? []} isLoading={isLoading} pagination={pagination} />
      </div>
    </PageContainer>
  )
}

export default EventReportPage
