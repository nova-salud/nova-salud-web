import { createChart, HistogramSeries, ColorType } from 'lightweight-charts'
import { useEffect, useRef } from 'react'

export const RequirementsTrendChart = ({
  data,
}: {
  data: { date: string; count: number }[]
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const container = ref.current

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
      rightPriceScale: {
        borderVisible: false,
      },
      localization: {
        priceFormatter: (price: number) => Math.round(price).toString(),
      },
      timeScale: {
        borderVisible: false,
        timeVisible: false,
        tickMarkFormatter: (time: unknown) => {
          const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
          if (time !== null && typeof time === 'object' && 'year' in time) {
            const t = time as { year: number; month: number; day: number }
            return `${t.day} ${MONTHS[t.month - 1]} ${t.year}`
          }
          return String(time)
        },
      },
    })

    const series = chart.addSeries(HistogramSeries, {
      color: '#6366f1',
      priceFormat: { type: 'custom', formatter: (p: number) => Math.round(p).toString(), minMove: 1 },
    })

    series.setData(
      data.map(d => ({ time: d.date, value: d.count })),
    )

    chart.timeScale().fitContent()

    const resizeObserver = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect
      chart.applyOptions({
        width,
        height: width < 768 ? 220 : 300,
      })
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [data])

  return <div ref={ref} className="w-full" />
}
