import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalProvider from '../contexts/global'
import Header from './header'
import Routes from './routes'

export default () => {
  return (
    <GlobalProvider>
      <Router>
        <Header>
          <Routes />
        </Header>
      </Router>
    </GlobalProvider>
  )
}
