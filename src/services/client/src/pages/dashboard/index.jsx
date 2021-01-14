import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import WithGqlQuery from '../../hooks/with-gql-query'
import { setShareLink } from '../../hooks/use-share-link'
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
              name
              columnFiltered
              values
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
        const filterIds = filters.map(({ id }) => id) //STEVEN: probably best to refactor this further by just passing filters not filterIds to avoid multiple filters{} requests

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
            <Grid item xs={12}>
              <AppBar
                style={window.location.pathname.includes('/render') ? {} : { marginTop: 48 }}
                variant="elevation"
              >
                <Toolbar variant="dense">This is the page toolbar</Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12} style={{ margin: '36px 0' }} />
            <Grid justify="space-evenly" container item xs={12} sm={10} md={8}>
              <DashboardContextProvider filterIds={filterIds}>
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
              </DashboardContextProvider>
            </Grid>
            <Grid item xs={12} style={{ margin: '16px 0' }} />
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        )
      }}
    </WithGqlQuery>
  )
}
