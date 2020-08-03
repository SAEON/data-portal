import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Routes from './routes'

export default () => {
  return (
    <Router>
      <Header>
        <Routes />
      </Header>
    </Router>
  )
}
