import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'

/*
select "NAME", ogc_fid
from "odp-925377aa-6914-41e8-8b92-f448ebe11f9c"
ORDER BY ogc_fid
limit 55
 */

/**TO DO:
 * Move coloring to theme (main color, markline orange, and x-axis text styling)
 * Add Color Wheel component for  marklines customization by user? confirm with zach
 *
 *
 */
export default ({ config, data, title, description }) => {
  const namesField = config['series-names']
  const valuesFields = config['series-values']
  const marklines = config['series-marklines']

  return (
    <ReactEcharts
      style={{
        height: '95%',
        paddingTop: '10px', //STEVEN:TO-DO: move to generic parent of all charts
        paddingRight: '10px',
      }}
      theme={theme}
      option
      option={{
        grid: {
          bottom: 100, //giving wiggle room for larger x axis labels
        },

        title: {
          text: title,
          subtext: description,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}',
        },
        toolbox: {},
        legend: {},
        xAxis: {
          show: true,
          type: 'category',
          data: data.map(entry => entry[namesField]),
          name: namesField,
          axisTick: {
            show: false,
          },
          // axisLabel: { show: true }
          axisLabel: {
            show: true,
            rotate: 45,
            // rotate: 50,
            // rotate: 90,
            align: 'right',
            verticalAlign: 'top',
            position: 'insideBottom',
            distance: -10,
            // formatter: '{b}',
            fontSize: 11,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        yAxis: {
          type: 'value',
        },

        // dataZoom,
        dataZoom: theme.dataZoom, //STEVEN: haven't found a way to apply themed dataZoom another way
        series: [
          ...valuesFields?.map((valueField, i) => {
            console.log('i valueField', i, valueField)
            console.log('data', data)
            console.log(
              'i data.map(entry => entry[valueField]),',
              i,
              data.map(entry => entry[valueField])
            )
            return {
              name: valueField, //data.map(entry => entry[namesField]),
              data: data.map(entry => entry[valueField]),
              type: 'bar',
              // label: {
              //   show: true,
              //   // rotate: 50,
              //   rotate: 90,
              //   align: 'right',
              //   verticalAlign: 'top',
              //   position: 'insideBottom',
              //   distance: -10,
              //   formatter: '{b}',
              //   fontSize: 11,
              // },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },

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
                    // color: 'orange', //STEVEN To-DO: grab from theme rather than explicit
                    width: 2,
                  },
                  symbol: 'none',
                  data: marklines.map(markline => {
                    return { name: markline.name, yAxis: markline.value }
                  }),
                },
          },
        ],
        // series: [
        //   // Bar data
        //   {
        //     data: data.map(entry => entry[valuesField]),
        // type: 'bar',
        // label: {
        //   show: true,
        //   rotate: 50,
        //   align: 'right',
        //   verticalAlign: 'top',
        //   position: 'insideBottom',
        //   distance: -10,
        //   formatter: '{b}',
        //   fontSize: 11,
        // },
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: 'rgba(0, 0, 0, 0.5)',
        //   },
        // },

        //     markLine: {
        //       lineStyle: {
        //         type: 'dotted',
        //         color: 'orange', //STEVEN To-DO: grab from theme rather than explicit
        //         width: 2,
        //       },
        //       symbol: 'none',
        //       data: targetsArr.map(target => {
        //         return { name: target.name, yAxis: target.value }
        //       }),
        //     },
        //   },
        // ],
      }}
    />
  )
}
