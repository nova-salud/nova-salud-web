import { useHealthcareCenters } from '@/features/healthcare-centers/hooks'
import { ACCIDENT_TYPE_OPTIONS, AccidentTypeEnum, type CreateAccidentDto } from '../types'
import { Select, Input, Textarea, Button } from '@/shared/components/ui/form'
import { useState, useMemo, useRef } from 'react'

export type CreateAccidentFormData = Omit<CreateAccidentDto, 'employeeId'>

type Props = {
  onSubmit: (data: CreateAccidentFormData) => Promise<void>
  isLoading?: boolean
}

export const AccidentForm = ({
  onSubmit,
  isLoading = false,
}: Props) => {
  const [requiresExternalCare, setRequiresExternalCare] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const healthcareCentersQuery = useMemo(() => ({
    page: 1,
    pageSize: 100,
    isActive: true,
  }), [])

  const { data: healthcareCenters, isLoading: isLoadingCenters } =
    useHealthcareCenters(healthcareCentersQuery)

  const handleSubmit = async () => {
    const data = formRef.current ? new FormData(formRef.current) : new FormData()
    const occurredAt = data.get('occurredAt') as string

    await onSubmit({
      type: data.get('type') as AccidentTypeEnum,
      description: (data.get('description') as string).trim(),
      occurredAt: occurredAt || new Date().toISOString(),
      requiresExternalReferral: requiresExternalCare,
      healthcareCenterId: requiresExternalCare
        ? Number(data.get('healthcareCenterId'))
        : undefined,
    })
  }

  return (
    <form ref={formRef} className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Información del accidente
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Select
            name="type"
            label="Tipo"
            defaultValue={AccidentTypeEnum.ACCIDENT}
            options={ACCIDENT_TYPE_OPTIONS}
          />

          <Input
            label="Fecha y hora"
            name="occurredAt"
            type="datetime-local"
          />

          <div className="md:col-span-2">
            <Textarea
              label="Descripción"
              name="description"
              placeholder="Describe lo ocurrido"
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
              onChange={(e) => setRequiresExternalCare(e.target.checked)}
            />
            <span className="text-sm text-slate-700">
              Requiere derivación externa
            </span>
          </label>

          {requiresExternalCare && (
            <Select
              name="healthcareCenterId"
              label="Centro de salud"
              defaultValue=""
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
          type="button"
          onClick={() => void handleSubmit()}
          isLoading={isLoading}
        >
          Registrar accidente
        </Button>
      </div>
    </form>
  )
}
