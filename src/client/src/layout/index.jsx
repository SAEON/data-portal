import { useContext } from 'react'
import LayoutProvider, { context as layoutContext } from './context'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Routes from './routes'

const Layout = () => {
  const { pathname } = window.location
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0] // eslint-disable-line
  const { headerRef, setHeaderRef, contentRef, setContentRef } = useContext(layoutContext)

  const headerLess = currentRoute === '/render'

  return (
    <Router>
      {!headerLess && <Header contentRef={contentRef} ref={el => setHeaderRef(el)} />}
      {(headerRef || headerLess) && (
        <div
          ref={el => setContentRef(el)}
          style={{
            position: 'relative',
            minHeight: `calc(100% - ${headerRef?.offsetHeight || 0}px)`,
          }}
        >
          <Routes />
        </div>
      )}
    </Router>
  )
}

export default () => (
  <LayoutProvider>
    <Layout />
  </LayoutProvider>
)
