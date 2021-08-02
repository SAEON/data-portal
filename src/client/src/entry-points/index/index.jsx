import '../../application/configure-client'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from '../../components/loading'
import Routes from '../../routes'
import { SizeContentDynamically } from '../../contexts/layout'
import Footer from '../../components/footer'
import Header from '../../components/header'

const App = lazy(() => import('../../application'))

render(
  <Suspense fallback={<Loading />}>
    <App>
      <Header />
      <SizeContentDynamically>
        <Routes />
      </SizeContentDynamically>
      <Footer />
    </App>
  </Suspense>,
  document.getElementById('root')
)
