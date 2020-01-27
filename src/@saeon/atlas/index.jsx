import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import WebFontLoader from 'webfontloader'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons', 'Open+Sans:400,600']
  }
})

const App = () => <div>hello world</div>

render(<App />, document.getElementById('root'))
