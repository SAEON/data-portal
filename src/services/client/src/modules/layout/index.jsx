import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MapProvider from '../provider-map'
import { Provider as MenuProvider } from '@saeon/snap-menus'
import Header from './header'
import Footer from './footer'
import useStyles from './style'
import clsx from 'clsx'
import { Fade } from '@material-ui/core'

// Pages
import AtlasPage from '../../pages/atlas'
import AboutPage from '../../pages/about'
import HomePage from '../../pages/home'
import CataloguePage from '../../pages/catalogue'
import CatalogueItemPage from '../../pages/catalogue-item'

const Transition = ({ children }) => (
  <Fade in={true}>
    <div>{children}</div>
  </Fade>
)

export default () => {
  const classes = useStyles()
  return (
    <Router>
      <Header />
      <div
        className={clsx({
          [classes.wrapper]: true,
        })}
      >
        {/* Authentication callback */}
        <Switch key={location.pathname || '/'}>
          <Route
            key={'authenticated'}
            path={'/authenticated'}
            render={() => <Redirect to={'/'} />}
          />

          {/* Catalogue */}
          <Route
            key={'catalogue'}
            exact={true}
            path={'/catalogue'}
            render={() => (
              <Transition>
                <CataloguePage />
              </Transition>
            )}
          />

          {/* Catalogue item */}
          <Route
            key={'catalogue-record'}
            path={'/catalogue/:id'}
            exact={false}
            render={props => (
              <Transition>
                <CatalogueItemPage id={props.match.params.id} {...props} />
              </Transition>
            )}
          />

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
                  <Transition>
                    <AtlasPage />
                  </Transition>
                </MenuProvider>
              )}
            />
            <Route
              key={'home'}
              path={'/'}
              exact={true}
              render={() => (
                <Transition>
                  <HomePage />
                </Transition>
              )}
            />
            <Route
              key={'about'}
              path={'/about'}
              exact={true}
              render={() => (
                <Transition>
                  <AboutPage />
                </Transition>
              )}
            />
          </MapProvider>
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}