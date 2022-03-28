import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import RouteSwitcher from '../../index/route-switcher'
import Header from '../../components/header'
import { SizeContent } from '../../contexts/layout'
import configureRoutes from './routes'
import { SUBDOMAIN_APP_ENTRIES } from '../../config'

const App = lazy(() => import('../../index/application'))

const isSubdomainEntry = SUBDOMAIN_APP_ENTRIES.split(',').includes('ocims')

const config = {
  backgroundImage: true,
  contentBase: isSubdomainEntry ? undefined : '/ocims'
}

const routes = configureRoutes(config)

render(
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <Header {...config} title="OCIMS visualizations" routes={routes} />
      <SizeContent>
        <RouteSwitcher routes={routes} />
      </SizeContent>
    </App>
  </Suspense>,
  document.getElementById('root')
)
