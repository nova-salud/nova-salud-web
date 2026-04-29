import { Input, Button } from '@/shared/components/ui/form'
import { useState, useEffect } from 'react'
import type { CreateHealthcareCenterDto, HealthcareCenterResponseDto, UpdateHealthcareCenterDto } from '../types'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'

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

const HealthcareCenterFormSidebar = ({
  isOpen,
  mode,
  healthcareCenter,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const [name, setName] = useState('')
  const [ruc, setRuc] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [isActive, setIsActive] = useState(true)

  const updateState = (item?: HealthcareCenterResponseDto | null) => {
    setName(item?.name ?? '')
    setRuc(item?.ruc ?? '')
    setAddress(item?.address ?? '')
    setPhone(item?.phone ?? '')
    setIsActive(item?.isActive ?? true)
  }

  useEffect(() => {
    if (!isOpen) return
    updateState(healthcareCenter)
  }, [isOpen, mode, healthcareCenter])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!name.trim()) return

    if (mode === 'create') {
      await onCreate?.({
        name: name.trim(),
        ruc: ruc.trim() || undefined,
        address: address.trim() || undefined,
        phone: phone.trim() || undefined,
      })
      return
    }

    if (!healthcareCenter) return

    await onUpdate?.(healthcareCenter.id, {
      name: name.trim(),
      ruc: ruc.trim() || undefined,
      address: address.trim() || undefined,
      phone: phone.trim() || undefined,
      isActive,
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'create'
          ? 'Nuevo establecimiento'
          : 'Editar establecimiento'
      }
      description={
        mode === 'create'
          ? 'Registra un nuevo establecimiento de salud.'
          : 'Actualiza la información del establecimiento.'
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <Input
            label="Nombre"
            placeholder="Ej. Clínica San Pablo"
            value={name}
            onChange={setName}
          />

          <Input
            label="RUC"
            placeholder="Opcional"
            value={ruc}
            onChange={setRuc}
          />

          <Input
            label="Dirección"
            placeholder="Opcional"
            value={address}
            onChange={setAddress}
          />

          <Input
            label="Teléfono"
            placeholder="Opcional"
            value={phone}
            onChange={setPhone}
          />

          {mode === 'edit' && (
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
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
              loadingText={
                mode === 'create'
                  ? 'Guardando...'
                  : 'Actualizando...'
              }
            >
              {mode === 'create'
                ? 'Crear establecimiento'
                : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}

export default HealthcareCenterFormSidebar