import { useState, createContext } from 'react'
import WithFetch from '../../hooks/with-fetch'
import { CATALOGUE_API_ADDRESS } from '../../config'

export const context = createContext()

export default ({ children, databook, schema }) => {
  const tableId = Object.keys(databook.doc.tables)[0] // TODO should come from the sql schema query

  const [sql, setSql] = useState(`with cte as (
  select *
  from "${tableId}"
)

select * from cte limit 20`)

  return (
    <WithFetch
      uri={`${CATALOGUE_API_ADDRESS}/execute-sql`}
      method="POST"
      headers={{
        'Content-type': 'application/json',
      }}
      body={{
        databookId: databook.doc._id,
        sql,
      }}
    >
      {({ error, loading, data }) => {
        console.log(data)

        return (
          <context.Provider
            value={{
              sql,
              setSql,
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
