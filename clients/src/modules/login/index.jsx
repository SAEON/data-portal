import getUriState from '../../lib/fns/get-uri-state'
import { PUBLIC_HTTP_ADDRESS } from '../../config'
import { BoxButton } from '../../components/fancy-buttons'
import SkipLink from '../../components/skip-link'
import { Div, Main } from '../../components/html-tags'
import FlatPage from '../../components/flat-page'

export default () => {
  const { redirect = '' } = getUriState()

  return (
    <>
      <SkipLink href="#login" text="Skip to main content" />
      <Main id="login">
        <FlatPage>
          <Div sx={{ width: 150, height: 100, margin: 'auto' }}>
            <BoxButton title="Log in" href={`${PUBLIC_HTTP_ADDRESS}/login?redirect=${redirect}`} />
          </Div>
        </FlatPage>
      </Main>
    </>
  )
}
