export const RoleEnum = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  HR: 'HR',
  PHARMACY: 'PHARMACY',
} as const

export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum]