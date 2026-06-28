import { Check, Copy, Image, Type } from 'lucide-react'
import { useState } from 'react'
import { toastService } from '@/core/services/toast.service'

type Props = {
  placeholders: { text: string[]; image: string[] }
}

const PlaceholderChip = ({ field }: { field: string }) => {
  const [copied, setCopied] = useState(false)
  const formatted = `[[${field}]]`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatted)
    toastService.info(`Copiado: ${formatted}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      title={`Clic para copiar ${formatted}`}
      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 opacity-50" />}
      {formatted}
    </button>
  )
}

export const TemplatePlaceholderList = ({ placeholders }: Props) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
      {placeholders.text.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Type className="h-3 w-3 text-slate-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Texto</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {placeholders.text.map((field) => (
              <PlaceholderChip key={field} field={field} />
            ))}
          </div>
        </div>
      )}

      {placeholders.image.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Image className="h-3 w-3 text-slate-400" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Imagen</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {placeholders.image.map((field) => (
              <PlaceholderChip key={field} field={field} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
