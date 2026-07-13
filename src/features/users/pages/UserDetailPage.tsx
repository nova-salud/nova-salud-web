import { useNavigate, useParams } from 'react-router'
import { Lock } from 'lucide-react'
import { Button, Dropdown, DropdownItem, EntityState, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { cn } from '@/shared/utils'
import { USER_ROLE_CLASS_MAP, USER_ROLE_LABEL_MAP } from '../types/user-role.config'
import { UserFormSidebar } from '../components/UserFormSidebar'
import { UserPasswordSidebar } from '../components/UserPasswordSidebar'
import { UserDetailSkeleton } from '../components/UserDetailSkeleton'
import { useUser, useUpdateUser, useUpdateUserPassword, useUpdateUserStatus } from '../hooks'
import type { UpdateUserDto } from '../types/update-user.dto'
import type { UpdateUserPasswordDto } from '../types/update-user-password.dto'

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
    <p className="mt-1 text-sm text-slate-700">{value ?? '—'}</p>
  </div>
)

type OverlayKey = 'edit' | 'password'

const UserDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { data: user, isLoading, error, refetch } = useUser(id)
  const overlays = useDisclosure<OverlayKey>()

  const { update: updateUser, isLoading: isUpdating } = useUpdateUser()
  const { update: updateBlock, isLoading: isUpdatingBlock } = useUpdateUser()
  const { updatePassword, isLoading: isUpdatingPassword } = useUpdateUserPassword()
  const { updateStatus, isLoading: isUpdatingStatus } = useUpdateUserStatus()

  const handleUpdate = async (userId: number, dto: UpdateUserDto) => {
    const result = await updateUser(userId, dto)
    if (!result) return
    overlays.close()
    void refetch()
  }

  const handleUpdatePassword = async (userId: number, dto: UpdateUserPasswordDto) => {
    const ok = await updatePassword(userId, dto)
    if (!ok) return
    overlays.close()
  }

  const handleToggleStatus = async () => {
    if (!user) return
    const ok = await updateStatus(user.id, !user.isActive)
    if (!ok) return
    void refetch()
  }

  const handleToggleBlock = async () => {
    if (!user) return
    const result = await updateBlock(user.id, { isBlocked: !user.isBlocked })
    if (!result) return
    void refetch()
  }

  if (isLoading) return <UserDetailSkeleton />

  if (error) {
    return (
      <EntityState
        title="Ocurrió un error"
        description={error.message}
        actionText="Reintentar"
        onAction={refetch}
      />
    )
  }

  if (!user) {
    return (
      <EntityState
        title="Usuario no encontrado"
        description="El usuario que intentas consultar no existe o fue eliminado."
        actionText="Regresar"
        onAction={() => navigate('/users')}
      />
    )
  }

  return (
    <>
      <PageContainer
        title={user.username}
        description="Información del usuario y sus datos de acceso."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
              className="w-auto px-4 py-2"
            >
              Volver
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => overlays.open('edit')}
              className="w-auto"
            >
              Editar
            </Button>

            <Button
              type="button"
              variant={user.isActive ? 'error' : 'outline'}
              isLoading={isUpdatingStatus}
              loadingText="Actualizando..."
              onClick={() => void handleToggleStatus()}
              className="w-auto"
            >
              {user.isActive ? 'Desactivar' : 'Activar'}
            </Button>

            <Button
              type="button"
              variant={user.isBlocked ? 'outline' : 'error'}
              isLoading={isUpdatingBlock}
              loadingText="Actualizando..."
              onClick={() => void handleToggleBlock()}
              className="w-auto"
            >
              {user.isBlocked ? 'Desbloquear' : 'Bloquear'}
            </Button>

            <Dropdown>
              <DropdownItem onClick={() => overlays.open('password')}>
                <Lock size={14} />
                Cambiar contraseña
              </DropdownItem>
            </Dropdown>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Acceso</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Usuario" value={user.username} />
              <Field
                label="Rol"
                value={
                  <span className={cn('inline-flex rounded-xl border px-3 py-1 text-xs font-medium', USER_ROLE_CLASS_MAP[user.role])}>
                    {USER_ROLE_LABEL_MAP[user.role]}
                  </span>
                }
              />
              <Field
                label="Estado"
                value={
                  <span className={cn(
                    'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                    user.isActive
                      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-slate-50 text-slate-500',
                  )}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                }
              />
              <Field
                label="Acceso"
                value={
                  <span className={cn(
                    'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                    user.isBlocked
                      ? 'border-red-100 bg-red-50 text-red-700'
                      : 'border-emerald-100 bg-emerald-50 text-emerald-700',
                  )}>
                    {user.isBlocked ? 'Bloqueado' : 'Habilitado'}
                  </span>
                }
              />
            </div>
          </div>

          {user.employee ? (
            <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Empleado vinculado</h3>
                <Button
                  type="button"
                  variant="outline"
                  className="w-auto rounded-xl px-3 py-2 text-xs"
                  onClick={() => navigate(`/employees/${user.employee!.id}`)}
                >
                  Ver perfil completo
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Nombre completo" value={user.employee.fullName} />
                <Field label="DNI" value={user.employee.dni} />
                <Field label="Empresa" value={user.employee.company} />
                <Field label="Área" value={user.employee.area?.name} />
                <Field label="Cargo" value={user.employee.position?.name} />
              </div>
            </div>
          ) : null}

          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Trazabilidad</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Creado" value={new Date(user.createdAt).toLocaleString('es-PE')} />
              <Field label="Actualizado" value={new Date(user.updatedAt).toLocaleString('es-PE')} />
            </div>
          </div>
        </div>
      </PageContainer>

      <UserFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        user={user}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdate}
      />

      <UserPasswordSidebar
        isOpen={overlays.isOpen('password')}
        user={user}
        isLoading={isUpdatingPassword}
        onClose={overlays.close}
        onSubmit={handleUpdatePassword}
      />
    </>
  )
}

export default UserDetailPage
