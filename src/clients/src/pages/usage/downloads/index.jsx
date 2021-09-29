import { useContext, lazy, Suspense } from 'react'
import { context as downloadsContext } from './context'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Loading from '../../../components/loading'
import useTheme from '@material-ui/core/styles/useTheme'
import Typography from '@material-ui/core/Typography'
import Collapse from '../../../components/collapse'

const BarChart = lazy(() => import('./charts/bar-chart'))

export default () => {
  const theme = useTheme()
  const { downloadsCount, referrerCount, deviceCount, downloadsByDate, ipLocationCount } =
    useContext(downloadsContext)

  return (
    <Grid container spacing={2}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent style={{ padding: theme.spacing(2) }}>
            <Typography style={{ display: 'block', textAlign: 'center' }} variant="overline">
              Downloads: {downloadsCount.count}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* LISTS */}
      <Grid item xs={12}>
        <Collapse
          cardStyle={{ backgroundColor: theme.palette.common.white }}
          defaultExpanded
          title="Downloads by referrer (excluding unknown referrers)"
        >
          <CardContent style={{ padding: theme.spacing(1), position: 'relative' }}>
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
          cardStyle={{ backgroundColor: theme.palette.common.white }}
        >
          <CardContent style={{ padding: theme.spacing(1), position: 'relative' }}>
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
          cardStyle={{ backgroundColor: theme.palette.common.white }}
        >
          <CardContent style={{ padding: theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart type="bar" categoryFieldName="date" data={downloadsByDate} />
            </Suspense>
          </CardContent>
        </Collapse>
      </Grid>

      {/* DEVICE */}
      <Grid item xs={12}>
        <Collapse
          title="Downloads by device (total)"
          cardStyle={{ backgroundColor: theme.palette.common.white }}
        >
          <CardContent style={{ padding: theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart yScale="log" categoryFieldName="device" data={deviceCount} />
            </Suspense>
          </CardContent>
        </Collapse>
      </Grid>
    </Grid>
  )
}
