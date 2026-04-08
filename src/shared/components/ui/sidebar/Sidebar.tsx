import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils'

type SidebarSize = 'sm' | 'md' | 'lg' | 'xl'

type SidebarProps = {
  isOpen: boolean
  title: string
  description?: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
  size?: SidebarSize
  closeOnOverlayClick?: boolean
}

const SIZE_CLASS_MAP: Record<SidebarSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export const Sidebar = ({
  isOpen,
  title,
  description,
  children,
  onClose,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
}: SidebarProps) => {

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div className="absolute inset-y-0 right-0 flex w-full justify-end">
        <aside
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn(
            'flex h-full w-full flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300',
            SIZE_CLASS_MAP[size],
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-slate-900">
                {title}
              </h2>

              {description ? (
                <p className="mt-1 text-sm text-slate-500">
                  {description}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              aria-label="Cerrar panel"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {children}
          </div>

          {footer ? (
            <div className="border-t border-slate-200 px-5 py-4">
              {footer}
            </div>
          ) : null}
        </aside>
      </div>
    </div>,
    document.body,
  )
}

export default Sidebar