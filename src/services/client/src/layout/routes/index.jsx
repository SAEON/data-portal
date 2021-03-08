import { lazy } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Transition from './_transition'

const HomePage = lazy(() => import('../../pages/home'))
const RecordPage = lazy(() => import('../../pages/record'))
const CompactRecordPage = lazy(() => import('../../pages/compact-record'))
const RecordsPage = lazy(() => import('../../pages/records'))
const Render = lazy(() => import('../../pages/render'))
const AtlasPage = lazy(() => import('../../pages/atlas'))
const DatabookPage = lazy(() => import('../../pages/databook'))
const Databook2Page = lazy(() => import('../../pages/databook2'))
const DatabooksPage = lazy(() => import('../../pages/databooks'))
const UsersPage = lazy(() => import('../../pages/users'))
const DashboardPage = lazy(() => import('../../pages/dashboard'))
const ChartPage = lazy(() => import('../../pages/chart'))
const LoginPage = lazy(() => import('../../pages/login'))
const TermsOfServicePage = lazy(() => import('../../pages/terms-of-service'))
const TermsOfUsePage = lazy(() => import('../../pages/terms-of-use'))
const AboutPage = lazy(() => import('../../pages/about'))
const PrivacyPolicyPage = lazy(() => import('../../pages/privacy-policy'))
const ContactPage = lazy(() => import('../../pages/contact'))
const DisclaimerPage = lazy(() => import('../../pages/disclaimer'))

export default withRouter(() => {
  return (
    <Switch key={location.pathname || '/'}>
      {/* CONTACT */}
      <Route
        key={'contact'}
        path={'/contact'}
        exact
        render={() => (
          <Transition>
            <ContactPage />
          </Transition>
        )}
      />

      {/* DISCLAIMER */}
      <Route
        key={'disclaimer'}
        path={'/disclaimer'}
        exact
        render={() => (
          <Transition>
            <DisclaimerPage />
          </Transition>
        )}
      />

      {/* PRIVACY POLICY */}
      <Route
        key={'privacy-policy'}
        path={'/privacy-policy'}
        exact
        render={() => (
          <Transition>
            <PrivacyPolicyPage />
          </Transition>
        )}
      />

      {/* ABOUT */}
      <Route
        key={'about'}
        path={'/about'}
        exact
        render={() => (
          <Transition>
            <AboutPage />
          </Transition>
        )}
      />

      {/* TERMS OF SERVICE */}
      <Route
        key={'terms-of-service'}
        path={'/terms-of-service'}
        exact
        render={() => (
          <Transition>
            <TermsOfServicePage />
          </Transition>
        )}
      />

      {/* TERMS OF SERVICE */}
      <Route
        key={'terms-of-use'}
        path={'/terms-of-use'}
        exact
        render={() => (
          <Transition>
            <TermsOfUsePage />
          </Transition>
        )}
      />

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

      {/* DATABOOKS */}
      <Route
        key={'databooks'}
        path={'/databooks'}
        exact
        render={props => (
          <Transition tKey={'databooks'}>
            <DatabooksPage {...props} />
          </Transition>
        )}
      />

      {/* USERS */}
      <Route
        key={'users'}
        path={'/users'}
        exact
        render={props => (
          <Transition tKey={'users'}>
            <UsersPage {...props} />
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

      {/* DATABOOK */}
      <Route
        key={'databook2'}
        path={'/databooks2/:id'}
        exact
        render={props => (
          <Transition tKey={'databook2'}>
            <Databook2Page id={props.match.params.id} {...props} />
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
