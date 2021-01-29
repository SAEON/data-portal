import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'
import echarts from 'echarts'
import { nanoid } from 'nanoid'

// eslint-disable-next-line
export default ({ config, data, title, description }) => {
  const geoNamesField = config['series-geo-names']
  const geoValuesField = config['series-geo-values']
  const geoJsonField = config['series-geo-json']
  const nano = nanoid()

  const customMapJson = {
    type: 'FeatureCollection',
    features: data
      .map((row, i) => {
        //to-do: more error handling here perhaps
        if (!row[geoJsonField]) {
          return null
        }
        return {
          type: 'Feature',
          id: i,
          properties: { name: row[geoNamesField] }, // TODO row.name => this is explicit column name usage. should come from config object instead
          geometry: JSON.parse(row[geoJsonField]),
        }
      })
      .filter(_ => _),
  }

  if (!customMapJson.features.length) {
    return <div>Cannot render map. Are you sure it&apos;s configured properly?</div>
  }

  // TODO, if echarts DOESN"T already have customeMap, register it
  echarts.registerMap(nano, customMapJson)

  const chartData = data.map((row, i) => {
    return { name: row[geoNamesField], value: row[geoValuesField] }
  })
  console.log('chartData', chartData)
  return (
    <ReactEcharts
      style={{ height: '95%', width: '95%' }}
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
          // inRange: {},
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
    />
  )
}
