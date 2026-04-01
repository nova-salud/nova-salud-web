import { Menu, LogOut } from 'lucide-react'
import { useSidebar } from '@/shared/hooks/useSidebar'
import { useAuth } from '@/shared/hooks/useAuth'

const MobileHeader = () => {
  const { toggleSidebar } = useSidebar()
  const { clearSession } = useAuth()

  return (
    <div className="flex h-14 items-center justify-between bg-white px-4 shadow-sm">
      <button onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </button>

      <span className="text-sm font-semibold text-slate-900">
        Nova Perú SST
      </span>

      <button onClick={clearSession}>
        <LogOut className="h-5 w-5 text-slate-600" />
      </button>
    </div>
  )
}

export default MobileHeader