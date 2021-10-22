import ReactEcharts from 'echarts-for-react'
import theme from '../../../../theme/echarts'

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
        width: '100%',
        paddingTop: '10px', //STEVEN:TO-DO: move to generic parent of all charts OR find a Echarts prop that allows for this and put it in theme
        paddingRight: '10px',
      }}
      theme={theme}
      option={{
        grid: {
          bottom: 50, //giving wiggle room for larger x axis labels
        },
        //https://echarts.apache.org/en/option.html#color
        //apache echarts default color palette. Adopted sequentially and circularly from this list as the colors of series.
        // color: seriesPalette,
        xAxis: {
          // type: 'category',
          data: data.map(entry => entry[namesField]),
          name: namesField,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          ...valuesFields?.map((valueField, i) => {
            return {
              name: valueField, //data.map(entry => entry[namesField]),
              data: data.map(entry => entry[valueField]),
              type: 'line',
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
                    width: 2,
                  },
                  symbol: 'none',
                  data: marklines.map(markline => {
                    return { name: markline.name, yAxis: markline.value }
                  }),
                },
          },
        ],
        legend: {},
        dataZoom: theme.dataZoom,
        title: {
          text: title,
          subtext: description,
          left: 'center',
        },
        tooltip: {},
        // https://echarts.apache.org/en/option.html#toolbox
        toolbox: {},
      }}
    />
  )
}
