import { useState } from 'react'
import { Button, InputFile, Modal } from '@/shared/components'
import { useImportEmployees } from '../hooks'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const EmployeeImportModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const { importEmployees, isLoading, error, clearError } = useImportEmployees()

  const handleClose = () => {
    if (isLoading) return
    setFile(null)
    clearError()
    onClose()
  }

  const handleImport = async () => {
    if (!file) return
    const result = await importEmployees(file)
    if (result) {
      setFile(null)
      onSuccess?.()
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Importar empleados"
      description="Sube un archivo CSV con los datos de los empleados externos."
      size="sm"
    >
      <div className="space-y-4">
        <InputFile
          label="Archivo CSV"
          value={file}
          onChange={setFile}
          allowedExtensions={['csv']}
          placeholder="Selecciona un archivo CSV"
        />

        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : null}

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={handleClose} disabled={isLoading} className="w-auto">
            Cancelar
          </Button>
          <Button
            onClick={() => { void handleImport() }}
            disabled={!file}
            isLoading={isLoading}
            loadingText="Importando..."
            className="w-auto"
          >
            Importar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
