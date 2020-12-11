import RemoveChartButton from './_remove-chart-button'
import ChartIcon from 'mdi-react/ChartBubbleIcon'
import { Typography, Grid } from '@material-ui/core'

const itemStyle = {
  display: 'flex',
  margin: 'auto',
}

export default ({ chart: id, dashboard }) => {
  return (
    <div style={{ height: '100%', display: 'flex', padding: 16 }}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item style={itemStyle}>
          <ChartIcon />
        </Grid>
        <Grid item style={itemStyle}>
          <Typography variant="overline">{id}</Typography>
        </Grid>
        <Grid item style={itemStyle}>
          <RemoveChartButton chartId={id} dashboard={dashboard} />
        </Grid>
      </Grid>
    </div>
  )
}
