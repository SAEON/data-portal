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
  const { ipLatLonCount, downloadsByDate, deviceCount, referrerCount, ipLocationCount } =
    useContext(dataContext)

  return (
    <Grid container spacing={2}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Paper
          variant="elevation"
          sx={{
            padding: theme => theme.spacing(1),
            background: theme => alpha(theme.palette.common.white, 0.95),
          }}
        >
          <Typography
            sx={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}
            variant="overline"
          >
            Total visits {ipLatLonCount.length}
          </Typography>
        </Paper>
      </Grid>

      {/* MAP */}
      <Frame ref={el => setRef(el)} gridProps={{ lg: 7 }}>
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
      <Frame gridProps={{ lg: 5 }}>
        <BarChart title={'By date'} type="bar" categoryFieldName="date" data={downloadsByDate} />
      </Frame>

      {/* BY DEVICE */}
      <Frame>
        <BarChart title={'By device'} yScale="log" categoryFieldName="device" data={deviceCount} />
      </Frame>

      {/* BY REFERRER */}
      <Frame gridProps={{ lg: 8 }}>
        <BarChart
          title={'By referrer'}
          yScale="log"
          categoryFieldName="referrer"
          data={referrerCount}
        />
      </Frame>

      {/* BY LOCATION */}
      <Frame gridProps={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <BarChart
          title={'By location'}
          yScale="log"
          categoryFieldName="clientIpLocation"
          data={ipLocationCount}
        />
      </Frame>
    </Grid>
  )
}
