import Loading from '../../components/loading'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

export default ({ tablesReady, tables }) => {
  return (
    <div>
      <Loading />
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" style={{ marginTop: 16 }}>
            <CardContent style={{ justifyContent: 'center', display: 'flex' }}>
              <Typography variant="overline" style={{ display: 'flex', alignSelf: 'center' }}>
                {`Loaded ${tablesReady} of ${Object.entries(tables).length} tables. Please wait...`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
