import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import useStyles from './style'
import clsx from 'clsx'
import getUriState from '../../lib/fns/get-uri-state'
import GoogleAuth from './_google'
import TwitterAuth from './_twitter'
import SaeonAuth from './_saeon'
import LocalAuth from './local'
import Container from '@material-ui/core/Container'

export default () => {
  const classes = useStyles()
  const { redirect } = getUriState()

  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: window.location.pathname.includes('render') ? 0 : 48,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      id="login"
    >
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ maxWidth: 400 }} variant="outlined" className={clsx(classes.card)}>
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
      </Container>
    </main>
  )
}
