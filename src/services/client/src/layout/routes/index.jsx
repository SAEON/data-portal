import React, { lazy } from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Transition from './_transition'

const HomePage = lazy(() => import('../../pages/home'))
const RecordPage = lazy(() => import('../../pages/record'))
const RecordsPage = lazy(() => import('../../pages/records'))
const Render = lazy(() => import('../../pages/render'))
const AtlasPage = lazy(() => import('../../pages/atlas'))

export default withRouter(() => {
  return (
    <Switch key={location.pathname || '/'}>
      <Route key={'authenticated'} path={'/authenticated'} render={() => <Redirect to={'/'} />} />

      {/* Render individual components */}
      <Route
        key={'render'}
        exact={false}
        path={'/render'}
        render={props => (
          <Transition tKey="render">
            <Render {...props} />
          </Transition>
        )}
      />

      {/* RECORDS */}
      <Route
        key={'records'}
        exact={true}
        path={'/records'}
        render={() => (
          <Transition tKey="records">
            <RecordsPage />
          </Transition>
        )}
      />

      {/* RECORD */}
      <Route
        key={'record'}
        path={'/records/:id'}
        exact={false}
        render={props => (
          <Transition tKey="record">
            <RecordPage id={props.match.params.id} {...props} />
          </Transition>
        )}
      />

      {/* ATLAS */}
      <Route
        key={'atlas'}
        path={'/atlas'}
        exact={true}
        render={() => {
          return (
            <Transition tKey="atlas">
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  marginTop: 48,
                }}
              >
                <AtlasPage />
              </div>
            </Transition>
          )
        }}
      />

      {/* HOME */}
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
    </Switch>
  )
})
