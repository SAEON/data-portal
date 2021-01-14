import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import DashboardContextProvider from './context'
import { gql } from '@apollo/client'
import { AppBar, Grid, Toolbar } from '@material-ui/core'
import Layout from './layout'
import Filters from './filters/_filters'
import useStyles from './style'
import clsx from 'clsx'

const POLLING_INTERVAL = 500
export default ({ id }) => {
  const classes = useStyles()
  const { poll } = getUriState()
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/dashboard?id=${id}`,
    params: false,
  })

  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          dashboard(id: $id) {
            id
            layout
            filters {
              id
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data, startPolling }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }

        if (poll) {
          startPolling(POLLING_INTERVAL)
        }

        const { layout, filters } = data.dashboard
        const filterIds = filters.map(({ id }) => id)

        const MenuProps = {
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }
        return (
          <Grid container justify="center">
            <DashboardContextProvider filterIds={filterIds}>
              <Grid item xs={12}>
                <AppBar
                  style={window.location.pathname.includes('/render') ? {} : { marginTop: 48 }}
                  variant="elevation"
                >
                  <Toolbar variant="dense">
                    1<Filters filterIds={filterIds} />2
                  </Toolbar>
                </AppBar>
              </Grid>
              <Grid item xs={12} style={{ margin: '36px 0' }} />
              <Grid justify="space-evenly" container item xs={12} sm={10} md={8}>
                <Grid item xs={12}>
                  <div className={clsx(classes.layout)}>
                    <Toolbar variant="dense">
                      {/* Filters go here */}
                      <Filters filterIds={filterIds} />
                    </Toolbar>
                  </div>
                </Grid>
                <div style={{ position: 'relative', width: '100%' }}>
                  <Layout items={layout} />
                </div>
              </Grid>
              <Grid item xs={12} style={{ margin: '16px 0' }} />
              <Grid item xs={12}>
                <Footer />
              </Grid>
            </DashboardContextProvider>
          </Grid>
        )
      }}
    </WithGqlQuery>
  )
}
