import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import UriStateProvider from '../provider-uri-state'
import Header from './header'
import Routes from './routes'

export default () => {
  return (
    <Router>
      <UriStateProvider>
        <Header>
          <Routes />
        </Header>
      </UriStateProvider>
    </Router>
  )
}
