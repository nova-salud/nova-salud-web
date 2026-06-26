import { NavLink } from 'react-router'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/utils'

type Props = {
  label: string
  path: string
  icon: LucideIcon
  badge?: number
  collapsed?: boolean
  onClick?: () => void
}

export const NavItem = ({
  label,
  path,
  icon: Icon,
  badge,
  collapsed = false,
  onClick,
}: Props) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={({ isActive }) => cn(
        [
          'flex w-full items-center rounded-2xl text-[13px] py-2 transition-all',
          collapsed ? 'justify-center px-0' : 'justify-between px-4',
          isActive
            ? 'bg-[#d6001c] text-white font-medium'
            : 'text-slate-500 hover:bg-[#d6001c] hover:text-white',
        ])
      }
    >
      {({ isActive }) => (
        <>
          <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
            <Icon size={18} className="shrink-0" />
            {!collapsed ? <span>{label}</span> : null}
          </div>

          {!collapsed && badge ? (
            <span className={cn(
              'min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-semibold',
              isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-500',
            )}>
              {badge}
            </span>
          ) : null}
        </>
      )}
    </NavLink>
  )
}