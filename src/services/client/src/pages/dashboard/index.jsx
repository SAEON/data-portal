import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import { gql } from '@apollo/client'
import Chart from './chart'
import { AppBar, Grid, Toolbar } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'

const POLLING_INTERVAL = 500

const components = {
  CHART: Chart,
}

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
              <Grid item xs={12}>
                <div className={clsx(classes.layout)}>
                  <Toolbar variant="dense">Filters go here</Toolbar>
                </div>
              </Grid>
              {[...layout]
                .sort(({ y: aY, x: aX }, { y: bY, x: bX }) => {
                  /**
                   * Items on the same row
                   * Sort by (x)
                   */
                  if (aY == bY) {
                    // Items are on the same level
                    if (bX > aX) return -1
                    if (aX > bX) return 1
                    return 0
                  }

                  /**
                   * Items on different rows
                   * sort by (y)
                   */
                  if (bY > aY) return -1
                  if (aY > bY) return 1
                  return 0
                })
                .map(item => {
                  // eslint-disable-next-line no-unused-vars
                  const { content, x, y, w, h = 1 } = item
                  const { id, type } = content
                  const Component = components[type.toUpperCase().trim()]

                  return (
                    <Grid item xs={12} sm={12} md={w} key={id}>
                      <div className={clsx(classes.layout)} style={{ height: 150 * h }}>
                        <Component id={id} />
                      </div>
                    </Grid>
                  )
                })}
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
