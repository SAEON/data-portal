import { useState, createContext } from 'react'
import WithFetch from './use-fetch'
import { CATALOGUE_API_ADDRESS } from '../../config'

export const context = createContext()

export default ({ children, databook, schema }) => {
  const abortController = new AbortController()
  const [postGisClient, setPostGisClient] = useState({
    query: '',
    c: 0,
  })

  const queryPostGis = sql => {
    setPostGisClient({
      query: sql,
      c: postGisClient.c++,
    })
  }

  return (
    <WithFetch
      uri={`${CATALOGUE_API_ADDRESS}/execute-sql`}
      method="POST"
      signal={abortController.signal}
      headers={{
        'Content-type': 'application/json',
      }}
      body={{
        databookId: databook.doc._id,
        sql: postGisClient.query,
      }}
    >
      {({ error, loading, data }) => {
        return (
          <context.Provider
            value={{
              sql: postGisClient.query,
              setSql: queryPostGis,
              abortQuery: () => {
                abortController.abort()
              },
              databook,
              schema,
              data: {
                rows: data,
              },
              error,
              loading,
            }}
          >
            {children}
          </context.Provider>
        )
      }}
    </WithFetch>
  )
}
