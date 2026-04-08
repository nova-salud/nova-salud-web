export const UserRoleEnum = {
  ADMIN: 'ADMIN',
  OCCUPATIONAL_DOCTOR: 'OCCUPATIONAL_DOCTOR',
  NURSE: 'NURSE',
  SST: 'SST',
  HR: 'HR',
  SUPERVISOR: 'SUPERVISOR',
  MANAGEMENT: 'MANAGEMENT',
  EMPLOYEE: 'EMPLOYEE',
} as const

export type UserRoleEnum = typeof UserRoleEnum[keyof typeof UserRoleEnum]