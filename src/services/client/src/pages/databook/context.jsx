import { useState, createContext } from 'react'

export const context = createContext()

export default ({ children, databook, schema }) => {
  const tableId = schema.tables[0].id
  const [sql, setSql] = useState(`select *
from "${tableId}"
limit 50`)

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
