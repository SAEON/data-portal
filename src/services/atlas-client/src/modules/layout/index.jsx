import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MapProvider from '../provider-map'
import { Provider as MenuProvider } from '@saeon/snap-menus'
import Header from './header'
import Footer from './footer'

// Pages
import AtlasPage from '../../pages/atlas'
import AboutPage from '../../pages/about'
import HomePage from '../../pages/home'
import CataloguePage from '../../pages/catalogue'

export default () => (
  <Router>
    <Header />

    <Switch key={location.pathname || '/'}>
      <Route
        key={'authenticated'}
        path={'/authenticated'}
        exact={true}
        render={() => <Redirect to={'/'} />}
      />
      <Route key={'catalogue'} path={'/catalogue'} exact={true} render={() => <CataloguePage />} />

      {/* These routes have the same Background map */}
      <MapProvider>
        <Route
          key={'atlas'}
          path={'/atlas'}
          exact={true}
          render={() => (
            <MenuProvider
              VERTICAL_OFFSET_TOP={55}
              HORIZONTAL_MARGIN={5}
              VERTICAL_OFFSET_BOTTOM={30}
            >
              <AtlasPage />
            </MenuProvider>
          )}
        />
        <Route key={'home'} path={'/'} exact={true} render={() => <HomePage />} />
        <Route key={'about'} path={'/about'} exact={true} render={() => <AboutPage />} />
      </MapProvider>
    </Switch>
    <Footer />
  </Router>
)
