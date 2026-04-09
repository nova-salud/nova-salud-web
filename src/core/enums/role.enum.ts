export const RoleEnum = {
  ADMIN: 'ADMIN',
  OCCUPATIONAL_DOCTOR: 'OCCUPATIONAL_DOCTOR',
  NURSE: 'NURSE',
  SST: 'SST',
  HR: 'HR',
  SUPERVISOR: 'SUPERVISOR',
  MANAGEMENT: 'MANAGEMENT',
  EMPLOYEE: 'EMPLOYEE',
  EMPLOYEE_EXT: 'EMPLOYEE_EXT',
} as const

export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum]