import getUriState from '../../lib/fns/get-uri-state'
import Container from '@mui/material/Container'
import { PUBLIC_HTTP_ADDRESS } from '../../config'
import { BoxButton } from '../../components/fancy-buttons'
import SkipLink from '../../components/skip-link'

export default () => {
  const { redirect = '' } = getUriState()

  return (
    <>
      <SkipLink href="#login" text="Skip to main content" />
      <main style={{ height: '90vh', display: 'flex', alignItems: 'center' }} id="login">
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <BoxButton
            style={{ width: 150, height: 100 }}
            title="Log in"
            href={`${PUBLIC_HTTP_ADDRESS}/login?redirect=${redirect}`}
          />
        </Container>
      </main>
      <div style={{ height: '10vh' }} />
    </>
  )
}
