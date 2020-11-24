import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Routes from './routes'

export default () => {
  const { pathname } = window.location
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0] // eslint-disable-line

  return (
    <Router>
      {currentRoute === '/render' ? undefined : <Header />}
      <Routes />
    </Router>
  )
}
