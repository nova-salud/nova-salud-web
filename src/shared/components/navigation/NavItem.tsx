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

const NavItem = ({
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
          'flex items-center rounded-2xl text-[13px] px-4 py-3 transition-all',
          collapsed ? 'justify-center' : 'justify-between',
          isActive
            ? 'bg-slate-100 text-[#2447F9] font-medium'
            : 'text-slate-700 hover:bg-slate-50',
        ])
      }
    >
      <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
        <Icon size={18} className="shrink-0" />
        {!collapsed ? <span>{label}</span> : null}
      </div>

      {!collapsed && badge ? (
        <span className="min-w-5 rounded-full bg-red-100 px-1.5 py-0.5 text-center text-[10px] font-semibold text-red-500">
          {badge}
        </span>
      ) : null}
    </NavLink>
  )
}

export default NavItem