import { NavLink } from 'react-router'
import type { LucideIcon } from 'lucide-react'

type Props = {
  label: string
  path: string
  icon?: LucideIcon
  badge?: number
  onClick?: () => void
}

const NavItem = ({ label, path, icon: Icon, badge, onClick }: Props) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] transition-all',
          isActive
            ? 'bg-slate-100 text-[#2447F9] font-medium'
            : 'text-slate-700 hover:bg-slate-50',
        ].join(' ')
      }
    >
      <div className="flex items-center gap-3">
        {Icon &&<Icon size={18} className="shrink-0" />}
        <span>{label}</span>
      </div>

      {badge ? (
        <span className="min-w-5 rounded-full bg-red-100 px-1.5 py-0.5 text-center text-[10px] font-semibold text-red-500">
          {badge}
        </span>
      ) : null}
    </NavLink>
  )
}

export default NavItem