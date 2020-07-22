import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import MapProvider from '../provider-map'
import { Provider as MenuProvider } from '@saeon/snap-menus'
import { Fade } from '@material-ui/core'

// Pages
import AtlasPage from '../../pages/atlas'
import AboutPage from '../../pages/about'
import HomePage from '../../pages/home'
import CataloguePage from '../../pages/catalogue'
import CatalogueItemPage from '../../pages/catalogue-item'
import RenderComponent from '../../pages/render'

const PageTransition = ({ children, tKey }) => (
  <Fade key={tKey} in={true}>
    <div>{children}</div>
  </Fade>
)

export default () => {
  return (
    <>
      {/* Authentication callback */}
      <Switch key={location.pathname || '/'}>
        <Route key={'authenticated'} path={'/authenticated'} render={() => <Redirect to={'/'} />} />

        {/* Render individual components */}
        <Route
          key={'render'}
          exact={false}
          path={'/render'}
          render={props => (
            <PageTransition tKey="render">
              <RenderComponent {...props} />
            </PageTransition>
          )}
        />

        {/* Catalogue */}
        <Route
          key={'catalogue'}
          exact={true}
          path={'/catalogue'}
          render={() => (
            <PageTransition tKey="catalogue">
              <CataloguePage />
            </PageTransition>
          )}
        />

        {/* Catalogue item */}
        <Route
          key={'catalogue-record'}
          path={'/catalogue/:id'}
          exact={false}
          render={props => (
            <PageTransition tKey="catalogue-record">
              <CatalogueItemPage id={props.match.params.id} {...props} />
            </PageTransition>
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
                <PageTransition tKey="atlas">
                  <AtlasPage />
                </PageTransition>
              </MenuProvider>
            )}
          />
          <Route
            key={'home'}
            path={'/'}
            exact={true}
            render={() => (
              <PageTransition>
                <HomePage />
              </PageTransition>
            )}
          />
          <Route
            key={'about'}
            path={'/about'}
            exact={true}
            render={() => (
              <PageTransition tKey="about">
                <AboutPage />
              </PageTransition>
            )}
          />
        </MapProvider>
      </Switch>
    </>
  )
}
