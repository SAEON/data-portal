import mount from '../../index/main'
import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import RouteSwitcher from '../../index/route-switcher'
import { SizeContent } from '../../contexts/layout'
import Footer from '../../components/footer'
import { Banner } from '../../components/header'
import configureRoutes from './routes'
import { SUBDOMAIN_APP_ENTRIES } from '../../config'

const App = lazy(() => import('../../index/application'))

const isSubdomainEntry = SUBDOMAIN_APP_ENTRIES.split(',').includes('list')

const config = {
  backgroundImage: true,
  contentBase: isSubdomainEntry ? undefined : '/list',
}

const routes = configureRoutes(config)

const Page = () => (
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <Banner title="SAEON Data" />
      <SizeContent>
        <RouteSwitcher routes={routes} />
      </SizeContent>
      <Footer routes={routes} />
    </App>
  </Suspense>
)

mount(Page)
