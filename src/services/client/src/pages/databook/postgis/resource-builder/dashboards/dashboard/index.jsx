import { Grid, IconButton, Card, CardContent } from '@material-ui/core'
import ShareIcon from 'mdi-react/LinkPlusIcon'
import AddChartIcon from 'mdi-react/ChartPieIcon'

export default ({ id }) => {
  return (
    <Grid container spacing={2}>
      <Grid container item justify="flex-end">
        <IconButton size="small">
          <AddChartIcon />
        </IconButton>
        <IconButton size="small">
          <ShareIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>{id}</CardContent>
          <CardContent>DnD list of charts, filters, etc</CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
