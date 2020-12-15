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

  const sql_continents = `select 
  "CONTINENT" AS name,
  "ogc_fid",
  ST_AsGeoJSON("wkb_geometry") AS geojson
  from "continents-simplified"
  where "wkb_geometry" IS NOT NULL` //does not have antarctica

  const sql_municipality_simplified = `select 
  ogc_fid,
  "MN_NAME" as name,
  "DC_NAME",
  ST_AsGeoJSON("wkb_geometry") as geojson
  from "sa-municipality-boundaries-2011-simplified"
  where wkb_geometry is not null `

  const sql_provinces_simplified = `select 
  ogc_fid,
  "PROVINCE" as name,
  ST_AsGeoJSON("wkb_geometry") as geojson
  from "sa-provinces-2011-simplified"
  where wkb_geometry is not null`

  const sql_district_simplified = `select 
  "DC_NAME" as name,
  "MAP_TITLE",
  "PR_NAME",
  ST_AsGeoJSON("wkb_geometry")  AS geojson
  from "sa-district-boundaries-2011-simplified"
  where wkb_geometry is not null`

  // super slow. definitely not performant enough to be usable
  const sql_district = `select 
  ogc_fid,
  "PROVINCE",
  "DISTRICT",
  "DISTRICT_N" as name,
  ST_AsGeoJSON("wkb_geometry") as geojson
  from "sa-district-boundaries-2016"
  where wkb_geometry is not null `
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
      variables={{ id: databook.doc._id, sql: sql_district_simplified }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return 'loading..'
        }
        if (error) {
          console.log('error', error)
          return 'error!'
        }
        const customMapJson = {
          type: 'FeatureCollection',
          features: data.databook.execute.map((entry, i) => {
            return {
              type: 'Feature',
              id: i, //maybe replace with ogc_fid. much of a muchness
              properties: { name: entry.name },
              geometry: JSON.parse(entry.geojson),
            }
          }),
        }

        const fakeData = data.databook.execute.map((entry, i) => {
          return { name: entry.name, value: i * 3 }
        })
        console.log('fakseData', fakeData)
        echarts.registerMap('customMap', customMapJson)

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
                  text: 'hot dog strength by simplified districts (2011)',
                  subtext: 'Data from www.google.com',
                  sublink: 'https://www.google.com',
                  left: 'right',
                },
                tooltip: {
                  trigger: 'item',
                  showDelay: 0,
                  transitionDuration: 0.2,
                  formatter: '{b} : {c}',
                },
                visualMap: {
                  left: 'right',
                  inRange: {
                    color: [
                      '#313695',
                      '#4575b4',
                      '#74add1',
                      '#abd9e9',
                      '#e0f3f8',
                      '#ffffbf',
                      '#fee090',
                      '#fdae61',
                      '#f46d43',
                      '#d73027',
                      '#a50026',
                    ],
                  },
                  text: ['High', 'Low'],
                  // calculable: true
                },
                series: [
                  {
                    type: 'map',
                    mapType: 'customMap',
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
              className="react_for_echarts"
            />
          </div>
        )
      }}
    </WithGqlQuery>
  )
}
