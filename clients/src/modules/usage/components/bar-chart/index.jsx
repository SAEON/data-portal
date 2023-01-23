import ReactECharts from 'echarts-for-react'
import makeEchartsTheme from '../../../../theme/echarts'
import { useTheme } from '@mui/material/styles'

export default ({
  data,
  categoryFieldName,
  seriesFieldName,
  title,
  yScale = 'value',
  tooltip = {},
  type = 'bar',
}) => {
  const muiTheme = useTheme()
  const series = {}
  const xAxis = {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 80,
    },
    axisPointer: {
      snap: true,
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
    toolbox: {
      showTitle: true,
      top: 5,
      right: 5,
      feature: {
        dataZoom: {
          show: true,
        },
        magicType: {
          type: ['line', 'bar', 'stack'],
        },
        saveAsImage: {
          title: 'Save as image',
          pixelRatio: 10,
        },
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    title: {
      top: '10px',
      left: 10,
      text: title,
    },
    tooltip: {
      trigger: 'none',
      appendToBody: true,
      axisPointer: {
        type: 'cross',
        label: {
          formatter: ({ value }) => value,
        },
      },
      show: true,
      ...tooltip,
    },
    grid: {
      top: 90,
      left: 50,
      right: 30,
      bottom: 40,
      containLabel: true,
      show: true,
    },
    yAxis: {
      nameRotate: 90,
      nameGap: 50,
      nameLocation: 'center',
      nameTextStyle: {
        fontStyle: 'italic',
      },
      axisTick: {
        show: true,
      },
      minorTick: {
        show: true,
      },
      type: yScale,
      axisLabel: {
        formatter: value => value,
      },
      axisLine: {
        show: true,
      },
      axisPointer: {
        snap: true,
      },
      offset: 0,
      name: 'Total',
    },
    xAxis,
    series: _series.map(series => {
      const { count, name, ...other } = series

      return {
        name,
        data: xAxis.data.map(collection => count[collection] || 0),
        label: false,
        ...other,
      }
    }),
  }

  return (
    <ReactECharts
      theme={makeEchartsTheme(
        9,
        { color: muiTheme.palette.primary.main, pos: 0 },
        { color: muiTheme.palette.grey[200], pos: 0.3 },
        { color: muiTheme.palette.grey[400], pos: 0.6 },
        { color: muiTheme.palette.secondary.main, pos: 1 }
      )}
      style={{ height: '100%', width: '100%' }}
      option={option}
    />
  )
}
