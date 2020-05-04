import React from 'react'
import { Grid, Card, CardHeader, CardContent, Fade } from '@material-ui/core'

export default () => {
  return (
    <Fade in={true}>
      <Grid container justify="center" style={{ position: 'absolute', top: 100, zIndex: 1 }}>
        <Grid container spacing={2} alignItems="stretch" item xs={4}>
          <Grid item xs={12}>
            <Card variant="outlined" style={{ textAlign: 'center', opacity: 0.8 }}>
              <CardHeader title="Search" />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" style={{ textAlign: 'center', opacity: 0.8 }}>
              <CardContent>hi</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  )
}
