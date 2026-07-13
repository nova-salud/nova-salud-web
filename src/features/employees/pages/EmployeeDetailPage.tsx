import { useNavigate, useParams } from 'react-router'
import { Lock, UserKey } from 'lucide-react'
import { Button, Dropdown, DropdownItem, EntityState, PageContainer } from '@/shared/components'
import { RoleEnum } from '@/core/enums/role.enum'
import { USER_ROLE_LABEL_MAP } from '@/features/users/types'
import { useAuth } from '@/shared/hooks/useAuth'
import { useUpdateUser } from '@/features/users/hooks'
import { useUpdateUserPassword } from '@/features/users/hooks'
import { useDisclosure } from '@/shared/hooks/useDisclosure'
import { EmployeeDetailSkeleton } from '../components/EmployeeDetailSkeleton'
import { EmployeeVetoModal } from '../components/EmployeeVetoModal'
import { EmployeePasswordModal } from '../components/EmployeePasswordModal'
import { EmployeeChangeRoleModal } from '../components/EmployeeChangeRoleModal'
import { useEmployee, useUpdateEmployeeVeto } from '../hooks'
import type { UpdateUserDto } from '@/features/users/types/update-user.dto'
import type { UpdateUserPasswordDto } from '@/features/users/types/update-user-password.dto'

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
    <p className="mt-1 text-sm text-slate-700">{value ?? '—'}</p>
  </div>
)

const formatDate = (value: string | null | undefined) =>
  value ? new Date(value).toLocaleDateString('es-PE') : null

const EmployeeDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()

  const id = Number(params.id)
  const { data: employee, isLoading, error, refetch } = useEmployee(id)

  const overlays = useDisclosure<'veto' | 'password' | 'role'>()
  const { user: authUser } = useAuth()
  const isAdmin = authUser?.role === RoleEnum.ADMIN
  const isHR = authUser?.role === RoleEnum.HR

  const { updateVeto, isLoading: isVetoLoading } = useUpdateEmployeeVeto()
  const { updatePassword, isLoading: isPasswordLoading } = useUpdateUserPassword()
  const { update: updateUser, isLoading: isRoleLoading } = useUpdateUser()

  const handleToggleVeto = async () => {
    if (!employee) return
    await updateVeto(employee.id, { isVetoed: !employee.isVetoed })
    overlays.close()
    void refetch()
  }

  const handleUpdatePassword = async (userId: number, dto: UpdateUserPasswordDto) => {
    await updatePassword(userId, dto)
    overlays.close()
  }

  const handleUpdateRole = async (userId: number, dto: UpdateUserDto) => {
    await updateUser(userId, dto)
    overlays.close()
    void refetch()
  }

  if (isLoading) return <EmployeeDetailSkeleton />

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

  if (!employee) {
    return (
      <EntityState
        title="Empleado no encontrado"
        description="El empleado que intentas consultar no existe o fue eliminado."
        actionText="Regresar"
        onAction={() => navigate('/employees')}
      />
    )
  }

  const displayName = employee?.fullName ?? employee.user?.username ?? '—'

  return (
    <>
      <PageContainer
        title={employee ? displayName : 'Detalle de empleado'}
        description="Información del usuario y sus datos de empleado."
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

            {(isAdmin || isHR) ? (
              <Button
                type="button"
                variant={employee.isVetoed ? 'outline' : 'error'}
                isLoading={isVetoLoading}
                loadingText="Actualizando..."
                onClick={() => overlays.open('veto')}
                className="w-auto"
              >
                {employee.isVetoed ? 'Quitar veto' : 'Vetar'}
              </Button>
            ) : null}

            {isAdmin ? (
              <Dropdown>
                <DropdownItem onClick={() => overlays.open('password')}>
                  <Lock size={14} />
                  Cambiar contraseña
                </DropdownItem>
                <DropdownItem onClick={() => overlays.open('role')}>
                  <UserKey size={14}/>
                  Cambiar rol
                </DropdownItem>
              </Dropdown>
            ) : null}
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Datos del usuario
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Usuario" value={employee.user.username} />
              {employee ? (
                <Field label="Nombre completo" value={employee.fullName} />
              ) : null}
              <Field label="Rol" value={USER_ROLE_LABEL_MAP[employee.user.role]} />
              <Field label="Estado" value={employee.isActive ? 'Activo' : 'Inactivo'} />
              <Field
                label="Acceso"
                value={
                  <span
                    className={
                      employee.isVetoed
                        ? 'inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600'
                        : 'inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700'
                    }
                  >
                    {employee.isVetoed ? 'Vetado' : 'Habilitado'}
                  </span>
                }
              />
            </div>
          </div>

          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Datos del empleado
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="DNI" value={employee.dni} />
              <Field label="Empresa" value={employee.company} />
              <Field label="Estado laboral" value={employee.employmentStatus} />
              <Field label="Área" value={employee.area?.name} />
              <Field label="Cargo" value={employee.position?.name} />
              <Field label="Jefe inmediato" value={employee.immediateBoss} />

              {employee.birthDate ? (
                <Field
                  label="Fecha de nacimiento"
                  value={new Date(employee.birthDate).toLocaleDateString('es-PE')}
                />
              ) : null}

              {employee.lastSyncedAt ? (
                <Field
                  label="Última sincronización"
                  value={new Date(employee.lastSyncedAt).toLocaleString('es-PE')}
                />
              ) : null}
            </div>
          </div>


          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Datos personales
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Sexo" value={employee.sex} />
              <Field label="Estado civil" value={employee.maritalStatus} />
              <Field label="Grupo sanguíneo" value={employee.bloodGroup} />
              <Field label="Teléfono" value={employee.phone} />
              <Field label="Correo personal" value={employee.personalEmail} />
            </div>
          </div>

          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Información laboral
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Fecha de ingreso" value={formatDate(employee.admissionDate)} />
              <Field label="Fecha de cese" value={formatDate(employee.dismissalDate)} />
              <Field label="Inicio de contrato" value={formatDate(employee.contractStartDate)} />
              <Field label="Fin de contrato" value={formatDate(employee.contractEndDate)} />
              <Field label="N.° de hijos" value={employee.childrenCount} />
            </div>
          </div>

          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Información de salud
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Seguro médico" value={employee.medicalInsurance} />
              <Field label="EPS" value={employee.eps} />
              <Field label="Plan EPS" value={employee.epsPlan} />
              <Field label="SCTR Salud" value={employee.sctrHealth} />
            </div>
          </div>

          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Trazabilidad
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Creado"
                value={new Date(employee.createdAt).toLocaleString('es-PE')}
              />
              <Field
                label="Actualizado"
                value={new Date(employee.updatedAt).toLocaleString('es-PE')}
              />
              {employee.createdBy ? (
                <Field label="Creado por" value={employee.createdBy} />
              ) : null}
            </div>
          </div>

        </div>
      </PageContainer>

      <EmployeeVetoModal
        isOpen={overlays.isOpen('veto')}
        employee={employee}
        isLoading={isVetoLoading}
        onConfirm={() => void handleToggleVeto()}
        onClose={overlays.close}
      />

      <EmployeePasswordModal
        isOpen={overlays.isOpen('password')}
        employee={employee}
        isLoading={isPasswordLoading}
        onClose={overlays.close}
        onSubmit={handleUpdatePassword}
      />

      <EmployeeChangeRoleModal
        isOpen={overlays.isOpen('role')}
        employee={employee}
        isLoading={isRoleLoading}
        onClose={overlays.close}
        onSubmit={handleUpdateRole}
      />
    </>
  )
}

export default EmployeeDetailPage
