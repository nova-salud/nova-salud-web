import { useRef, useState } from 'react'
import { Label } from './Label'
import { Button } from './Button'

type Props = {
  label?: string
  error?: string
  value?: File | null
  onChange: (file: File | null) => void
  allowedExtensions?: string[]
  placeholder?: string
}

export const InputFile = ({
  label,
  error,
  value,
  onChange,
  allowedExtensions = [],
  placeholder = 'Selecciona un archivo',
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const normalizedExtensions = allowedExtensions.map((ext) =>
    ext.replace('.', '').toLowerCase(),
  )

  const accept = normalizedExtensions.length > 0
    ? normalizedExtensions.map((ext) => `.${ext}`).join(',')
    : undefined

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null

    if (!selectedFile) {
      onChange(null)
      setLocalError(null)
      return
    }

    if (normalizedExtensions.length > 0) {
      const extension = selectedFile.name.split('.').pop()?.toLowerCase()

      if (!extension || !normalizedExtensions.includes(extension)) {
        setLocalError(`Formato no permitido. Solo se acepta: ${normalizedExtensions.join(', ')}`)
        onChange(null)
        event.target.value = ''
        return
      }
    }

    setLocalError(null)
    onChange(selectedFile)
  }

  const handleClear = () => {
    onChange(null)
    setLocalError(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label>{label}</Label>}

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-700">
              {value?.name || placeholder}
            </p>

            {normalizedExtensions.length > 0 ? (
              <p className="mt-1 text-xs text-slate-500">
                Permitidos: {normalizedExtensions.join(', ')}
              </p>
            ) : null}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={() => inputRef.current?.click()}
            >
              Elegir archivo
            </Button>

            {value ? (
              <Button
                type="button"
                variant="outline"
                className="w-auto"
                onClick={handleClear}
              >
                Quitar
              </Button>
            ) : null}
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {(error || localError) && (
        <span className="text-xs text-red-500">
          {error || localError}
        </span>
      )}
    </div>
  )
}