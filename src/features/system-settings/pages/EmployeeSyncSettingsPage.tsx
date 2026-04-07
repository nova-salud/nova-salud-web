import PageContainer from '@/shared/components/ui/PageContainer'
import {
  Button,
  Checkbox,
  Input,
} from '@/shared/components/ui/form'
import { useEmployeeSyncConnectionSetting } from '../hooks/use-employee-sync-connection-setting'
import { useEmployeeSyncJobSetting } from '../hooks/use-employee-sync-job-setting'
import { useEmployeeSyncSettingsForm } from '../hooks/use-employee-sync-settings-form'
import { useTestEmployeeSyncConnection } from '../hooks/use-test-employee-sync-connection'
import { useUpdateEmployeeSyncConnectionSetting } from '../hooks/use-update-employee-sync-connection-setting'
import { useUpdateEmployeeSyncJobSetting } from '../hooks/use-update-employee-sync-job-setting'

const EmployeeSyncSettingsPage = () => {
  const {
    data: connectionSetting,
    isLoading: isLoadingConnectionSetting,
    error: connectionSettingError,
    refetch: refetchConnectionSetting,
  } = useEmployeeSyncConnectionSetting()

  const {
    data: jobSetting,
    isLoading: isLoadingJobSetting,
    error: jobSettingError,
    refetch: refetchJobSetting,
  } = useEmployeeSyncJobSetting()

  const {
    update: updateConnectionSetting,
    isLoading: isUpdatingConnectionSetting,
  } = useUpdateEmployeeSyncConnectionSetting()

  const {
    testConnection,
    isLoading: isTestingConnection,
  } = useTestEmployeeSyncConnection()

  const {
    update: updateJobSetting,
    isLoading: isUpdatingJobSetting,
  } = useUpdateEmployeeSyncJobSetting()

  const {
    values,
    handleChange,
    buildConnectionDto,
    buildConnectionTestDto,
    buildJobDto,
    connectionInfo,
    jobInfo,
    isConnectionFormValid,
    isJobFormValid,
  } = useEmployeeSyncSettingsForm({
    connectionSetting,
    jobSetting,
  })

  const handleSaveConnection = async () => {
    const dto = buildConnectionDto()

    if (!dto) {
      return
    }

    const result = await updateConnectionSetting(dto)

    if (result) {
      await refetchConnectionSetting()
    }
  }

  const handleTestConnection = async () => {
    const dto = buildConnectionTestDto()

    if (!dto) {
      return
    }

    const success = await testConnection(dto)

    if (success) {
      await refetchConnectionSetting()
    }
  }

  const handleSaveJob = async () => {
    const dto = buildJobDto()

    if (!dto) {
      return
    }

    const result = await updateJobSetting(dto)

    if (result) {
      await refetchJobSetting()
    }
  }

  const isLoading = isLoadingConnectionSetting || isLoadingJobSetting
  const error = connectionSettingError ?? jobSettingError

  return (
    <PageContainer
      title="Configuración de sincronización RRHH"
      description="Administra la conexión externa y el comportamiento del job de sincronización."
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Cargando configuración...</p>
          </div>
        ) : null}

        {!isLoading ? (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Conexión a base de datos externa
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Configura la conexión que se utilizará para sincronizar áreas y colaboradores.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Host"
                  placeholder="Ej: nova-salud-server.database.windows.net"
                  value={values.host}
                  onChange={handleChange('host')}
                />

                <Input
                  type="number"
                  label="Puerto"
                  placeholder="Ej: 1433"
                  value={values.port}
                  onChange={handleChange('port')}
                />

                <Input
                  label="Usuario"
                  placeholder="Ej: nova-salud-admin"
                  value={values.username}
                  onChange={handleChange('username')}
                />

                <Input
                  type="password"
                  label="Contraseña"
                  placeholder="Ingresa la contraseña"
                  value={values.password}
                  onChange={handleChange('password')}
                />

                <Input
                  label="Base de datos"
                  placeholder="Ej: nova-salud-db"
                  value={values.database}
                  onChange={handleChange('database')}
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <Checkbox
                    label="Encrypt"
                    checked={values.encrypt}
                    onChange={handleChange('encrypt')}
                  />

                  <Checkbox
                    label="Trust server certificate"
                    checked={values.trustServerCertificate}
                    onChange={handleChange('trustServerCertificate')}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Último test
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {connectionInfo.lastTestedAt
                      ? new Date(connectionInfo.lastTestedAt).toLocaleString('es-PE')
                      : '—'}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Resultado del último test
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {connectionInfo.lastTestSuccess === null
                      ? '—'
                      : connectionInfo.lastTestSuccess
                        ? 'Exitoso'
                        : 'Fallido'}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  isLoading={isTestingConnection}
                  loadingText="Probando..."
                  disabled={!isConnectionFormValid || isUpdatingConnectionSetting}
                  onClick={() => void handleTestConnection()}
                  className="w-auto"
                >
                  Probar conexión
                </Button>

                <Button
                  type="button"
                  isLoading={isUpdatingConnectionSetting}
                  loadingText="Guardando..."
                  disabled={!isConnectionFormValid || isTestingConnection}
                  onClick={() => void handleSaveConnection()}
                  className="w-auto"
                >
                  Guardar conexión
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Configuración del job
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Controla si el job está activo y cada cuánto tiempo debe ejecutarse.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Checkbox
                  label="Job habilitado"
                  checked={values.isEnabled}
                  onChange={handleChange('isEnabled')}
                />

                <Input
                  type="number"
                  label="Intervalo (minutos)"
                  placeholder="Ej: 60"
                  value={values.intervalMinutes}
                  onChange={handleChange('intervalMinutes')}
                />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Última ejecución
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {jobInfo.lastExecutedAt
                    ? new Date(jobInfo.lastExecutedAt).toLocaleString('es-PE')
                    : '—'}
                </p>
              </div>

              <div className="mt-5">
                <Button
                  type="button"
                  isLoading={isUpdatingJobSetting}
                  loadingText="Guardando..."
                  disabled={!isJobFormValid}
                  onClick={() => void handleSaveJob()}
                  className="w-auto"
                >
                  Guardar configuración del job
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </PageContainer>
  )
}

export default EmployeeSyncSettingsPage