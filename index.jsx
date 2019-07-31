import React from 'react'
import { render } from "react-dom"
import { SaeonMap } from './src/index.jsx'

const wrapperStyle = {
  width: '50%',
  height: '50%',
  margin: '50px auto'
}

const Component = () =>
  <div style={wrapperStyle}>
    <SaeonMap />
  </div>

render(
  <Component/>,
  document.getElementById('root')
)