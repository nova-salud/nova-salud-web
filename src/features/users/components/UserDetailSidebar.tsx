import { Button } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { cn } from '@/shared/utils'
import {
  USER_ROLE_CLASS_MAP,
  USER_ROLE_LABEL_MAP,
} from '../types/user-role.config'
import type { UserResponseDto } from '../types/user-response.dto'

type Props = {
  user: UserResponseDto | null
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onEdit?: (user: UserResponseDto) => void
  onChangePassword?: (user: UserResponseDto) => void
  onToggleStatus?: (user: UserResponseDto) => void
  isUpdatingStatus?: boolean
}

export const UserDetailSidebar = ({
  user,
  isOpen,
  isLoading = false,
  onClose,
  onEdit,
  onChangePassword,
  onToggleStatus,
  isUpdatingStatus = false,
}: Props) => {
  const footer = user ? (
    <div className="flex flex-wrap justify-end gap-3">
      {onToggleStatus ? (
        <Button
          type="button"
          variant="outline"
          isLoading={isUpdatingStatus}
          loadingText="Actualizando..."
          onClick={() => onToggleStatus(user)}
          className="w-auto"
        >
          {user.isActive ? 'Desactivar' : 'Activar'}
        </Button>
      ) : null}

      {onChangePassword ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => onChangePassword(user)}
          className="w-auto"
        >
          Cambiar contraseña
        </Button>
      ) : null}

      {onEdit ? (
        <Button
          type="button"
          onClick={() => onEdit(user)}
          className="w-auto"
        >
          Editar
        </Button>
      ) : null}
    </div>
  ) : null

  return (
    <Sidebar
      isOpen={isOpen}
      title={user ? `Usuario #${user.id}` : 'Detalle de usuario'}
      description="Información general del usuario."
      onClose={onClose}
      size="md"
      footer={footer}
    >
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Cargando usuario...</p>
        </div>
      ) : null}

      {!isLoading && !user ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">No se encontró información del usuario.</p>
        </div>
      ) : null}

      {!isLoading && user ? (
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                  USER_ROLE_CLASS_MAP[user.role],
                )}
              >
                {USER_ROLE_LABEL_MAP[user.role]}
              </span>

              <span
                className={cn(
                  'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                  user.isActive
                    ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-slate-500',
                )}
              >
                {user.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Usuario
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {user.username}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Nombre completo
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {user.fullName}
                </p>
              </div>
            </div>
          </div>

        </div>
      ) : null}
    </Sidebar>
  )
}

export default UserDetailSidebar