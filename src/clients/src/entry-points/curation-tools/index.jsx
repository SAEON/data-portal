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

const isSubdomainEntry = SUBDOMAIN_APP_ENTRIES.split(',').includes('curation-tools')

const config = {
  backgroundImage: true,
  contentBase: isSubdomainEntry ? undefined : '/curation-tools',
}

const routes = configureRoutes(config)

render(
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <Header {...config} title="SAEON Curation Tools" routes={routes} />
      <SizeContent height={true}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <RouteSwitcher routes={routes} />
        </div>
      </SizeContent>
    </App>
  </Suspense>,
  document.getElementById('root')
)
