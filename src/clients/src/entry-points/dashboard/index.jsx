import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import RouteSwitcher from '../../index/route-switcher'
import { SizeContent } from '../../contexts/layout'
import { Banner } from '../../components/header'
import routes from './routes'

const App = lazy(() => import('../../index/application'))

const config = {}

render(
  <Suspense fallback={<Loading />}>
    <App {...config}>
      <Banner title="SAEON Data" />
      <SizeContent>
        <div style={{ minHeight: 1000 }}>
          <RouteSwitcher routes={routes} />
        </div>
      </SizeContent>
    </App>
  </Suspense>,
  document.getElementById('root')
)
