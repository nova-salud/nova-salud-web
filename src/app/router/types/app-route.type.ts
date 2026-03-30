import type { ReactNode } from 'react'
import type { RoleEnum } from '@/core/enums/role.enum'

export type AppRoute = {
  path: string
  element: ReactNode
  isPublic?: boolean
  roles?: RoleEnum[]
}