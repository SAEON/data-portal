import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'typeface-roboto'
import './index.scss'
import '@saeon/logger'
import React from 'react'
import { render } from 'react-dom'
import { REACT_APP_ROOT } from './config'
import theme from './theme'
import Application from './app'
import nativeExtensions from './lib/native-extensions'
nativeExtensions()

render(<Application theme={theme} />, document.getElementById(REACT_APP_ROOT))
