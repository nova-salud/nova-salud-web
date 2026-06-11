import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { cn } from '@/shared/utils'
import { MoreVertical } from 'lucide-react'
import {
  type ReactNode,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

interface DropdownProps {
  children: ReactNode
  ariaLabel?: string
  iconSize?: number
}

interface DropdownPosition {
  top: number
  left: number
}

const VIEWPORT_PADDING = 8
const DROPDOWN_OFFSET = 4

const getDropdownPosition = (
  rect: DOMRect,
): DropdownPosition => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let left = rect.right + window.scrollX
  let top = rect.bottom + window.scrollY + DROPDOWN_OFFSET

  const estimatedDropdownWidth = 160
  const estimatedDropdownHeight = 200

  if (left - estimatedDropdownWidth < VIEWPORT_PADDING) {
    left = rect.left + window.scrollX
  }

  if (rect.bottom + estimatedDropdownHeight > viewportHeight) {
    top = rect.top + window.scrollY - estimatedDropdownHeight - DROPDOWN_OFFSET
  }

  if (left > viewportWidth - VIEWPORT_PADDING) {
    left = viewportWidth - VIEWPORT_PADDING
  }

  return { top, left }
}

export const Dropdown = ({
  children,
  ariaLabel = 'Acciones',
  iconSize = 16,
}: DropdownProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState<DropdownPosition | null>(null)

  useClickOutside([menuRef, buttonRef], () => {
    setPosition(null)
  })

  const handleToggleDropdown = () => {
    if (!buttonRef.current) {
      return
    }

    if (position) {
      setPosition(null)
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()

    setPosition(getDropdownPosition(rect))
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

      {position &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              transform: 'translateX(-100%)',
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