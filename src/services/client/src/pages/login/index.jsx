import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import useStyles from './style'
import clsx from 'clsx'
import getUriState from '../../lib/fns/get-uri-state'
import GoogleAuth from './_google'
import TwitterAuth from './_twitter'
import SaeonAuth from './_saeon'
import LocalAuth from './local'

export default () => {
  const classes = useStyles()
  const { redirect } = getUriState()

  return (
    <Grid container alignItems="stretch" justify="center">
      <Grid item xs={12} sm={5} lg={4} className={clsx(classes.grid)}>
        <Card variant="outlined" className={clsx(classes.card)}>
          <CardHeader
            className={clsx(classes.header)}
            title={<Typography variant="overline">Login to the SAEON Data Portal</Typography>}
          />
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
