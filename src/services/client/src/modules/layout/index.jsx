import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import State from '../provider-global'
import Header from './header'
import Routes from './routes'

export default () => {
  return (
    <State>
      <Router>
        <Header>
          <Routes />
        </Header>
      </Router>
    </State>
  )
}
