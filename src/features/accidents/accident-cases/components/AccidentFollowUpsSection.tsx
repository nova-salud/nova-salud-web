import type { FollowUpResponseDto } from '@/features/follow-ups/types/follow-up-response.dto'
import { FollowUpStatusEnum, FOLLOW_UP_STATUS_CLASSNAME, FOLLOW_UP_STATUS_LABEL } from '@/features/follow-ups/types/follow-up-status.enum'
import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'

type Props = {
  followUps: FollowUpResponseDto[]
  onCreateAttention?: (followUpId: number) => void
  onViewAttention?: (attentionId: number) => void
}

export const AccidentFollowUpsSection = ({
  followUps,
  onCreateAttention,
  onViewAttention,
}: Props
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const getItemsPerPage = () => {
    if (window.innerWidth >= 1280) return 4
    if (window.innerWidth >= 1024) return 3
    if (window.innerWidth >= 768) return 2
    return 1
  }

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage())

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(followUps.length / itemsPerPage)

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const width = containerRef.current.clientWidth
    const page = Math.round(scrollLeft / width)
    setCurrentPage(page)
  }

  const scrollToPage = (page: number) => {
    if (!containerRef.current) return
    const width = containerRef.current.clientWidth
    containerRef.current.scrollTo({
      left: width * page,
      behavior: 'smooth',
    })
  }

  if (!followUps.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Seguimiento del caso
        </h2>
        <p className="text-sm text-slate-500">
          No hay seguimientos registrados.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Seguimiento del caso
      </h2>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {followUps.map((f) => {
          const isCompleted =
            f.status === FollowUpStatusEnum.COMPLETED &&
            f.fulfilledByAttentionId

          return (
            <div
              key={f.id}
              className="min-w-full sm:min-w-[48%] lg:min-w-[30%] xl:min-w-[23%] snap-start"
            >
              <div className="h-full rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'rounded-xl px-2 py-1 text-xs',
                      FOLLOW_UP_STATUS_CLASSNAME[f.status]
                    )}
                  >
                    {FOLLOW_UP_STATUS_LABEL[f.status]}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-slate-900">
                    {f.reason || 'Seguimiento'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {format(new Date(f.scheduledAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>

                <div className="mt-4">
                  {!isCompleted && onCreateAttention && (
                    <Button
                      className="w-full"
                      onClick={() => onCreateAttention(f.id)}
                    >
                      Registrar atención
                    </Button>
                  )}

                  {isCompleted && onViewAttention && (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() =>
                        onViewAttention(f.fulfilledByAttentionId!)
                      }
                    >
                      Ver atención
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              i === currentPage ? 'bg-blue-600 scale-110' : 'bg-slate-300'
            )}
          />
        ))}
      </div>
    </div>
  )
}