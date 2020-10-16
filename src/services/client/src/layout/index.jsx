import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Routes from './routes'

export default () => {
  const { pathname } = window.location
  // eslint-disable-next-line no-useless-escape
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0]

  return (
    <Router>
      {currentRoute === '/render' ? undefined : <Header />}
      <Routes />
    </Router>
  )
}
