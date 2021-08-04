import getUriState from '../../lib/fns/get-uri-state'
import Container from '@material-ui/core/Container'
import { API_PUBLIC_ADDRESS } from '../../config'
import FancyButton from '../../components/fancy-button'
import SkipLink from '../../components/skip-link'

export default () => {
  const { redirect = '' } = getUriState()

  return (
    <>
      <SkipLink href="#login" text="Skip to main content" />
      <main style={{ height: '90vh', display: 'flex', alignItems: 'center' }} id="login">
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <FancyButton
            style={{ width: 250, height: 250 }}
            title="Log in"
            href={`${API_PUBLIC_ADDRESS}/login?redirect=${redirect}`}
          />
        </Container>
      </main>
      <div style={{ height: '10vh' }} />
    </>
  )
}
