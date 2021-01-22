import { Card, CardContent, CardHeader, Grid, Divider } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'
import getUriState from '../../lib/fns/_get-uri-state'
import GoogleAuth from './_google'
import TwitterAuth from './_twitter'
import SaeonAuth from './_saeon'
import LocalAuth from './_local'

export default () => {
  const classes = useStyles()
  const { redirect } = getUriState()

  return (
    <Grid container alignItems="stretch" justify="center">
      <Grid item xs={12} sm={5} lg={4} className={clsx(classes.grid)}>
        <Card variant="outlined" className={clsx(classes.card)}>
          <CardHeader className={clsx(classes.header)} title="Login" />
          <CardContent>
            <LocalAuth />

            <Divider className={clsx(classes.divider)} />

            <SaeonAuth redirect={redirect} />
            <GoogleAuth redirect={redirect} />
            <TwitterAuth redirect={redirect} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
