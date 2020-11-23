import { Grid, IconButton, Card, CardContent } from '@material-ui/core'
import ShareIcon from 'mdi-react/LinkPlusIcon'
import AddChartIcon from 'mdi-react/ChartPieIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'

export default ({ id }) => {
  return (
    <Grid container spacing={2}>
      <Grid container item justify="flex-end">
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <AddChartIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Card style={{ margin: 36 }}>
          <CardContent>{id}</CardContent>
          <CardContent>DnD list of charts, filters, etc</CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
