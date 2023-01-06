import ReactECharts from 'echarts-for-react'
import echartsTheme from '../../../../theme/echarts'
import { Div } from '../../../../components/html-tags'

export default ({
  data,
  categoryFieldName,
  seriesFieldName,
  title,
  yScale = 'value',
  tooltip = {},
  type = 'bar',
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
    const _categoryFieldName = datum[categoryFieldName] || 'UNKNOWN'
    const _seriesFieldName = datum[seriesFieldName] || 'UNKNOWN'
    const count = datum.count

    if (!xAxis.data.includes(_categoryFieldName)) {
      xAxis.data.push(_categoryFieldName)
    }

    if (series[_seriesFieldName]) {
      series[_seriesFieldName].count[_categoryFieldName] =
        count + (series[_seriesFieldName].count[_categoryFieldName] || 0)
    } else {
      series[_seriesFieldName] = {
        name: _seriesFieldName,
        type,
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        count: {
          [_categoryFieldName]: count || 0,
        },
      }
    }
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
    <Div sx={{ height: 400 }}>
      <ReactECharts theme={echartsTheme} style={{ height: '100%' }} option={option} />
    </Div>
  )
}
