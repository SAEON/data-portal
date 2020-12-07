import ReactEcharts from 'echarts-for-react'
import theme from '../../../lib/echarts-theme'

// eslint-disable-next-line
export default ({ xAxis, yAxis, data, name }) => {
  return (
    <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
      <ReactEcharts
        theme={theme}
        option={{
          title: {
            text: 'Chart title',
            subtext: 'Chart subtitle',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: data.reduce((acc, cur) => {
              return [...acc, cur.reservoir_type]
            }, []),
          },
          series: [
            {
              name: 'series name',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data.map(({ reservoir_type: name, total_perimeter: value }) => ({
                value,
                name,
              })),

              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }}
      />
    </div>
  )
}
