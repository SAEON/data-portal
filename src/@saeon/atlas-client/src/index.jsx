import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from './lib/ol'
import { MenuManager, AppLayout } from './modules/layout'
import themeConfig from './theme'

const theme = createMuiTheme(themeConfig)

const App = () => (
  <CssBaseline>
    <ThemeProvider theme={theme}>
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
            <MapProxy map={map}>
              {({ proxy }) => (
                <MenuManager test="jo there">
                  <AppLayout proxy={proxy} />
                </MenuManager>
              )}
            </MapProxy>
          )}
        </OlReact>
      </div>
    </ThemeProvider>
  </CssBaseline>
)

render(<App />, document.getElementById('root'))
