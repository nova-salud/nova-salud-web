import { useNavigate, useParams } from 'react-router'
import { Button, EntityState, PageContainer } from '@/shared/components'
import { USER_ROLE_LABEL_MAP } from '@/features/users/types'
import { EmployeeDetailSkeleton } from '../components/EmployeeDetailSkeleton'
import { useEmployee } from '../hooks'

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
        title={employee ? `#${employee.id} — ${displayName}` : 'Detalle de empleado'}
        description="Información del usuario y sus datos de empleado."
        action={
          <div className="flex flex-wrap items-center gap-2">
            {/* {employee && canVeto ? (
              <Button
                type="button"
                variant="outline"
                isLoading={isUpdating}
                loadingText="Actualizando..."
                onClick={() => void handleToggleBlock()}
                className="w-auto"
              >
                {employee.isBlocked ? 'Habilitar' : 'Vetar'}
              </Button>
            ) : null}

            {employee && isAdmin ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  isLoading={isUpdatingStatus}
                  loadingText="Actualizando..."
                  onClick={() => void handleToggleStatus()}
                  className="w-auto"
                >
                  {employee.isActive ? 'Desactivar' : 'Activar'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSidebarMode('password')}
                  className="w-auto"
                >
                  Cambiar contraseña
                </Button>
              </>
            ) : null} */}

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
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
              <Field label="Acceso" value={employee.isBlocked ? 'Vetado' : 'Habilitado'} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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


          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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

      {/* {isAdmin ? (
        <UserPasswordSidebar
          isOpen={sidebarMode === 'password'}
          user={employee}
          isLoading={isUpdatingPassword}
          onClose={() => setSidebarMode(null)}
          onSubmit={handleUpdatePassword}
        />
      ) : null} */}
    </>
  )
}

export default EmployeeDetailPage
