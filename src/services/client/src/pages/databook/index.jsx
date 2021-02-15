import { useContext } from 'react'
import DatabookContextProvider from './context'
import { gql } from '@apollo/client'
import { setShareLink } from '../../hooks/use-share-link'
import WithGqlQuery from '../../hooks/with-gql-query'
import LoadingDatabook from './loading'
import Loading from '../../components/loading'
import PostgisDataExplorer from './postgis'
import { CATALOGUE_CLIENT_ADDRESS, CATALOGUE_TECHNICAL_CONTACT } from '../../config'
import useStyles from './style'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { context as authContext } from '../../contexts/authentication'

const POLLING_INTERVAL = 1000

export default ({ id }) => {
  useContext(authContext).authenticate()

  const classes = useStyles()
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/databook?id=${id}`,
    params: false,
  })
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          databook(id: $id) {
            id
            doc
            charts {
              id
              title
            }
            filters {
              id
              name
              columnFiltered
              values
              sql
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data, startPolling, stopPolling }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          if (error.message.toUpperCase() === 'FORBIDDEN') {
            return error.message // Otherwise user is flashed an error message before being redirected to login
          } else {
            throw new Error(`Error loading databook ${id}. ${error}`)
          }
        }

        const { doc: databook } = data.databook
        const { tables } = databook

        let tablesReady = 0
        let tablesNotReady = 0
        let errors = []
        Object.entries(tables).forEach(([tableName, { ready, error }]) => {
          if (ready) {
            tablesReady++
          } else {
            if (error) {
              errors.push({ tableName, error })
            } else {
              tablesNotReady++
            }
          }
        })

        const ready = tablesNotReady > 0 ? false : true

        /**
         * Get the Mongo doc describing the databook
         * Keep polling until all the tables are ready
         */
        if (ready) {
          stopPolling()
        } else {
          startPolling(POLLING_INTERVAL)
        }

        return ready ? (
          <div
            className={clsx(
              classes.layout,
              {
                [classes.pushDown]: !window.location.pathname.includes('/render'),
              },
              classes.bg
            )}
          >
            {errors.length ? (
              <Box m={2}>
                <Typography>
                  Error preparing data. Please send the message below to a system administrator (
                  {CATALOGUE_TECHNICAL_CONTACT})
                </Typography>
                <pre>
                  {JSON.stringify(
                    {
                      message: 'Error creating databook',
                      uri: window.location,
                      errors,
                    },
                    null,
                    2
                  )}
                </pre>
              </Box>
            ) : (
              <WithGqlQuery
                QUERY={gql`
                  query($id: ID!) {
                    databook(id: $id) {
                      id
                      schema {
                        id
                        tables {
                          id
                          table_schema
                          odpRecordId
                          description
                          fields {
                            id
                            column_name
                            data_type
                            ordinal_position
                          }
                        }
                      }
                    }
                  }
                `}
                variables={{ id: data.databook.doc._id }}
              >
                {({ error, loading, data: schemaData }) => {
                  if (loading) {
                    return <Loading />
                  }
                  if (error) {
                    throw error
                  }
                  return (
                    <DatabookContextProvider
                      schema={schemaData.databook.schema}
                      databook={data.databook}
                    >
                      <PostgisDataExplorer />
                    </DatabookContextProvider>
                  )
                }}
              </WithGqlQuery>
            )}
          </div>
        ) : (
          <LoadingDatabook tables={tables} tablesReady={tablesReady} />
        )
      }}
    </WithGqlQuery>
  )
}
