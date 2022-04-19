import mount from '../../entry-point/main'
import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import RouteSwitcher from '../../entry-point/route-switcher'
import { SizeContent } from '../../contexts/layout'
import { Banner } from '../../components/header'
import routes from './routes'

const App = lazy(() => import('../../entry-point/application'))

const config = {}

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
