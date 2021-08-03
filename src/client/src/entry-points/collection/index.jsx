import '../../index/main'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import RouteSwitcher from '../../index/route-switcher'
import { SizeContent } from '../../contexts/layout'
import Footer from '../../components/footer'
import { Banner } from '../../components/header'
import routes from './routes'

const App = lazy(() => import('../../index/application'))

render(
  <Suspense fallback={<Loading />}>
    <App>
      <Banner />
      <SizeContent>
        <RouteSwitcher routes={routes} />
      </SizeContent>
      <Footer routes={routes} />
    </App>
  </Suspense>,
  document.getElementById('root')
)
