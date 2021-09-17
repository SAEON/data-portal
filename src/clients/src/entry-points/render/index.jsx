import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import routes from './routes'
import RouteSwitcher from '../../index/route-switcher'

const App = lazy(() => import('../../index/application'))

render(
  <Suspense fallback={<Loading />}>
    <App>
      <RouteSwitcher routes={routes} />
    </App>
  </Suspense>,
  document.getElementById('root')
)
