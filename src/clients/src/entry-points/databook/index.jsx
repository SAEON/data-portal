import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import { Banner } from '../../components/header'
import { SizeContent } from '../../contexts/layout'
import RouteSwitcher from '../../index/route-switcher'
import routes from './routes'

const App = lazy(() => import('../../index/application'))

const config = {
  backgroundImage: false,
}

render(
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <Banner title="SAEON Databook" />
      <SizeContent height>
        <RouteSwitcher routes={routes} />
      </SizeContent>
    </App>
  </Suspense>,
  document.getElementById('root')
)
