import { Grid, Card, CardContent, Toolbar } from '@material-ui/core'
import AddChartButton from './_add-chart-button'
import DeleteButton from './_delete-button'
import ShareButton from './_share-button'

export default ({ id, setActiveTabIndex }) => {
  return (
    <>
      <Toolbar variant={'dense'}>
        <span style={{ marginLeft: 'auto' }} />
        <AddChartButton />
        <span style={{ marginRight: 16 }} />
        <ShareButton id={id} />
      </Toolbar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ margin: 36 }}>
            <CardContent>{id}</CardContent>
            <CardContent>DnD list of charts, filters, etc</CardContent>
          </Card>
        </Grid>
        <DeleteButton id={id} setActiveTabIndex={setActiveTabIndex} />
      </Grid>
    </>
  )
}
