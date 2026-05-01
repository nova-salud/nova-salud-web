import {
  createChart,
  LineSeries,
  ColorType,
} from 'lightweight-charts'

import { useEffect, useRef } from 'react'

export const AccidentTrendChart = ({
  data,
}: {
  data: { date: string; accidents: number; incidents: number }[]
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
        attributionLogo: false
      },
      grid: {
        vertLines: { color: '#f1f5f9' },
        horzLines: { color: '#f1f5f9' },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
    })

    const accidentSeries = chart.addSeries(LineSeries, {
      color: '#2563eb',
      lineWidth: 2,
      title: 'Accidentes',
    })

    const incidentSeries = chart.addSeries(LineSeries, {
      color: '#f59e0b',
      lineWidth: 2,
      title: 'Incidentes',
    })

    accidentSeries.setData(
      data.map((d) => ({
        time: d.date,
        value: d.accidents,
      })),
    )

    incidentSeries.setData(
      data.map((d) => ({
        time: d.date,
        value: d.incidents,
      })),
    )

    chart.timeScale().fitContent()

    chart.applyOptions({
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
    })

    const resizeObserver = new ResizeObserver((entries) => {
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