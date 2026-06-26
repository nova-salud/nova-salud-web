import { useState, useEffect } from 'react'
import { Input, Button, Select, Sidebar } from '@/shared/components'
import type { InputValidation } from '@/shared/components/ui/form/Input'
import type { CreateHealthcareCenterDto, HealthcareCenterResponseDto, UpdateHealthcareCenterDto } from '../types'
import { CONVENIO_OPTIONS } from '../types/convenio.constants'
import { HEALTHCARE_CENTER_TYPE, HEALTHCARE_CENTER_TYPE_OPTIONS } from '../types/healthcare-center-type.constants'
import type { HealthcareCenterTypeValue } from '../types/healthcare-center-type.constants'

type HealthcareCenterFormSidebarMode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: HealthcareCenterFormSidebarMode
  healthcareCenter?: HealthcareCenterResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateHealthcareCenterDto) => void | Promise<void>
  onUpdate?: (id: number, dto: UpdateHealthcareCenterDto) => void | Promise<void>
}

const CONVENIO_SELECT_OPTIONS = [
  { label: 'Sin convenio', value: '' },
  ...CONVENIO_OPTIONS,
]

const NUMERIC_VALIDATION: InputValidation[] = [
  { regex: /^\d+$/, message: 'Solo se permiten números' },
  { regex: /^.{11}$/, message: 'Debe tener exactamente 11 caracteres' }
]

const HealthcareCenterFormSidebar = ({
  isOpen,
  mode,
  healthcareCenter,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const [convenio, setConvenio] = useState(healthcareCenter?.convenio ?? '')
  const [type, setType] = useState<HealthcareCenterTypeValue>(
    healthcareCenter?.type ?? HEALTHCARE_CENTER_TYPE.HOSPITAL
  )

  useEffect(() => {
    setConvenio(healthcareCenter?.convenio ?? '')
    setType(healthcareCenter?.type ?? HEALTHCARE_CENTER_TYPE.HOSPITAL)
  }, [healthcareCenter])

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = (data.get('name') as string).trim()
    if (!name) return

    if (mode === 'create') {
      await onCreate?.({
        name,
        ruc: (data.get('ruc') as string).trim() || undefined,
        address: (data.get('address') as string).trim(),
        phone: (data.get('phone') as string).trim() || undefined,
        convenio: convenio || undefined,
        type,
        contactName: (data.get('contactName') as string).trim() || undefined,
        contactPhone: (data.get('contactPhone') as string).trim() || undefined,
        contactEmail: (data.get('contactEmail') as string).trim() || undefined,
      })
      return
    }

    if (!healthcareCenter) return

    await onUpdate?.(healthcareCenter.id, {
      name,
      ruc: (data.get('ruc') as string).trim() || undefined,
      address: (data.get('address') as string).trim() || undefined,
      phone: (data.get('phone') as string).trim() || undefined,
      convenio: convenio || undefined,
      type,
      contactName: (data.get('contactName') as string).trim() || undefined,
      contactPhone: (data.get('contactPhone') as string).trim() || undefined,
      contactEmail: (data.get('contactEmail') as string).trim() || undefined,
      isActive: data.get('isActive') === 'on',
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Nuevo establecimiento' : 'Editar establecimiento'}
      description={
        mode === 'create'
          ? 'Registra un nuevo establecimiento de salud.'
          : 'Actualiza la información del establecimiento.'
      }
    >
      <form
        key={`${mode}-${healthcareCenter?.id ?? 'new'}`}
        onSubmit={(e) => void handleSubmit(e)}
      >
        <div className="space-y-5">
          <Input
            label="Nombre"
            name="name"
            type="text"
            required
            placeholder="Ej. Clínica San Pablo"
            value={healthcareCenter?.name}
          />

          <Input
            label="RUC"
            name="ruc"
            type="text"
            inputMode="numeric"
            placeholder="Ej. 20123456789"
            value={healthcareCenter?.ruc ?? ''}
            validations={NUMERIC_VALIDATION}
          />

          <Input
            label="Dirección"
            name="address"
            type="text"
            required
            placeholder="Ej. Av. Arequipa 1234, Lima"
            value={healthcareCenter?.address ?? ''}
          />

          <Input
            label="Teléfono"
            name="phone"
            type="text"
            inputMode="numeric"
            placeholder="Ej. 014567890"
            value={healthcareCenter?.phone ?? ''}
            validations={NUMERIC_VALIDATION}
          />

          <Select
            label="Tipo"
            name="type"
            value={type}
            options={HEALTHCARE_CENTER_TYPE_OPTIONS}
            onChange={(v) => setType(v as HealthcareCenterTypeValue)}
          />

          <Select
            label="Convenio"
            name="convenio"
            value={convenio}
            options={CONVENIO_SELECT_OPTIONS}
            onChange={setConvenio}
          />

          <div>
            <p className="mb-3 text-sm font-medium text-slate-800">Datos de contacto</p>
            <div className="space-y-3">
              <Input
                label="Nombre del contacto"
                name="contactName"
                type="text"
                placeholder="Ej. Juan Pérez"
                value={healthcareCenter?.contactName ?? ''}
              />

              <Input
                label="Celular del contacto"
                name="contactPhone"
                type="text"
                inputMode="numeric"
                placeholder="Ej. 987654321"
                value={healthcareCenter?.contactPhone ?? ''}
                validations={NUMERIC_VALIDATION}
              />

              <Input
                label="Correo del contacto"
                name="contactEmail"
                type="email"
                placeholder="Ej. contacto@clinica.com"
                value={healthcareCenter?.contactEmail ?? ''}
              />
            </div>
          </div>

          {mode === 'edit' && (
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={healthcareCenter?.isActive ?? true}
              />
              Activo
            </label>
          )}

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
              loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
            >
              {mode === 'create' ? 'Crear establecimiento' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}

export default HealthcareCenterFormSidebar
