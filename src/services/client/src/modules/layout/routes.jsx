import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Fade, LinearProgress } from '@material-ui/core'

// Packages
const MapProvider = lazy(() => import('../provider-map'))
const MenuProvider = lazy(() => import('@saeon/snap-menus'))

// Pages
const HomePage = lazy(() => import('../../pages/home'))
const RecordPage = lazy(() => import('../../pages/record'))
const RecordsPage = lazy(() => import('../../pages/records'))
const AboutPage = lazy(() => import('../../pages/about'))
const RenderComponent = lazy(() => import('../../pages/render'))
const AtlasPage = lazy(() => import('../../pages/atlas'))

const PageTransition = ({ children, tKey }) => (
  <Fade key={tKey} in={true}>
    <div>
      <Suspense fallback={<LinearProgress style={{ position: 'absolute', left: 0, right: 0 }} />}>
        {children}
      </Suspense>
    </div>
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

        {/* RECORDS */}
        <Route
          key={'records'}
          exact={true}
          path={'/records'}
          render={() => (
            <PageTransition tKey="records">
              <RecordsPage />
            </PageTransition>
          )}
        />

        {/* RECORD */}
        <Route
          key={'record'}
          path={'/records/:id'}
          exact={false}
          render={props => (
            <PageTransition tKey="record">
              <RecordPage id={props.match.params.id} {...props} />
            </PageTransition>
          )}
        />

        {/* These routes have the same Background map */}
        <Suspense fallback={<LinearProgress style={{ position: 'absolute', left: 0, right: 0 }} />}>
          <MapProvider>
            <Route
              key={'atlas'}
              path={'/atlas'}
              exact={true}
              render={() => (
                <PageTransition tKey="atlas">
                  <MenuProvider
                    VERTICAL_OFFSET_TOP={55}
                    HORIZONTAL_MARGIN={5}
                    VERTICAL_OFFSET_BOTTOM={30}
                  >
                    <AtlasPage />
                  </MenuProvider>
                </PageTransition>
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
        </Suspense>
      </Switch>
    </>
  )
}
