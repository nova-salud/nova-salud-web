import { useHealthcareCenters } from '@/features/healthcare-centers/hooks'
import { ACCIDENT_TYPE_OPTIONS, AccidentTypeEnum, type CreateAccidentDto } from '../types'
import { Select, Input, Textarea, Button } from '@/shared/components/ui/form'
import { useState, useMemo } from 'react'

export type CreateAccidentFormData = Omit<CreateAccidentDto, 'employeeId'>

type Props = {
  onSubmit: (data: CreateAccidentFormData) => Promise<void>
  isLoading?: boolean
}

export const AccidentForm = ({
  onSubmit,
  isLoading = false,
}: Props) => {
  const [type, setType] = useState<AccidentTypeEnum>(AccidentTypeEnum.ACCIDENT)
  const [description, setDescription] = useState('')
  const [occurredAt, setOccurredAt] = useState('')
  const [requiresExternalCare, setRequiresExternalCare] = useState(false)
  const [healthcareCenterId, setHealthcareCenterId] = useState<string>('')

  const healthcareCentersQuery = useMemo(() => ({
    page: 1,
    pageSize: 100,
    isActive: true,
  }), [])

  const { data: healthcareCenters, isLoading: isLoadingCenters } =
    useHealthcareCenters(healthcareCentersQuery)

  const handleSubmit = async () => {
    await onSubmit({
      type,
      description: description.trim(),
      occurredAt: occurredAt || new Date().toISOString(),
      requiresExternalReferral: requiresExternalCare,
      healthcareCenterId: requiresExternalCare
        ? Number(healthcareCenterId)
        : undefined,
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Información del accidente
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Select
            label="Tipo"
            value={type}
            options={ACCIDENT_TYPE_OPTIONS}
            onChange={(value) =>
              setType(value as AccidentTypeEnum)
            }
          />

          <Input
            label="Fecha y hora"
            type="datetime-local"
            value={occurredAt}
            onChange={setOccurredAt}
          />

          <div className="md:col-span-2">
            <Textarea
              label="Descripción"
              placeholder="Describe lo ocurrido"
              value={description}
              onChange={setDescription}
              rows={4}
            />
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Derivación
        </h2>

        <div className="mt-4 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={requiresExternalCare}
              onChange={(e) =>
                setRequiresExternalCare(e.target.checked)
              }
            />
            <span className="text-sm text-slate-700">
              Requiere derivación externa
            </span>
          </label>

          {requiresExternalCare && (
            <Select
              label="Centro de salud"
              value={healthcareCenterId}
              onChange={setHealthcareCenterId}
              options={healthcareCenters.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              disabled={isLoadingCenters}
            />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => void handleSubmit()}
          isLoading={isLoading}
        >
          Registrar accidente
        </Button>
      </div>
    </div>
  )
}