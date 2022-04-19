import mount from '../../entry-point/main'
import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import RouteSwitcher from '../../entry-point/route-switcher'
import configureRoutes from './routes'
import { SUBDOMAIN_APP_ENTRIES } from '../../config'

const App = lazy(() => import('../../entry-point/application'))

const isSubdomainEntry = SUBDOMAIN_APP_ENTRIES.split(',').includes('render')

const config = {
  contentBase: isSubdomainEntry ? undefined : '/render',
}

const routes = configureRoutes(config)

const Page = () => (
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <RouteSwitcher routes={routes} />
    </App>
  </Suspense>
)

mount(Page)
