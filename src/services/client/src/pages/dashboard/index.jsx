import { useState } from 'react'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import DashboardContextProvider from './context'
import { gql } from '@apollo/client'
import { AppBar, Grid, Toolbar } from '@material-ui/core'
import Layout from './layout'
import Filters from './layout/filters/_filters'
import useStyles from './style'
import clsx from 'clsx'

const POLLING_INTERVAL = 500
//STEVEN TO-DO: Accidentally removed charts from dashboard. To recover previous version which had charts
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

        const { layout } = data.dashboard
        console.log('.../dashboard layout', layout)
        const filterIds = layout
          .filter(entry => entry.content.type === 'Filter')
          .map(entry => {
            return entry.content.id
          })

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
                      {/*** */}
                      {/* Filters go here */}
                      {/* 0.5.2 Probably shouldn't have actually added selectedValues to graphql. I dont think this will be functional for multiple users.
                            selectedValues should be an arg passed to the filterCharts query instead. therefore also delete mutatoinupdateFilter(or flesh out for future use of editing old filters) */}
                      {/* TO-DO 2: change charts query(wherever it is) to use filteredCharts instead.
                                Somehow need to pass filters selectedValues(maybe a common parent/ancestor with state) */}
                      {/* TO-DO 3: Flesh out visuals of filter(perhaps a checkbox dropdown list instead of chips) */}

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
