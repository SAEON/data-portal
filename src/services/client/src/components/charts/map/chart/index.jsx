import React, { useContext } from 'react'
import { context as databooksContext } from '../../../../pages/databook/context'
import ReactEcharts from 'echarts-for-react'
import { gql } from '@apollo/client'
import theme from '../../../../lib/echarts-theme'
import { WithGqlQuery } from '../../../../hooks'
import usaJson from './USA.json'

var echarts = require('echarts')

/*
select 
wkb_geometry,
ST_AsText(wkb_geometry)
from "odp-925377aa-6914-41e8-8b92-f448ebe11f9c"
limit 5
*/

//https://echarts.apache.org/en/option.html#geo
//https://echarts.apache.org/en/tutorial.html#Use%20ECharts%20with%20webpack
/*
TODO
-Create materialized view that stores wkb_geometry as ST_AsText or ST_Transform
ALTERNATIVELY test if wkb_geometry format is acceptable to echarts-for-react
-There is probably a way of registering SA maps outside of this file and simply 
importing it like USA.json (e.g. simply storing the JSON server-side)
*/
export default props => {
  console.log('props', props)
  const { databook } = useContext(databooksContext)
  const sql = `select 
  ST_AsText(wkb_geometry),
  ST_AsEWKT(ST_AsText(wkb_geometry)),
  ST_AsGeoJSON(wkb_geometry),
  * 
  from "continents-simplified"
  where wkb_geometry IS NOT NULL`
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!, $sql: String!) {
          databook(id: $id) {
            id
            execute(sql: $sql)
          }
        }
      `}
      variables={{ id: databook.doc._id, sql }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return 'loading..'
        }
        if (error) {
          console.log('error', error)
          return 'error!'
        }
        console.log('data', data)
        let testJSON = {
          type: 'FeatureCollection',

          features: data.databook.execute.map((entry, i) => {
            return {
              type: 'Feature',
              id: i, //may need to be stringified
              properties: { name: entry.CONTINENT },
              geometry: JSON.parse(entry.st_asgeojson),
              // {
              //   type: 'MultiPolygon',
              //   coordinates: entry.st_asewkt, //probably requires further mapping
              //   // type: 'Geom',
              //   // coordinates: entry.wkb_geometry,
              // },
            }
          }),

          // features: [
          //   {
          //     type: 'Feature',
          //     id: '01',
          //     properties: { name: 'Alabama' },
          //     geometry: {
          //       type: 'MultiPolygon',
          //       coordinates: [],
          //     },
          //   },
          // ],
        }

        console.log('testJSON', testJSON)
        console.log('USA', usaJson)
        echarts.registerMap('USA', usaJson)
        echarts.registerMap('TEST', testJSON)
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
                  text: 'title',
                  subtext: 'subtitle',
                  left: 'center',
                },
                series: [
                  {
                    type: 'map',
                    mapType: 'TEST',
                    roam: true, //allows dragging of map
                    label: {
                      normal: {
                        show: true,
                      },
                    },
                  },
                ],
              }}
              style={{ height: '100%', width: '100%' }}
              className="react_for_echarts"
            />
          </div>
        )
      }}
    </WithGqlQuery>
  )
}
