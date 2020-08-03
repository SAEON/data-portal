import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import useStyles from './style'
import clsx from 'clsx'
import Routes from './routes'

const Header = lazy(() => import('./header'))
const Footer = lazy(() => import('./footer'))

const headlessPages = ['/render']

export default () => {
  const classes = useStyles()
  const { pathname } = window.location
  // eslint-disable-next-line no-useless-escape
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0]

  return (
    <Router>
      {headlessPages.includes(currentRoute) ? null : (
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      )}

      <div
        className={clsx({
          [classes.wrapper]: true,
        })}
      >
        <Routes />
      </div>
      {headlessPages.includes(currentRoute) ? null : (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </Router>
  )
}
