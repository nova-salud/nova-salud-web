import { useMemo, useState } from 'react'
import type { EmployeeSyncConnectionSettingResponseDto } from '../types/employee-sync-connection-setting-response.dto'
import type { EmployeeSyncJobSettingResponseDto } from '../types/employee-sync-job-setting-response.dto'
import type { TestEmployeeSyncConnectionDto } from '../types/test-employee-sync-connection.dto'
import type { UpdateEmployeeSyncConnectionSettingDto } from '../types/update-employee-sync-connection-setting.dto'
import type { UpdateEmployeeSyncJobSettingDto } from '../types/update-employee-sync-job-setting.dto'

type EmployeeSyncSettingsFormValues = {
  host: string
  port: string
  username: string
  password: string
  database: string
  encrypt: boolean
  trustServerCertificate: boolean
  isEnabled: boolean
  intervalMinutes: string
}

type UseEmployeeSyncSettingsFormParams = {
  connectionSetting: EmployeeSyncConnectionSettingResponseDto | null
  jobSetting: EmployeeSyncJobSettingResponseDto | null
}

type UseEmployeeSyncSettingsFormReturn = {
  values: EmployeeSyncSettingsFormValues
  handleChange: <K extends keyof EmployeeSyncSettingsFormValues>(
    key: K,
  ) => (value: EmployeeSyncSettingsFormValues[K]) => void
  buildConnectionDto: () => UpdateEmployeeSyncConnectionSettingDto | null
  buildConnectionTestDto: () => TestEmployeeSyncConnectionDto | null
  buildJobDto: () => UpdateEmployeeSyncJobSettingDto | null
  connectionInfo: {
    lastTestedAt: string | null
    lastTestSuccess: boolean | null
  }
  jobInfo: {
    lastExecutedAt: string | null
  }
  isConnectionFormValid: boolean
  isJobFormValid: boolean
}

export const useEmployeeSyncSettingsForm = ({
  connectionSetting,
  jobSetting,
}: UseEmployeeSyncSettingsFormParams): UseEmployeeSyncSettingsFormReturn => {
  const defaultValues = useMemo<EmployeeSyncSettingsFormValues>(() => ({
    host: connectionSetting?.host ?? '',
    port: connectionSetting?.port?.toString() ?? '1433',
    username: connectionSetting?.username ?? '',
    password: '',
    database: connectionSetting?.database ?? '',
    encrypt: connectionSetting?.encrypt ?? true,
    trustServerCertificate:
      connectionSetting?.trustServerCertificate ?? false,
    isEnabled: jobSetting?.isEnabled ?? true,
    intervalMinutes: jobSetting?.intervalMinutes?.toString() ?? '60',
  }), [connectionSetting, jobSetting])

  const [changedValues, setChangedValues] =
    useState<Partial<EmployeeSyncSettingsFormValues>>({})

  const values = useMemo(
    () => ({ ...defaultValues, ...changedValues }),
    [defaultValues, changedValues],
  )

  const handleChange =
    <K extends keyof EmployeeSyncSettingsFormValues>(key: K) =>
    (value: EmployeeSyncSettingsFormValues[K]) => {
      setChangedValues((prev) => ({ ...prev, [key]: value }))
    }

  const isConnectionFormValid = useMemo<boolean>(() => {
    return (
      values.host.trim().length > 0 &&
      Number(values.port) > 0 &&
      values.username.trim().length > 0 &&
      values.database.trim().length > 0
    )
  }, [values.host, values.port, values.username, values.database])

  const isJobFormValid = useMemo<boolean>(() => {
    return Number(values.intervalMinutes) > 0
  }, [values.intervalMinutes])

  const buildConnectionDto =
    (): UpdateEmployeeSyncConnectionSettingDto | null => {
      if (!isConnectionFormValid) {
        return null
      }

      return {
        host: values.host.trim(),
        port: Number(values.port),
        username: values.username.trim(),
        password: values.password,
        database: values.database.trim(),
        encrypt: values.encrypt,
        trustServerCertificate: values.trustServerCertificate,
      }
    }

  const buildConnectionTestDto = (): TestEmployeeSyncConnectionDto | null => {
    if (!isConnectionFormValid) {
      return null
    }

    return {
      host: values.host.trim(),
      port: Number(values.port),
      username: values.username.trim(),
      password: values.password,
      database: values.database.trim(),
      encrypt: values.encrypt,
      trustServerCertificate: values.trustServerCertificate,
    }
  }

  const buildJobDto = (): UpdateEmployeeSyncJobSettingDto | null => {
    if (!isJobFormValid) {
      return null
    }

    return {
      isEnabled: values.isEnabled,
      intervalMinutes: Number(values.intervalMinutes),
    }
  }

  return {
    values,
    handleChange,
    buildConnectionDto,
    buildConnectionTestDto,
    buildJobDto,
    connectionInfo: {
      lastTestedAt: connectionSetting?.lastTestedAt ?? null,
      lastTestSuccess: connectionSetting?.lastTestSuccess ?? null,
    },
    jobInfo: {
      lastExecutedAt: jobSetting?.lastExecutedAt ?? null,
    },
    isConnectionFormValid,
    isJobFormValid,
  }
}