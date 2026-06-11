import { Button, Select, Sidebar } from '@/shared/components'
import { useState } from 'react'
import {
  ACCIDENT_SEVERITY_OPTIONS,
  ACCIDENT_FORM_OPTIONS,
  ACCIDENT_LABOR_RELATION_OPTIONS,
  type AccidentResponseDto,
  type AccidentSeverityEnum,
  type AccidentFormEnum,
  type AccidentLaborRelationEnum,
} from '../../accidents/types'
import { useUpdateAccident } from '../../accidents/hooks/useUpdateAccident'

type Props = {
  isOpen: boolean
  onClose: () => void
  accident: AccidentResponseDto
  onSuccess: () => void
}

export const AccidentClassificationSidebar = ({
  isOpen,
  onClose,
  accident,
  onSuccess,
}: Props) => {
  const [severity, setSeverity] = useState<AccidentSeverityEnum | ''>(
    accident.severityClassification ?? ''
  )
  const [form, setForm] = useState<AccidentFormEnum | ''>(
    accident.formClassification ?? ''
  )
  const [laborRelation, setLaborRelation] = useState<AccidentLaborRelationEnum | ''>(
    accident.laborRelationClassification ?? ''
  )

  const { updateAccident, isLoading, error } = useUpdateAccident()

  const handleSubmit = async () => {
    const result = await updateAccident(accident.id, {
      severityClassification: severity || undefined,
      formClassification: form || undefined,
      laborRelationClassification: laborRelation || undefined,
    })

    if (result !== undefined) {
      onSuccess()
    }
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Editar clasificaciones"
      description="Actualiza las clasificaciones del accidente según la normativa vigente."
      size="md"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => void handleSubmit()} isLoading={isLoading}>
            Guardar
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

        <Select
          name="severity"
          label="Gravedad"
          value={severity}
          onChange={(value) => setSeverity(value as AccidentSeverityEnum | '')}
          options={[{ label: 'Sin especificar', value: '' }, ...ACCIDENT_SEVERITY_OPTIONS]}
        />

        <Select
          name="form"
          label="Forma"
          value={form}
          onChange={(value) => setForm(value as AccidentFormEnum | '')}
          options={[{ label: 'Sin especificar', value: '' }, ...ACCIDENT_FORM_OPTIONS]}
        />

        <Select
          name="laborRelation"
          label="Relación laboral"
          value={laborRelation}
          onChange={(value) => setLaborRelation(value as AccidentLaborRelationEnum | '')}
          options={[{ label: 'Sin especificar', value: '' }, ...ACCIDENT_LABOR_RELATION_OPTIONS]}
        />
      </div>
    </Sidebar>
  )
}
