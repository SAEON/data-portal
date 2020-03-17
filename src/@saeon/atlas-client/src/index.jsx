import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from './lib/ol'
import { AppLayout } from './modules/layout'
import MenuProvider from './modules/menu-provider'
import ExceptionProvider from './modules/exception-provider'
import theme from './theme'
import { nativeExtensions } from '../../fns-lib'
nativeExtensions()

const App = () => (
  <CssBaseline>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <ExceptionProvider>
        <MenuProvider>
          <div style={{ height: 'calc(100% - 42px)', width: '100%' }}>
            <OlReact
              viewOptions={{
                center: [32, -15],
                zoom: 4.6
              }}
              layers={[terrestrisBaseMap()]}
              style={{ width: '100%', height: '100%' }}
            >
              {({ map }) => (
                <MapProxy map={map}>{({ proxy }) => <AppLayout proxy={proxy} />}</MapProxy>
              )}
            </OlReact>
          </div>
        </MenuProvider>
      </ExceptionProvider>
    </ThemeProvider>
  </CssBaseline>
)

render(<App />, document.getElementById('root'))
