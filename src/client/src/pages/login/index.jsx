import getUriState from '../../lib/fns/get-uri-state'
import Container from '@material-ui/core/Container'
import { CATALOGUE_API_ADDRESS } from '../../config'
import FancyButton from '../../components/fancy-button'

export default () => {
  const { redirect = '' } = getUriState()

  return (
    <main style={{ height: '90vh', display: 'flex', alignItems: 'center' }} id="login">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <FancyButton
          style={{ width: 250, height: 250 }}
          title="Log in"
          href={`${CATALOGUE_API_ADDRESS}/login/google?redirect=${redirect}`}
        />
      </Container>
    </main>
  )
}
