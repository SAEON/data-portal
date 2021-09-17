import ReactECharts from 'echarts-for-react'
import echartsTheme from '../../../../lib/echarts-theme.js'

export default ({
  data,
  categoryFieldName,
  seriesFieldName,
  filter = () => true,
  title,
  yScale = 'value',
  tooltip = {},
}) => {
  const series = {}
  const xAxis = {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 80,
    },
  }

  data.forEach(datum => {
    const _categoryFieldName = datum[categoryFieldName]
    const _seriesFieldName = datum[seriesFieldName]
    const count = datum.count

    if (!filter(datum)) {
      return null
    }

    if (!xAxis.data.includes(_categoryFieldName)) {
      xAxis.data.push(_categoryFieldName)
    }

    if (!series[_seriesFieldName]) {
      series[_seriesFieldName] = {
        name: _seriesFieldName,
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        count: {
          [_categoryFieldName]: count,
        },
      }
    }

    series[_seriesFieldName].count[_categoryFieldName] =
      (series[_seriesFieldName].count[_categoryFieldName] || 0) + count
  })

  const _series = Object.entries(series).map(([, series]) => series)

  const option = {
    dataZoom: [
      {
        type: 'slider',
        showDataShadow: 'auto',
        height: 24,
      },
      {
        type: 'inside',
      },
    ],
    title: title
      ? {
          text: title,
          x: 'center',
        }
      : false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      axisPointer: {
        type: 'line',
      },
      ...tooltip,
    },
    grid: {
      show: false,
      left: 16,
      right: 16,
      bottom: 64,
      top: 16,
      containLabel: true,
    },
    yAxis: {
      type: yScale,
      axisLine: {
        show: true,
      },
    },
    xAxis,
    series: _series.map(series => {
      const { count, name, ...other } = series
      const isLastIndex = _series.at(-1).name === name

      return {
        name,
        data: xAxis.data.map(collection => count[collection] || 0),
        label: {
          show: isLastIndex ? true : false,
          formatter: ({ dataIndex: i }) =>
            option.series.reduce((sum, { data }) => sum + data[i], 0),
          position: 'top',
        },
        ...other,
      }
    }),
  }

  return (
    <div style={{ height: 700 }}>
      <ReactECharts theme={echartsTheme} style={{ height: '100%' }} option={option} />
    </div>
  )
}
