import { useState, createContext } from 'react'

export const context = createContext()

export default ({ children, databook, schema }) => {
  const tableId = Object.keys(databook.doc.tables)[0] // TODO should come from the sql schema query
  const [sql, setSql] = useState(`with cte as (
  select *
  from "${tableId}"
)

select * from cte limit 20`)
  const filters = []
  return (
    <context.Provider
      value={{
        sql,
        setSql,
        databook,
        filters,
        schema,
      }}
    >
      {children}
    </context.Provider>
  )
}
