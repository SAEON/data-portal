import { lazy } from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Transition from './_transition'
import Loading from '../../components/loading'

const HomePage = lazy(() => import('../../pages/home'))
const RecordPage = lazy(() => import('../../pages/record'))
const CompactRecordPage = lazy(() => import('../../pages/compact-record'))
const RecordsPage = lazy(() => import('../../pages/records'))
const Render = lazy(() => import('../../pages/render'))
const AtlasPage = lazy(() => import('../../pages/atlas'))
const DatabookPage = lazy(() => import('../../pages/databook'))
const DashboardPage = lazy(() => import('../../pages/dashboard'))
const ChartPage = lazy(() => import('../../pages/chart'))
const LoginPage = lazy(() => import('../../pages/login'))

export default withRouter(() => {
  return (
    <Switch key={location.pathname || '/'}>
      <Route key={'authenticated'} path={'/authenticated'} render={() => <Loading />} />
      <Route key={'logout'} path={'/logout'} render={() => <Redirect to={'/'} />} />

      {/* LOGIN */}
      <Route
        key={'login'}
        path={'/login'}
        exact
        render={() => (
          <Transition>
            <LoginPage />
          </Transition>
        )}
      />

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

      {/* HOME */}
      <Route
        key={'home'}
        path={'/'}
        exact
        render={() => (
          <Transition>
            <HomePage />
          </Transition>
        )}
      />

      {/* RECORDS */}
      <Route
        key={'records'}
        exact
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
        path={'/records/:id+'}
        exact={true}
        render={props => (
          <Transition tKey="record">
            <RecordPage id={props.match.params.id} {...props} />
          </Transition>
        )}
      />

      {/* COMPACT RECORD */}
      <Route
        key={'compact-record'}
        exact
        path={'/compact-record'}
        render={() => (
          <Transition tKey="compact-record">
            <CompactRecordPage />
          </Transition>
        )}
      />

      {/* DATABOOK */}
      <Route
        key={'databook'}
        path={'/databooks/:id'}
        exact
        render={props => (
          <Transition tKey={'databook'}>
            <DatabookPage id={props.match.params.id} {...props} />
          </Transition>
        )}
      />

      {/* DASHBOARD */}
      <Route
        key={'dashboard'}
        path={'/dashboards/:id'}
        exact
        render={props => (
          <Transition tKey={'dashboard'}>
            <DashboardPage id={props.match.params.id} {...props} />
          </Transition>
        )}
      />

      {/* CHART */}
      <Route
        key={'chart'}
        path={'/charts/:id'}
        exact
        render={props => (
          <Transition tKey={'chart'}>
            <ChartPage id={props.match.params.id} {...props} />
          </Transition>
        )}
      />

      {/* ATLAS */}
      <Route
        key={'atlas'}
        path={'/atlas'}
        exact
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
    </Switch>
  )
})
