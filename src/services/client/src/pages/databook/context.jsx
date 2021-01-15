import { useState, createContext } from 'react'
import WithFetch from '../../hooks/with-fetch'
import { CATALOGUE_API_ADDRESS } from '../../config'

export const context = createContext()

export default ({ children, databook, schema }) => {
  // TODO tableId should come from the sql schema query
  const [postGisClient, setPostGisClient] = useState({
    query: `with cte as (
  select *
  from "${Object.keys(databook.doc.tables)[0]}"
)

select * from cte limit 20`,
    c: 0,
  })

  const queryPostGis = sql => {
    setPostGisClient({
      query: sql,
      c: postGisClient.c++,
    })
  }

  const abortController = new AbortController()

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
