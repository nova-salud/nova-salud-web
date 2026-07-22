import { createChart, HistogramSeries, ColorType } from 'lightweight-charts'
import { useEffect, useRef } from 'react'
import { formatChartDate } from '../../utils/chart-date.util'

export const RequirementsTrendChart = ({
  data,
  onDateClick,
}: {
  data: { date: string; count: number }[]
  onDateClick?: (date: string) => void
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const tooltip = tooltipRef.current!

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientWidth < 768 ? 220 : 300,
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: '#334155',
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: '#f1f5f9' },
        horzLines: { color: '#f1f5f9' },
      },
      rightPriceScale: { borderVisible: false },
      localization: {
        priceFormatter: (price: number) => Math.round(price).toString(),
      },
      timeScale: {
        borderVisible: false,
        timeVisible: false,
        tickMarkFormatter: (time: unknown) => formatChartDate(time as string | { year: number; month: number; day: number }),
      },
    })

    const series = chart.addSeries(HistogramSeries, {
      color: '#6366f1',
      priceFormat: { type: 'custom', formatter: (p: number) => Math.round(p).toString(), minMove: 1 },
    })

    series.setData(data.map(d => ({ time: d.date, value: d.count })))
    chart.timeScale().fitContent()

    chart.subscribeCrosshairMove((param) => {
      if (!param.point || !param.time || param.point.x < 0 || param.point.y < 0) {
        tooltip.style.display = 'none'
        return
      }
      const item = param.seriesData.get(series) as { value: number } | undefined
      if (!item) { tooltip.style.display = 'none'; return }

      const date = param.time as string
      tooltip.innerHTML = `
        <p style="font-size:11px;color:#94a3b8;margin-bottom:2px">${formatChartDate(date)}</p>
        <p style="font-size:13px;font-weight:600;color:#1e293b">Requerimientos: <span style="color:#6366f1">${Math.round(item.value)}</span></p>
      `
      const tw = tooltip.offsetWidth
      const left = param.point.x + 12 + tw > container.clientWidth ? param.point.x - tw - 12 : param.point.x + 12
      tooltip.style.left = `${left}px`
      tooltip.style.top = `${Math.max(0, param.point.y - 44)}px`
      tooltip.style.display = 'block'
    })

    if (onDateClick) {
      chart.subscribeClick((param) => {
        if (!param.time) return
        onDateClick(param.time as string)
      })
    }

    const resizeObserver = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect
      chart.applyOptions({ width, height: width < 768 ? 220 : 300 })
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [data, onDateClick])

  return (
    <div className="relative w-full">
      <div ref={containerRef} className="w-full" />
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute hidden rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-md"
        style={{ zIndex: 10 }}
      />
    </div>
  )
}
