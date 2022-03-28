import ReactEcharts from 'echarts-for-react'
import theme from '../../../../theme/echarts'

// eslint-disable-next-line
export default ({ config, data, title, description }) => {
  const namesField = config['series-names']
  const valuesField = config['series-values']
  return (
    <ReactEcharts
      theme={theme}
      style={{ height: '100%', width: '100%' }}
      option={{
        title: {
          text: title,
          subtext: description,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: data.reduce((acc, cur) => {
            return [...acc, cur.reservoir_type]
          }, [])
        },
        series: [
          {
            name: 'series name',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: data.map(({ [namesField]: name, [valuesField]: value }) => ({
              value,
              name
            })),

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }}
    />
  )
}
