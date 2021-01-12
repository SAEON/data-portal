import ReactEcharts from 'echarts-for-react'
import theme from '../../../../lib/echarts-theme'
import echarts from 'echarts'
import { nanoid } from 'nanoid'

// eslint-disable-next-line
export default ({ config, data, title, description }) => {
  const nano = nanoid()

  const customMapJson = {
    type: 'FeatureCollection',
    features: data
      .map((row, i) => {
        if (!row.geojson) {
          return null
        }
        return {
          type: 'Feature',
          id: i,
          properties: { name: row.name }, // TODO row.name => this is explicit column name usage. should come from config object instead
          geometry: JSON.parse(row.geojson),
        }
      })
      .filter(_ => _),
  }

  if (!customMapJson.features.length) {
    return <div>Cannot render map. Are you sure it&apos;s configured properly?</div>
  }

  // TODO, if echarts DOESN"T already have customeMap, register it
  echarts.registerMap(nano, customMapJson)

  const fakeData = data.map((row, i) => {
    return { name: row.name, value: i * 3 }
  })

  return (
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
          inRange: {},
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
            data: fakeData,
          },
        ],
      }}
      style={{ height: '100%', width: '100%' }}
    />
  )
}
