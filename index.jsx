import React from 'react'
import { render } from "react-dom"
import { SaeonMap } from './src/index.jsx'

const wrapperStyle = {
  width: '100%',
  height: '100%'
}

const Component = () =>
  <div style={wrapperStyle}>
    <SaeonMap />
  </div>

render(
  <Component/>,
  document.getElementById('root')
)