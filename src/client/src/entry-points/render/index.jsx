import '../../application/configure-client'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import Routes from '../../routes'

const App = lazy(() => import('../../application'))

render(
  <Suspense fallback={<Loading />}>
    <App>
      <Routes />
    </App>
  </Suspense>,
  document.getElementById('root')
)
