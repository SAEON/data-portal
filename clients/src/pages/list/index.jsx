import mount from '../../entry-point/main'
import { lazy, Suspense, useRef, useContext } from 'react'
import { context as searchContext } from '../../contexts/search'
import Loading from '../../components/loading'
import RouteSwitcher from '../../entry-point/route-switcher'
import { SizeContent } from '../../contexts/layout'
import Footer from '../../components/footer'
import { ListHeader } from '../../components/header'
import configureRoutes from './routes'
import { SUBDOMAIN_APP_ENTRIES } from '../../config'

const App = lazy(() => import('../../entry-point/application'))

const isSubdomainEntry = SUBDOMAIN_APP_ENTRIES.split(',').includes('list')

const config = {
  contentBase: isSubdomainEntry ? undefined : '/list',
}

const routes = configureRoutes(config)

const Header = ({ title: _title, description: _description }) => {
  const { list: { title, description } = {} } = useContext(searchContext)
  return <ListHeader title={title || _title} description={description || _description} />
}

const Page = () => {
  const titleRef = useRef(document.getElementById('document-title'))
  const contentRef = useRef(document.getElementById('document-description'))

  const title = (titleRef.current?.innerHTML || '$TITLE').replace('$TITLE', 'SAEON Data')
  const description = (contentRef.current?.content || '$DESCRIPTION').replace(
    '$DESCRIPTION',
    'Curated data collection'
  )

  return (
    <Suspense fallback={<Loading />}>
      <App {...config}>
        <Header title={title} description={description} />
        <SizeContent>
          <RouteSwitcher routes={routes} />
        </SizeContent>
        <Footer routes={routes} />
      </App>
    </Suspense>
  )
}

mount(Page)
