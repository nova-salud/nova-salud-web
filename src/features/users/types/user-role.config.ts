import type { UserResponseDto } from './user-response.dto'

export const USER_ROLE_LABEL_MAP: Record<UserResponseDto['role'], string> = {
  ADMIN: 'Administrador',
  OCCUPATIONAL_DOCTOR: 'Médico ocupacional',
  NURSE: 'Enfermería',
  SST: 'SST',
  HR: 'RRHH',
  SUPERVISOR: 'Supervisor',
  MANAGEMENT: 'Gerencia',
  EMPLOYEE: 'Colaborador',
}

export const USER_ROLE_CLASS_MAP: Record<UserResponseDto['role'], string> = {
  ADMIN: 'border-violet-100 bg-violet-50 text-violet-700',
  OCCUPATIONAL_DOCTOR: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  NURSE: 'border-sky-100 bg-sky-50 text-sky-700',
  SST: 'border-amber-100 bg-amber-50 text-amber-700',
  HR: 'border-fuchsia-100 bg-fuchsia-50 text-fuchsia-700',
  SUPERVISOR: 'border-orange-100 bg-orange-50 text-orange-700',
  MANAGEMENT: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  EMPLOYEE: 'border-slate-200 bg-slate-50 text-slate-600',
}

export const USER_ROLE_OPTIONS = [
  { label: 'Administrador', value: 'ADMIN' },
  { label: 'Médico ocupacional', value: 'OCCUPATIONAL_DOCTOR' },
  { label: 'Enfermería', value: 'NURSE' },
  { label: 'SST', value: 'SST' },
  { label: 'RRHH', value: 'HR' },
  { label: 'Supervisor', value: 'SUPERVISOR' },
  { label: 'Gerencia', value: 'MANAGEMENT' },
  { label: 'Colaborador', value: 'EMPLOYEE' },
]