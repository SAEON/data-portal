import ReactECharts from 'echarts-for-react'
import echartsTheme from '../../../../lib/echarts-theme.js'

export default ({
  data,
  categoryFieldName,
  seriesFieldName,
  filter = () => true,
  title,
  yScale = 'value',
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
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: false,
        magicType: false,
        restore: false,
        brush: false,
      },
      left: 'middle',
    },
    dataZoom: [
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
      axisPointer: {
        type: 'line',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    yAxis: {
      type: yScale,
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
