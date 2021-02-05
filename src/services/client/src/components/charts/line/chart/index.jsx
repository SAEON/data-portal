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
  const valuesField = config['series-values']

  const markline1 = config['series-markline-1']
  const markline2 = config['series-markline-2']
  let targetsArr = []
  if (markline1) targetsArr.push(markline1)
  if (markline2) targetsArr.push(markline2)

  return (
    <ReactEcharts
      style={
        {
          // height: '95%', //STEVEN:TO-DO: move to styling
        }
      }
      theme={theme}
      option={{
        xAxis: {
          type: 'category',
          data: data.map(entry => entry[namesField]),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map(entry => entry[valuesField]),
            type: 'line',
            // smooth: false
            markLine: {
              lineStyle: {
                type: 'dotted',
                color: 'orange', //STEVEN To-DO: grab from theme rather than explicit
                width: 2,
              },
              symbol: 'none',
              data: targetsArr.map(target => {
                return { name: target.name, yAxis: target.value }
              }),
            },
          },
        ],
        title: {
          text: title,
          subtext: description,
          left: 'center',
        },
        tooltip: {},
      }}
    />
  )
}
