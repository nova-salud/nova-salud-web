import { LogOut } from 'lucide-react'
import { USER_ROLE_LABEL_MAP } from '@/features/users/types'
import { cn } from '@/shared/utils'
import type { UserSession } from '@/core/types/user-session.type'

type Props = {
  user: UserSession['user']
  sidebarCollapsed: boolean
  onLogout: () => void
}

export const SidebarUserMenu = ({ user, sidebarCollapsed, onLogout }: Props) => {
  return (
    <div className="border-t border-slate-200 px-3 py-2">
      <div
        className={cn(
          'flex items-center gap-1 rounded-lg py-2',
          sidebarCollapsed ? 'justify-center px-0' : 'px-2'
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-200 text-xs font-semibold text-slate-700">
          {user?.username?.charAt(0).toUpperCase() ?? 'U'}
        </div>

        {!sidebarCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-800">
              {user?.username ?? 'Usuario'}
            </p>
            <p className="text-[11px] text-slate-400">
              {USER_ROLE_LABEL_MAP[user.role]}
            </p>
          </div>
        )}

        <button
          onClick={onLogout}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
}
