import { Button, Textarea } from '@/shared/components/ui/form'
import { useState } from 'react'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import type { AccidentInvestigationResponseDto } from '../../accidents/types'
import { useCreateAccidentInvestigation } from '../../accidents/hooks/useCreateAccidentInvestigation'
import { useUpdateAccidentInvestigation } from '../../accidents/hooks/useUpdateAccidentInvestigation'

type Props = {
  isOpen: boolean
  onClose: () => void
  accidentId: number
  initialData?: AccidentInvestigationResponseDto
  onSuccess: () => void
}

export const AccidentInvestigationSidebar = ({
  isOpen,
  onClose,
  accidentId,
  initialData,
  onSuccess,
}: Props) => {
  const isEditing = initialData !== undefined

  const [responsible, setResponsible] = useState(initialData?.responsible ?? '')
  const [findings, setFindings] = useState(initialData?.findings ?? '')
  const [rootCause, setRootCause] = useState(initialData?.rootCause ?? '')
  const [correctiveMeasures, setCorrectiveMeasures] = useState(initialData?.correctiveMeasures ?? '')

  const { createInvestigation, isLoading: isCreating, error: createError } = useCreateAccidentInvestigation()
  const { updateInvestigation, isLoading: isUpdating, error: updateError } = useUpdateAccidentInvestigation()

  const isLoading = isCreating || isUpdating
  const error = createError || updateError

  const handleSubmit = async () => {
    const payload = {
      responsible: responsible.trim(),
      findings: findings.trim(),
      rootCause: rootCause.trim(),
      correctiveMeasures: correctiveMeasures.trim(),
    }

    const result = isEditing
      ? await updateInvestigation(accidentId, payload)
      : await createInvestigation(accidentId, payload)

    if (result !== undefined) {
      onSuccess()
      onClose()
    }
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar investigación' : 'Registrar investigación'}
      description="Completa los datos del registro de investigación del accidente."
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => void handleSubmit()} isLoading={isLoading}>
            {isEditing ? 'Actualizar' : 'Registrar'}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <Textarea
          label="Responsable de la investigación"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          placeholder="Nombre del responsable"
          rows={2}
        />

        <Textarea
          label="Constatación / Hallazgos"
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          placeholder="Describe los hallazgos de la investigación"
          rows={3}
        />

        <Textarea
          label="Causa origen"
          value={rootCause}
          onChange={(e) => setRootCause(e.target.value)}
          placeholder="Indica la causa raíz del accidente"
          rows={3}
        />

        <Textarea
          label="Medidas correctivas"
          value={correctiveMeasures}
          onChange={(e) => setCorrectiveMeasures(e.target.value)}
          placeholder="Describe las medidas correctivas a implementar"
          rows={3}
        />
      </div>
    </Sidebar>
  )
}
