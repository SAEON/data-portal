import { useContext, lazy, Suspense } from 'react'
import { context as downloadsContext } from './context'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Loading from '../../../components/loading'
import Typography from '@mui/material/Typography'
import Collapse from '../../../components/collapse'

const BarChart = lazy(() => import('./charts/bar-chart'))

export default () => {
  const { downloadsCount, referrerCount, deviceCount, downloadsByDate, ipLocationCount } =
    useContext(downloadsContext)

  return (
    <Grid container spacing={2}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent sx={{ padding: theme => theme.spacing(2) }}>
            <Typography sx={{ display: 'block', textAlign: 'center' }} variant="overline">
              Downloads: {downloadsCount?.count}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* LISTS */}
      <Grid item xs={12}>
        <Collapse
          cardSx={{ backgroundColor: theme => theme.palette.common.white }}
          defaultExpanded
          title="Downloads by referrer"
        >
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart yScale="log" categoryFieldName="referrer" data={referrerCount} />
            </Suspense>
          </CardContent>
        </Collapse>
      </Grid>

      {/* LOCATION */}
      <Grid item xs={12}>
        <Collapse
          title="Downloads by location"
          cardSx={{ backgroundColor: theme => theme.palette.common.white }}
        >
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart
                yScale="log"
                tooltip={{ show: false }}
                categoryFieldName="clientIpLocation"
                data={ipLocationCount}
              />
            </Suspense>
          </CardContent>
        </Collapse>
      </Grid>

      {/* DATE */}
      <Grid item xs={12}>
        <Collapse
          title="Downloads by date"
          cardSx={{ backgroundColor: theme => theme.palette.common.white }}
        >
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart type="bar" categoryFieldName="date" data={downloadsByDate} />
            </Suspense>
          </CardContent>
        </Collapse>
      </Grid>

      {/* DEVICE */}
      <Grid item xs={12}>
        <Collapse
          title="Downloads by device"
          cardSx={{ backgroundColor: theme => theme.palette.common.white }}
        >
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart yScale="log" categoryFieldName="device" data={deviceCount} />
            </Suspense>
          </CardContent>
        </Collapse>
      </Grid>
    </Grid>
  )
}
