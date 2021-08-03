import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import RouteSwitcher from '../../index/route-switcher'
import { SizeContent } from '../../contexts/layout'
import { Banner } from '../../components/header'
import routes from './routes'

const App = lazy(() => import('../../index/application'))

render(
  <Suspense fallback={<Loading />}>
    <App>
      <Banner />
      <SizeContent style={{ height: 1 }}>
        <RouteSwitcher routes={routes} />
      </SizeContent>
    </App>
  </Suspense>,
  document.getElementById('root')
)
