import ReactEcharts from 'echarts-for-react'
import theme from '../../../../theme/echarts'

export default ({ config, data, title, description }) => {
  const namesField = config['series-names']
  const valuesFields = config['series-values']
  const marklines = config['series-marklines']
  const quickOptions = config['series-quick-options']
  const { isVertical } = quickOptions

  const categoryAxis = {
    type: 'category',
    data: data.map(entry => entry[namesField]),
    name: namesField,
    axisLabel: isVertical ? { rotate: 50 } : { rotate: 0 }
  }
  const valueAxis = {
    type: 'value'
  }

  return (
    <ReactEcharts
      style={{
        height: '95%',
        paddingTop: '10px', //STEVEN:TO-DO: move to generic parent of all charts
        paddingRight: '10px'
      }}
      theme={theme}
      option={{
        grid: {
          bottom: 50 //giving wiggle room for larger x axis labels
        },

        title: {
          text: title,
          subtext: description,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        toolbox: {},
        legend: {},
        xAxis: isVertical ? categoryAxis : valueAxis,
        yAxis: isVertical ? valueAxis : categoryAxis,

        dataZoom: theme.dataZoom, //STEVEN: haven't found a way to apply themed dataZoom another way
        series: [
          ...valuesFields?.map((valueField, i) => {
            return {
              name: valueField, //data.map(entry => entry[namesField]),
              data: data.map(entry => entry[valueField]),
              type: 'bar',
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }

              // smooth: false,
            }
          }),
          // marklines
          {
            type: 'line',
            markLine: !marklines
              ? undefined
              : {
                  lineStyle: {
                    type: 'dotted',
                    width: 2
                  },
                  symbol: 'none',
                  data: marklines.map(markline => {
                    return { name: markline.name, yAxis: markline.value }
                  })
                }
          }
        ]
      }}
    />
  )
}
