import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'
import echarts from 'echarts'
import { nanoid } from 'nanoid'

export default ({ config, data, title, description }) => {
  const geoNamesField = config['series-geo-names']
  const geoValuesField = config['series-geo-values']
  const geoJsonField = config['series-geo-json']

  console.log('config', config)
  const nano = nanoid()
  const customMapJson = {
    type: 'FeatureCollection',
    features: data.map((row, i) => {
      console.log('row', row)
      return {
        type: 'Feature',
        id: i,
        properties: { name: row[geoNamesField] }, // TODO row.name => this is explicit column name usage. should come from config object instead
        geometry: JSON.parse(row[geoJsonField]),
      }
    }),
  }

  // TODO, if echarts DOESN"T already have customeMap, register it
  echarts.registerMap(nano, customMapJson)

  const chartData = data.map((row, i) => {
    return { name: row[geoNamesField], value: row[geoValuesField] }
  })
  console.log('data', data)
  return (
    <div
      id="testid"
      style={{
        position: 'absolute',
        top: 40,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <ReactEcharts
        theme={theme}
        option={{
          title: {
            text: title,
            subtext: description,
          },
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: '{b} : {c}',
          },
          visualMap: {
            left: 'right',
            text: ['High', 'Low'],
            // calculable: true
          },
          series: [
            {
              type: 'map',
              mapType: nano,
              roam: true, //allows dragging of map
              label: {
                normal: {
                  show: false,
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
              data: chartData,
            },
          ],
        }}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  )
}
