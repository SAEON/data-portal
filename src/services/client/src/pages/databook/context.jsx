import { useState, createContext } from 'react'

export const context = createContext()

export default ({ children, databook, schema }) => {
  const tableId = Object.keys(databook.doc.tables)[0] // TODO should come from the sql schema query
  const [sql, setSql] = useState(`select *
from "${tableId}"
limit 20`)

  return (
    <context.Provider
      value={{
        sql,
        setSql,
        databook,
        schema,
      }}
    >
      {children}
    </context.Provider>
  )
}
