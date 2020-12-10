import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'
import catalogueTheme from '../../../../theme'

export default ({ config, data, title, description }) => {
  const namesField = config['series-names']
  const valuesField = config['series-values']
  return (
    <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
      <ReactEcharts
        // theme={theme}
        option={{
          //https://echarts.apache.org/en/option.html#color
          color: catalogueTheme.palette.primary.main,
          // https://echarts.apache.org/en/option.html#title
          title: {
            text: title,
            subtext: description,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}',
          },
          // https://echarts.apache.org/en/option.html#xAxis
          xAxis: {
            show: true,
            type: 'category',

            data: data.map(entry => entry[namesField]),
            name: namesField,
            axisTick: {
              show: false,
            },
            axisLabel: { show: false },
          },
          //https://echarts.apache.org/en/option.html#yAxis
          yAxis: {
            type: 'value',
            name: valuesField,
          },
          // https://echarts.apache.org/en/option.html#dataZoom
          dataZoom: [
            {
              show: true,
              start: 0,
              end: 100,
              bottom: -3,
              height: '3%',
            },
            {
              type: 'inside',
            },
          ],
          //https://echarts.apache.org/en/option.html#series
          series: [
            {
              data: data.map(entry => entry[valuesField]),
              type: 'bar',
              label: {
                show: true,
                rotate: 50,
                align: 'right',
                verticalAlign: 'top',
                position: 'insideBottom',
                distance: -10,
                formatter: '{b}',
                fontSize: 11,

                color: catalogueTheme.palette.primary.main,
              },
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
