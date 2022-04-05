import mount from '../../index/main'
import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import RouteSwitcher from '../../index/route-switcher'
import { SizeContent } from '../../contexts/layout'
import { Banner } from '../../components/header'
import routes from './routes'

const App = lazy(() => import('../../index/application'))

const config = {
  backgroundImage: false,
}

const Page = () => (
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <Banner title="SAEON Data" />
      <SizeContent height>
        <RouteSwitcher routes={routes} />
      </SizeContent>
    </App>
  </Suspense>
)

mount(Page)
