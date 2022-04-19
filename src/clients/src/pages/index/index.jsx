import mount from '../../entry-point/main'
import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import RouteSwitcher from '../../entry-point/route-switcher'
import { SizeContent } from '../../contexts/layout'
import Footer from '../../components/footer'
import Header from '../../components/header'
import routes from './routes'
import { DEPLOYMENT_ENV } from '../../config'
import packageJson from '../../../package.json'

const App = lazy(() => import('../../entry-point/application'))

const config = {
  contentBase: undefined,
}

const Page = () => (
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <Header
        {...config}
        title={`SAEON DATA PORTAL ${
          DEPLOYMENT_ENV === 'production' ? '' : `${DEPLOYMENT_ENV}.${packageJson.version}`
        }`}
        routes={routes}
      />
      <SizeContent>
        <RouteSwitcher routes={routes} />
      </SizeContent>
      <Footer routes={routes} />
    </App>
  </Suspense>
)

mount(Page)
