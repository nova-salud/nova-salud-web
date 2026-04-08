import { useMemo, useState } from 'react'
import { Button, Input } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import type { UpdateUserPasswordDto } from '../types/update-user-password.dto'
import type { UserResponseDto } from '../types/user-response.dto'

type PasswordFormValues = {
  newPassword: string
  confirmPassword: string
}

type Props = {
  isOpen: boolean
  user?: UserResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onSubmit?: (id: number, dto: UpdateUserPasswordDto) => Promise<void> | void
}

const INITIAL_VALUES: PasswordFormValues = {
  newPassword: '',
  confirmPassword: '',
}

const UserPasswordSidebarContent = ({
  user,
  isLoading = false,
  onClose,
  onSubmit,
}: Omit<Props, 'isOpen'>) => {
  const [values, setValues] = useState<PasswordFormValues>(INITIAL_VALUES)

  const handleChange =
    <K extends keyof PasswordFormValues>(key: K) =>
    (value: PasswordFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }))
    }

  const passwordsMatch = useMemo<boolean>(() => {
    return values.newPassword === values.confirmPassword
  }, [values.confirmPassword, values.newPassword])

  const isValid = useMemo<boolean>(() => {
    return (
      values.newPassword.trim().length >= 8 &&
      values.confirmPassword.trim().length >= 8 &&
      passwordsMatch
    )
  }, [passwordsMatch, values.confirmPassword, values.newPassword])

  const handleSubmit = async () => {
    if (!user || !onSubmit || !isValid) {
      return
    }

    await onSubmit(user.id, {
      newPassword: values.newPassword,
    })
  }

  const footer = (
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
        type="button"
        isLoading={isLoading}
        loadingText="Actualizando..."
        disabled={!isValid}
        onClick={() => void handleSubmit()}
        className="w-auto"
      >
        Actualizar contraseña
      </Button>
    </div>
  )

  return (
    <div className="space-y-4">
      {user ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Usuario
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            {user.username}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {user.fullName}
          </p>
        </div>
      ) : null}

      <Input
        type="password"
        label="Nueva contraseña"
        placeholder="Ingresa la nueva contraseña"
        value={values.newPassword}
        onChange={handleChange('newPassword')}
      />

      <Input
        type="password"
        label="Confirmar contraseña"
        placeholder="Confirma la nueva contraseña"
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
      />

      {!passwordsMatch && values.confirmPassword.trim().length > 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Las contraseñas no coinciden.
        </div>
      ) : null}

      {footer}
    </div>
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