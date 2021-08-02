import getUriState from '../../lib/fns/get-uri-state'
import GoogleAuth from './_google'
// import SaeonAuth from './_saeon'
import Container from '@material-ui/core/Container'

export default () => {
  const { redirect } = getUriState()

  return (
    <main style={{ height: '90vh', display: 'flex', alignItems: 'center' }} id="login">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <SaeonAuth redirect={redirect} /> */}
        <GoogleAuth redirect={redirect} />
      </Container>
    </main>
  )
}
