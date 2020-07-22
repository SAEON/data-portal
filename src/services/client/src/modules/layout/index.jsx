import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import useStyles from './style'
import clsx from 'clsx'
import Routes from './routes'

const headlessPages = ['/render']

export default () => {
  const classes = useStyles()
  const { pathname } = window.location
  // TODO: This looks like an eslint bug - the escapes are definitely required
  // eslint-disable-next-line no-useless-escape
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0]

  return (
    <Router>
      {headlessPages.includes(currentRoute) ? null : <Header />}

      <div
        className={clsx({
          [classes.wrapper]: true,
        })}
      >
        <Routes />
      </div>
      {headlessPages.includes(currentRoute) ? null : <Footer />}
    </Router>
  )
}
