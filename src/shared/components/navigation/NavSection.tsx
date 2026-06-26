import { useState } from 'react'
import { useLocation } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils'
import type { NavigationItem } from '@/app/router/navigation.config'
import { NavItem } from './NavItem'

type Props = {
  label: string
  items: NavigationItem[]
  alertsCount?: number
  collapsed?: boolean
  onItemClick?: () => void
}

export const NavSection = ({ label, items, alertsCount, collapsed = false, onItemClick }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const { pathname } = useLocation()

  const hasActiveItem = items.some(item =>
    item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)
  )

  return (
    <div>
      {!collapsed && (
        <button
          type="button"
          onClick={() => setIsOpen(v => !v)}
          className={cn(
            'mb-2 flex w-full items-center justify-between rounded-2xl px-4 py-2 transition-all',
            !isOpen && hasActiveItem
              ? 'bg-[#d6001c] text-white'
              : 'px-2 py-0',
          )}
        >
          <span className={cn(
            'text-[12px] font-bold',
            !isOpen && hasActiveItem ? 'text-white' : 'text-slate-700',
          )}>
            {label}
          </span>
          <ChevronDown
            size={14}
            className={cn(
              'transition-transform duration-200',
              !isOpen && hasActiveItem ? 'text-white' : 'text-slate-400',
              !isOpen && '-rotate-90',
            )}
          />
        </button>
      )}

      <div className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-in-out',
        isOpen || collapsed ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}>
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-1">
            {items.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                path={item.path}
                icon={item.icon}
                badge={item.path === '/alerts' ? (alertsCount || undefined) : item.badge}
                collapsed={collapsed}
                onClick={onItemClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
