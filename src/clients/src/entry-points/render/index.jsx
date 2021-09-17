import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import RouteSwitcher from '../../index/route-switcher'
import configureRoutes from './routes'
import { SUBDOMAIN_APP_ENTRIES } from '../../config'

const App = lazy(() => import('../../index/application'))

const isSubdomainEntry = SUBDOMAIN_APP_ENTRIES.split(',').includes('render')

const config = {
  backgroundImage: true,
  contentBase: isSubdomainEntry ? undefined : '/render',
}

const routes = configureRoutes(config)

render(
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <RouteSwitcher routes={routes} />
    </App>
  </Suspense>,
  document.getElementById('root')
)
