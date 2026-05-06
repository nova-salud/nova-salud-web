import { useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { cn } from '@/shared/utils'
import { MOCK_NOTIFICATIONS } from '../types/notification-response.dto'
import { useNavigate } from 'react-router'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

const NotificationDropdown = () => {
  const notifications = MOCK_NOTIFICATIONS
  const navigate = useNavigate()

  const dropdownRef = useRef(null)
  const [open, setOpen] = useState(false)

  useClickOutside(dropdownRef, () => setOpen(false))

  const unreadCount = notifications.filter(n => !n.isRead).length

  const visible = notifications
    .sort((a, b) => {
      if (a.isRead !== b.isRead) return Number(a.isRead) - Number(b.isRead)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    .slice(0, 10)

  const onViewAll = () => {
    setOpen(false)
    navigate('/alerts')
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className={cn(
          'relative inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors',
          open
            ? 'border-blue-200 bg-blue-50 text-blue-600'
            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
        )}
      >
        <Bell size={18} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-md">

          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">
              Notificaciones
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {visible.map(n => (
              <div
                key={n.id}
                className={cn(
                  'cursor-pointer px-4 py-3 hover:bg-slate-50',
                  !n.isRead && 'bg-blue-50 border-l-2 border-blue-500'
                )}
              >
                <p className="text-sm font-medium text-slate-800">
                  {n.alertTitle}
                </p>

                <p className="text-xs text-slate-500">
                  {n.alertMessage}
                </p>

                {n.employeeName && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    {n.employeeName}
                  </p>
                )}

                <p className="text-[11px] text-slate-400 mt-1">
                  {formatDistanceToNow(new Date(n.createdAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 p-2">
            <button
              onClick={onViewAll}
              className="w-full rounded-md py-2 text-sm text-blue-600 hover:bg-slate-50"
            >
              Ver todas
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

export default NotificationDropdown