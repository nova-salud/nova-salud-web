import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from '@/shared/components/ui/form'
import { useAuth } from '@/shared/hooks/useAuth'
import { RoleEnum } from '@/core/enums/role.enum'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useUser } from '@/features/users/hooks/useUser'
import { useUpdateUser } from '@/features/users/hooks/useUpdateUser'
import { useUpdateUserStatus } from '@/features/users/hooks/useUpdateUserStatus'
import { useUpdateUserPassword } from '@/features/users/hooks/useUpdateUserPassword'
import UserFormSidebar from '@/features/users/components/UserFormSidebar'
import UserPasswordSidebar from '@/features/users/components/UserPasswordSidebar'
import { USER_ROLE_LABEL_MAP } from '@/features/users/types/user-role.config'
import type { UpdateUserDto } from '@/features/users/types/update-user.dto'
import type { UpdateUserPasswordDto } from '@/features/users/types/update-user-password.dto'

type SidebarMode = 'edit' | 'password' | null

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
    <p className="mt-1 text-sm text-slate-700">{value ?? '—'}</p>
  </div>
)

const EmployeeDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { session } = useAuth()
  const currentRole = session?.user.role
  const isAdmin = currentRole === RoleEnum.ADMIN
  const isHR = currentRole === RoleEnum.HR
  const canVeto = isAdmin || isHR

  const { data, isLoading, error, refetch } = useUser(id)
  const { update, isLoading: isUpdating } = useUpdateUser()
  const { updateStatus, isLoading: isUpdatingStatus } = useUpdateUserStatus()
  const { updatePassword, isLoading: isUpdatingPassword } = useUpdateUserPassword()

  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(null)

  if (Number.isNaN(id)) {
    return <div>ID inválido</div>
  }

  const handleToggleBlock = async () => {
    if (!data) return
    const result = await update(data.id, { isBlocked: !data.isBlocked })
    if (!result) return
    await refetch()
  }

  const handleToggleStatus = async () => {
    if (!data) return
    const success = await updateStatus(data.id, !data.isActive)
    if (!success) return
    await refetch()
  }

  const handleUpdate = async (userId: number, dto: UpdateUserDto) => {
    const result = await update(userId, dto)
    if (!result) return
    await refetch()
    setSidebarMode(null)
  }

  const handleUpdatePassword = async (userId: number, dto: UpdateUserPasswordDto) => {
    const success = await updatePassword(userId, dto)
    if (!success) return
    setSidebarMode(null)
  }

  const displayName = data?.employee?.fullName ?? data?.username ?? '—'

  return (
    <>
      <PageContainer
        title={data ? `#${data.id} — ${displayName}` : 'Detalle de empleado'}
        description="Información del usuario y sus datos de empleado."
        action={
          <div className="flex flex-wrap items-center gap-2">
            {data && canVeto ? (
              <Button
                type="button"
                variant="outline"
                isLoading={isUpdating}
                loadingText="Actualizando..."
                onClick={() => void handleToggleBlock()}
                className="w-auto"
              >
                {data.isBlocked ? 'Habilitar' : 'Vetar'}
              </Button>
            ) : null}

            {data && isAdmin ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  isLoading={isUpdatingStatus}
                  loadingText="Actualizando..."
                  onClick={() => void handleToggleStatus()}
                  className="w-auto"
                >
                  {data.isActive ? 'Desactivar' : 'Activar'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSidebarMode('password')}
                  className="w-auto"
                >
                  Cambiar contraseña
                </Button>

                <Button
                  type="button"
                  onClick={() => setSidebarMode('edit')}
                  className="w-auto"
                >
                  Editar
                </Button>
              </>
            ) : null}

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
              className="w-auto px-4 py-2"
            >
              Volver
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Cargando...</p>
            </div>
          ) : null}

          {data ? (
            <>
              {/* Perfil */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-900">
                  Datos del usuario
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="Usuario" value={data.username} />
                  {data.employee ? (
                    <Field label="Nombre completo" value={data.employee.fullName} />
                  ) : null}
                  <Field label="Rol" value={USER_ROLE_LABEL_MAP[data.role]} />
                  <Field label="Estado" value={data.isActive ? 'Activo' : 'Inactivo'} />
                  <Field label="Acceso" value={data.isBlocked ? 'Vetado' : 'Habilitado'} />
                </div>
              </div>

              {/* Datos del empleado */}
              {data.employee ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-sm font-semibold text-slate-900">
                    Datos del empleado
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="DNI" value={data.employee.dni} />
                    <Field label="Empresa" value={data.employee.company} />
                    <Field label="Estado laboral" value={data.employee.employmentStatus} />
                    <Field label="Área" value={data.employee.area?.name} />
                    <Field label="Cargo" value={data.employee.position?.name} />
                    <Field label="Jefe inmediato" value={data.employee.immediateBoss} />

                    {data.employee.birthDate ? (
                      <Field
                        label="Fecha de nacimiento"
                        value={new Date(data.employee.birthDate).toLocaleDateString('es-PE')}
                      />
                    ) : null}

                    {data.employee.lastSyncedAt ? (
                      <Field
                        label="Última sincronización"
                        value={new Date(data.employee.lastSyncedAt).toLocaleString('es-PE')}
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* Trazabilidad */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-slate-900">
                  Trazabilidad
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field
                    label="Creado"
                    value={new Date(data.createdAt).toLocaleString('es-PE')}
                  />
                  <Field
                    label="Actualizado"
                    value={new Date(data.updatedAt).toLocaleString('es-PE')}
                  />
                  {data.createdBy ? (
                    <Field label="Creado por" value={data.createdBy} />
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </PageContainer>

      {isAdmin ? (
        <>
          <UserFormSidebar
            isOpen={sidebarMode === 'edit'}
            mode="edit"
            user={data}
            isLoading={isUpdating}
            onClose={() => setSidebarMode(null)}
            onUpdate={handleUpdate}
          />

          <UserPasswordSidebar
            isOpen={sidebarMode === 'password'}
            user={data}
            isLoading={isUpdatingPassword}
            onClose={() => setSidebarMode(null)}
            onSubmit={handleUpdatePassword}
          />
        </>
      ) : null}
    </>
  )
}

export default EmployeeDetailPage
