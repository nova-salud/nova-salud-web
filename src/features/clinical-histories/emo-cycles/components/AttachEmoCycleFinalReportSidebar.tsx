import { useState, useEffect } from 'react'
import { Button, InputFile } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { useAttachEmoCycleFinalReport } from '../hooks'

type Props = {
  isOpen: boolean
  cycleId: number
  onClose: () => void
  onSuccess: () => void
}

const AttachEmoCycleFinalReportSidebar = ({
  isOpen,
  cycleId,
  onClose,
  onSuccess,
}: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const { attachFinalReport, isLoading, error, clearError } = useAttachEmoCycleFinalReport()

  useEffect(() => {
    if (!isOpen) {
      setFile(null)
      clearError()
    }
  }, [isOpen, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const result = await attachFinalReport(cycleId, file)
    if (!result) return

    onSuccess()
    onClose()
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Adjuntar informe médico final"
      description="Sube el informe médico final del ciclo EMO en formato PDF o imagen."
    >
      <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <InputFile
          label="Informe médico final"
          value={file}
          onChange={setFile}
          allowedExtensions={['pdf', 'png', 'jpg', 'jpeg']}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            className="w-auto"
            isLoading={isLoading}
            loadingText="Subiendo..."
            disabled={!file}
          >
            Adjuntar informe
          </Button>
        </div>
      </form>
    </Sidebar>
  )
}

export default AttachEmoCycleFinalReportSidebar
