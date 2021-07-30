import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import Router from '../../router'

const App = lazy(() => import('../../application'))

render(
  <Suspense fallback={<Loading />}>
    <App>
      <Router />
    </App>
  </Suspense>,
  document.getElementById('root')
)
