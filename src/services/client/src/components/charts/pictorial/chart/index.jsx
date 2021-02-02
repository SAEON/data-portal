import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'

/**TO DO:
 * Shift chart rightward to avoid labels being cut off
 * Have icons have a transparent background square so that hovering over icon is easier
 */
export default ({ config, data, title, description }) => {
  const namesField = config['series-names']
  const valuesField = config['series-values']
  var total = 0
  for (let i = 0; i < data.length; i++) {
    console.log('data[i][valuesField]', data[i][valuesField])
    total += parseFloat(data[i][valuesField])
  }

  return (
    <ReactEcharts
      style={{
        height: '95%',
      }}
      theme={theme}
      option={{
        tooltip: {},
        title: {
          text: title,
          subtext: description,
          left: 'center',
        },
        xAxis: {
          splitLine: { show: false },
        },
        yAxis: {
          data: data.map(entry => entry[namesField]),
          inverse: true,
          axisTick: { show: false },
          // axisLine: { show: false },
          axisLabel: {
            margin: 10,
          },
        },

        series: [
          {
            // current data
            type: 'pictorialBar',
            symbol: symbolFilled,
            symbolRepeat: 'fixed',
            symbolClip: true,
            data: data.map(entry => entry[valuesField]),
            //       markLine: {
            //         symbol: 'none',
            //         label: {
            //           formatter: `total: ${total}`,
            //           position: 'end',
            //         },
            //         lineStyle: {
            //           color: 'green',
            //           type: 'dotted',
            //           opacity: 0.2,
            //           width: 2,
            //         },
            //         data: [
            //           {
            //             type: 'max',
            //           },
            //         ],
            // },
            z: 10,
          },
          {
            // full data
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                opacity: 0.3,
              },
            },
            label: {
              show: true,
              formatter: function (params) {
                console.log('param', params)
                console.log('total', total)
                return ((params.value / total) * 100).toFixed(1) + ' %' //TO-DO: use something other than markline to indicate total
              },
              position: 'right',
              offset: [10, 0],
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbol: symbolOutline, //https://echarts.apache.org/en/option.html#series-pictorialBar.symbol
            data: data.map(entry => entry[valuesField]),
            z: 5,
          },
        ],
      }}
    />
  )
}
var symbolFilled = `path://M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z`
var symbolOutline =
  'path://M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z'
