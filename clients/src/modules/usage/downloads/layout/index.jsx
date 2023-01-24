import { useContext, useState } from 'react'
import { context as dataContext } from '../context'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import BarChart from '../../components/bar-chart'
import { alpha } from '@mui/material/styles'
import Map from '../../components/map'
import { Div } from '../../../../components/html-tags'
import Frame from '../../components/frame'

export default () => {
  const [mapContainer, setRef] = useState(null)
  const {
    downloadsCount,
    referrerCount,
    downloadsByDate,
    ipLocationCount,
    doiCount,
    ipLatLonCount,
  } = useContext(dataContext)

  return (
    <Grid container spacing={2}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Paper
          variant="elevation"
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: theme => theme.spacing(1),
            background: theme => alpha(theme.palette.common.white, 0.95),
            flexWrap: 'wrap',
          }}
        >
          {downloadsCount
            .sort(({ date: a }, { date: b }) => {
              if (a > b) return 1
              if (b > a) return -1
              return 0
            })
            .map(({ date, count }) => (
              <Typography
                key={date}
                sx={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}
                variant="overline"
              >
                {count} downloads in {date}
              </Typography>
            ))}
        </Paper>
      </Grid>

      {/* MAP */}
      <Frame ref={el => setRef(el)} gridProps={{ lg: 6 }}>
        <Div
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {mapContainer && (
            <Map
              containerRef={mapContainer}
              geojson={{
                type: 'FeatureCollection',
                crs: {
                  type: 'name',
                  properties: {
                    name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
                  },
                },
                features: ipLatLonCount
                  .map(({ clientIpLat: y, clientIpLon: x }) => {
                    if (!x && !y) {
                      return null
                    }
                    return {
                      type: 'Feature',
                      properties: {},
                      geometry: { type: 'Point', coordinates: [x, y, 0] },
                    }
                  })
                  .filter(_ => _),
              }}
            />
          )}
        </Div>
      </Frame>

      {/* BY DATE */}
      <Frame gridProps={{ lg: 6 }}>
        <BarChart
          title={'Monthly downloads (annually)'}
          type="bar"
          categoryFieldName="month"
          seriesFieldName="year"
          stackFieldName="year"
          data={downloadsByDate
            .map(({ date, ...other }) => {
              const dt = new Date(date)
              return {
                ...other,
                m: dt.getMonth(),
                month: dt.toLocaleString('en-US', { month: 'long' }),
                year: dt.getFullYear(),
              }
            })
            .sort(({ m: a }, { m: b }) => {
              if (a > b) return 1
              if (b > a) return -1
              return 0
            })}
        />
      </Frame>

      {/* BY REFERRER */}
      <Frame gridProps={{ lg: 6 }}>
        <BarChart
          title={'Top 25 referrers'}
          seriesFieldName="date"
          stackFieldName="date"
          categoryFieldName="referrer"
          categoryNameCoalesce="UNKNOWN"
          data={referrerCount}
        />
      </Frame>

      {/* BY LOCATION */}
      <Frame gridProps={{ lg: 6 }}>
        <BarChart
          title={'Top 25 user locations'}
          seriesFieldName="date"
          stackFieldName="date"
          categoryFieldName="clientIpLocation"
          data={ipLocationCount}
        />
      </Frame>

      {/* BY DOI */}
      <Frame gridProps={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <BarChart
          title={'100 most downloaded datasets'}
          seriesFieldName="date"
          stackFieldName="doi"
          categoryFieldName="doi"
          data={doiCount}
        />
      </Frame>
    </Grid>
  )
}
