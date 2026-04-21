import { useEffect, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/shared/components/ui/form'

type Props = {
  label?: string
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
  readonly?: boolean
  height?: number
}

const SignatureInput = ({
  label = 'Firma',
  value,
  onChange,
  disabled = false,
  readonly = false,
  height = 160,
}: Props) => {
  const sigRef = useRef<SignatureCanvas | null>(null)
  const lastLoadedValueRef = useRef<string>('')

  const isBlocked = disabled || readonly

  const handleClear = () => {
    if (isBlocked) return
    sigRef.current?.clear()
    lastLoadedValueRef.current = ''
    onChange('')
  }

  const handleEnd = () => {
    if (isBlocked) return

    if (!sigRef.current || sigRef.current.isEmpty()) {
      lastLoadedValueRef.current = ''
      onChange('')
      return
    }

    const data = sigRef.current.toDataURL('image/png')
    lastLoadedValueRef.current = data
    onChange(data)
  }

  useEffect(() => {
    if (!sigRef.current) return

    const canvas = sigRef.current.getCanvas()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (!value) {
      sigRef.current.clear()
      lastLoadedValueRef.current = ''
      return
    }

    if (value === lastLoadedValueRef.current) {
      return
    }

    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      lastLoadedValueRef.current = value
    }
    img.src = value
  }, [value])

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700">{label}</p>

      <div
        className="rounded-2xl border border-slate-200 bg-white p-2"
        style={{ pointerEvents: readonly ? 'none' : 'auto', opacity: readonly ? 0.7 : 1 }}
      >
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          onEnd={handleEnd}
          canvasProps={{
            className: 'w-full rounded-xl',
            style: { height },
          }}
        />
      </div>

      {!isBlocked ? (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-auto text-xs"
            onClick={handleClear}
          >
            Limpiar
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default SignatureInput