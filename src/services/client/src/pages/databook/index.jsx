import DatabooksContext from '../../contexts/databooks'
import { gql } from '@apollo/client'
import WithGqlQuery from '../../hooks/_with-gql-query'
import Loading from '../../components/loading'
import PostgisDataExplorer from './postgis'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

const POLLING_INTERVAL = 1000

/**
 * Get the Mongo doc describing the databook
 * Keep polling until all the tables are ready
 */
export default ({ id }) => (
  <WithGqlQuery
    QUERY={gql`
      query($id: ID!) {
        browserClient {
          databook(id: $id) {
            id
            doc
          }
        }
      }
    `}
    variables={{ id }}
  >
    {({ error, loading, data, startPolling, stopPolling }) => {
      if (error) {
        throw new Error(`Error loading databook ${id}. ${error}`)
      }

      if (loading) {
        return <Loading />
      }

      const { doc: databook } = data.browserClient.databook
      const { tables } = databook

      let tablesReady = 0
      let tablesNotReady = 0
      Object.entries(tables).forEach(([, { ready }]) => {
        if (ready) {
          tablesReady += 1
        } else {
          tablesNotReady += 1
        }
      })

      const ready = tablesNotReady > 0 ? false : true

      if (ready) {
        stopPolling()
      } else {
        startPolling(POLLING_INTERVAL)
      }

      return ready ? (
        <DatabooksContext.Provider value={{ test: 'somevalue', sql: '', someStateValue: true }}>
          <PostgisDataExplorer databook={data.browserClient.databook} />
        </DatabooksContext.Provider>
      ) : (
        <div>
          <Loading />
          <Grid container justify="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined" style={{ marginTop: 16 }}>
                <CardContent style={{ justifyContent: 'center', display: 'flex' }}>
                  <Typography variant="overline" style={{ display: 'flex', alignSelf: 'center' }}>
                    {`Loaded ${tablesReady} of ${
                      Object.entries(tables).length
                    } tables. Please wait...`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )
    }}
  </WithGqlQuery>
)
