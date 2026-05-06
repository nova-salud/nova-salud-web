import { useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { USER_ROLE_LABEL_MAP } from '@/features/users/types'
import { cn } from '@/shared/utils'
import type { UserSession } from '@/core/types/user-session.type'

type Props = {
  user: UserSession['user']
  sidebarCollapsed: boolean
  onLogout: () => void
}

const SidebarUserMenu = ({ user, sidebarCollapsed, onLogout }: Props) => {
  const dropdownRef = useRef(null)
  const [open, setOpen] = useState(false)

  useClickOutside(dropdownRef, () => setOpen(false))

  return (
    <div className="border-t border-slate-200 px-3 py-2">
      <div ref={dropdownRef} className="relative">

        <button
          onClick={() => setOpen(prev => !prev)}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-slate-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-200 text-xs font-semibold text-slate-700">
            {user?.username?.charAt(0).toUpperCase() ?? 'U'}
          </div>

          {!sidebarCollapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">
                  {user?.username ?? 'Usuario'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {USER_ROLE_LABEL_MAP[user.role]}
                </p>
              </div>

              <ChevronRight
                size={16}
                className={cn(
                  'text-slate-400 transition-transform',
                  open && 'rotate-90'
                )}
              />
            </>
          )}
        </button>

        {open && (
          <div
            className={cn(
              'absolute bottom-10 z-50 w-44 rounded-md border border-slate-200 bg-white py-1 shadow-md',
              sidebarCollapsed ? 'left-12' : 'left-full ml-2'
            )}
          >
            <button className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              Perfil
            </button>

            <button className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              Configuración
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              onClick={onLogout}
              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarUserMenu