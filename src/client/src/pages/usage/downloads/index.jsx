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
  const { downloadCount, referrerCount, deviceCount } = useContext(downloadsContext)

  return (
    <Grid container spacing={2}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent style={{ padding: theme.spacing(2) }}>
            <Typography style={{ display: 'block', textAlign: 'center' }} variant="overline">
              Downloads: {downloadCount.count}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* COLLECTION */}
      <Grid item xs={12}>
        <Collapse
          cardStyle={{ backgroundColor: theme.palette.common.white }}
          defaultExpanded
          title="Downloads by collection (total)"
        >
          <Suspense fallback={<Loading style={{ position: 'relative' }} />}>
            <BarChart
              filter={datum => Boolean(datum.referrer)}
              seriesFieldName="date"
              categoryFieldName="referrer"
              data={referrerCount}
            />
          </Suspense>
        </Collapse>
      </Grid>

      {/* DATE */}
      <Grid item xs={12}>
        <Collapse
          title="Downloads by date (total)"
          cardStyle={{ backgroundColor: theme.palette.common.white }}
        >
          <Suspense fallback={<Loading style={{ position: 'relative' }} />}>
            <BarChart seriesFieldName="referrer" categoryFieldName="date" data={referrerCount} />
          </Suspense>
        </Collapse>
      </Grid>

      {/* DEVICE */}
      <Grid item xs={12}>
        <Collapse
          title="Downloads by device (total)"
          cardStyle={{ backgroundColor: theme.palette.common.white }}
        >
          <Suspense fallback={<Loading style={{ position: 'relative' }} />}>
            <BarChart
              yScale="log"
              seriesFieldName="referrer"
              categoryFieldName="device"
              data={deviceCount}
            />
          </Suspense>
        </Collapse>
      </Grid>
    </Grid>
  )
}
