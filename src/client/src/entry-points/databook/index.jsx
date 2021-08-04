import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import { ApplicationHeader } from '../../components/header'
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
      <ApplicationHeader routes={routes} color="primary" variant="dense" />
      <SizeContent style={{ height: 0 }}>
        <RouteSwitcher routes={routes} />
      </SizeContent>
    </App>
  </Suspense>,
  document.getElementById('root')
)
