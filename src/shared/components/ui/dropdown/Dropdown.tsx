import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { cn } from '@/shared/utils'
import { MoreVertical } from 'lucide-react'
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

interface DropdownProps {
  children: ReactNode
  ariaLabel?: string
  iconSize?: number
}

interface TriggerRect {
  top: number
  bottom: number
  left: number
  right: number
}

const VIEWPORT_PADDING = 8
const DROPDOWN_OFFSET = 4

export const Dropdown = ({
  children,
  ariaLabel = 'Acciones',
  iconSize = 16,
}: DropdownProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [triggerRect, setTriggerRect] = useState<TriggerRect | null>(null)

  useClickOutside([menuRef, buttonRef], () => {
    setTriggerRect(null)
  })

  useEffect(() => {
    if (!triggerRect || !menuRef.current) return

    const menu = menuRef.current
    const menuHeight = menu.offsetHeight
    const menuWidth = menu.offsetWidth
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    const opensUp = triggerRect.bottom + menuHeight + DROPDOWN_OFFSET > viewportHeight

    let top: number
    if (opensUp) {
      top = triggerRect.top + window.scrollY - menuHeight - DROPDOWN_OFFSET
    } else {
      top = triggerRect.bottom + window.scrollY + DROPDOWN_OFFSET
    }

    let left = triggerRect.right + window.scrollX - menuWidth
    if (left < VIEWPORT_PADDING) {
      left = triggerRect.left + window.scrollX
    }
    if (left + menuWidth > viewportWidth - VIEWPORT_PADDING) {
      left = viewportWidth - VIEWPORT_PADDING - menuWidth
    }

    menu.style.top = `${top}px`
    menu.style.left = `${left}px`
    menu.style.visibility = 'visible'
  }, [triggerRect])

  const handleToggleDropdown = () => {
    if (!buttonRef.current) return

    if (triggerRect) {
      setTriggerRect(null)
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
    setTriggerRect({
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
    })
  }

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggleDropdown}
        aria-label={ariaLabel}
        className={cn(
          'rounded-lg p-2 text-slate-500 transition-colors cursor-pointer',
          'hover:bg-slate-100 hover:text-slate-900',
        )}
      >
        <MoreVertical size={iconSize} />
      </button>

      {triggerRect &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              visibility: 'hidden',
            }}
            className="z-50 min-w-35 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
          >
            {children}
          </div>,
          document.body,
        )}
    </div>
  )
}