import { useState } from 'react'
import { Button, Input, Sidebar } from '@/shared/components'
import type { UpdateUserPasswordDto } from '../types/update-user-password.dto'
import type { UserResponseDto } from '../types/user-response.dto'

type Props = {
  isOpen: boolean
  user?: UserResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onSubmit?: (id: number, dto: UpdateUserPasswordDto) => Promise<void> | void
}

const UserPasswordSidebarContent = ({
  user,
  isLoading = false,
  onClose,
  onSubmit,
}: Omit<Props, 'isOpen'>) => {
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    if (!user || !onSubmit) return
    const data = new FormData(e.currentTarget)
    const newPassword = data.get('newPassword') as string
    const confirmPassword = data.get('confirmPassword') as string

    if (newPassword.trim().length < 8 || confirmPassword.trim().length < 8) {
      setFormError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      setFormError('Las contraseñas no coinciden.')
      return
    }

    setFormError(null)
    await onSubmit(user.id, { newPassword })
  }

  return (
    <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
      {user ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Usuario
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            {user.username}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {user.employee?.fullName ?? '—'}
          </p>
        </div>
      ) : null}

      <Input
        name="newPassword"
        type="password"
        label="Nueva contraseña"
        placeholder="Ingresa la nueva contraseña"
      />

      <Input
        name="confirmPassword"
        type="password"
        label="Confirmar contraseña"
        placeholder="Confirma la nueva contraseña"
      />

      {formError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      ) : null}

      <div className="flex flex-wrap justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-auto"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Actualizando..."
          className="w-auto"
        >
          Actualizar contraseña
        </Button>
      </div>
    </form>
  )
}

export const UserPasswordSidebar = ({
  isOpen,
  user = null,
  isLoading = false,
  onClose,
  onSubmit,
}: Props) => {
  const formKey = `password-${user?.id ?? 'unknown'}-${isOpen ? 'open' : 'closed'}`

  return (
    <Sidebar
      isOpen={isOpen}
      title="Cambiar contraseña"
      description="Actualiza la contraseña del usuario seleccionado."
      onClose={onClose}
      size="sm"
    >
      <UserPasswordSidebarContent
        key={formKey}
        user={user}
        isLoading={isLoading}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Sidebar>
  )
}

export default UserPasswordSidebar
