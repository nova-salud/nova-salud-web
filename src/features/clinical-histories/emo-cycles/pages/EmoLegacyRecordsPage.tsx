import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Download, Plus, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button, EntityState, PageContainer } from '@/shared/components'
import { useClinicalHistory } from '@/features/clinical-histories/clinical-histories/hooks/useClinicalHistory'
import { useEmoLegacyRecords } from '../hooks/useEmoLegacyRecords'
import { useDeleteEmoLegacyRecord } from '../hooks/useDeleteEmoLegacyRecord'
import EmoLegacyRecordFormSidebar from '../components/EmoLegacyRecordFormSidebar'
import { EMO_CONCLUSION_CLASSNAME, EMO_CONCLUSION_LABEL } from '../types'
import { cn } from '@/shared/utils'

const EmoLegacyRecordsPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const numericEmployeeId = Number(employeeId)

  const { data: clinicalHistory, isLoading: isLoadingHistory } = useClinicalHistory(numericEmployeeId)
  const { records, isLoading: isLoadingRecords, refetch } = useEmoLegacyRecords(clinicalHistory?.id ?? 0)
  const { deleteRecord, isDeleting } = useDeleteEmoLegacyRecord()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('¿Deseas eliminar este registro?')) return
    setDeletingId(id)
    await deleteRecord(id)
    setDeletingId(null)
    void refetch()
  }

  if (isLoadingHistory || isLoadingRecords) {
    return (
      <PageContainer title="Histórico anterior a la plataforma">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-slate-100" />
          ))}
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Histórico anterior a la plataforma"
      description={clinicalHistory?.employee.fullName}
      action={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/clinical-histories/${numericEmployeeId}/emo-cycles`)}
            className="gap-1.5 text-sm py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <Button
            onClick={() => setIsSidebarOpen(true)}
            className="gap-1.5 text-sm py-2"
          >
            <Plus className="h-4 w-4" />
            Agregar registro
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        {records.length === 0 && (
          <EntityState
            title="Sin registros"
            description="No hay registros históricos de EMO anteriores a la plataforma."
          />
        )}

        {records.map(record => (
          <div key={record.id} className="rounded-xl border-2 border-slate-300 bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  {format(new Date(record.evaluatedAt + 'T00:00:00'), 'd MMM yyyy', { locale: es })}
                </span>

                {record.emoType && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {record.emoType}
                  </span>
                )}

                {record.conclusion && (
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', EMO_CONCLUSION_CLASSNAME[record.conclusion])}>
                    {EMO_CONCLUSION_LABEL[record.conclusion]}
                  </span>
                )}

                {record.notes && (
                  <span className="text-xs text-slate-400">
                    {record.notes.length > 80 ? `${record.notes.slice(0, 80)}...` : record.notes}
                  </span>
                )}
              </div>

              <div className="flex shrink-0 gap-2">
                {record.fileUrl && (
                  <a href={record.fileUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="gap-1.5 py-1.5">
                      <Download className="h-3.5 w-3.5" />
                      Adjunto
                    </Button>
                  </a>
                )}

                <Button
                  variant="error"
                  className="gap-1.5 py-1.5"
                  isLoading={isDeleting && deletingId === record.id}
                  loadingText="..."
                  onClick={() => void handleDelete(record.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clinicalHistory && (
        <EmoLegacyRecordFormSidebar
          isOpen={isSidebarOpen}
          clinicalHistoryId={clinicalHistory.id}
          onClose={() => setIsSidebarOpen(false)}
          onSuccess={() => void refetch()}
        />
      )}
    </PageContainer>
  )
}

export default EmoLegacyRecordsPage
