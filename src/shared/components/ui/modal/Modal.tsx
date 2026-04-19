import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { cn } from '@/shared/utils'
import { useEffect, useRef } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const SIZE_CLASS_MAP = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(containerRef, () => {
    if (isOpen) onClose()
  })

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 px-4 py-6">
      <div
        ref={containerRef}
        className={cn(
          'w-full rounded-2xl border border-slate-200 bg-white shadow-xl',
          SIZE_CLASS_MAP[size],
        )}
      >
        {(title || description) && (
          <div className="border-b border-slate-200 px-6 py-4">
            {title ? (
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            ) : null}

            {description ? (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            ) : null}
          </div>
        )}

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal