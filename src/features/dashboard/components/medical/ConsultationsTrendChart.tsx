import { createChart, LineSeries, ColorType } from 'lightweight-charts'
import { useEffect, useRef } from 'react'

type Props = {
  data: { date: string; count: number }[]
}

export const ConsultationsTrendChart = ({ data }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current || data.length === 0) return

    const container = ref.current

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientWidth < 768 ? 200 : 260,
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
      timeScale: { borderVisible: false },
    })

    const series = chart.addSeries(LineSeries, {
      color: '#6366f1',
      lineWidth: 2,
      title: 'Atenciones',
    })

    series.setData(data.map(d => ({ time: d.date, value: d.count })))
    chart.timeScale().fitContent()

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect
      chart.applyOptions({ width, height: width < 768 ? 200 : 260 })
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [data])

  return <div ref={ref} className="w-full" />
}
