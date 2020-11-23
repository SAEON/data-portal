import { useState, createContext } from 'react'

export const context = createContext()

export default ({ children, databook }) => {
  const [sql, setSql] = useState(`select *
from odp_f6624135_621a_4e67_b491_68bfb5e4914a
limit 40`)

  return (
    <context.Provider
      value={{
        sql,
        setSql,
        databook,
      }}
    >
      {children}
    </context.Provider>
  )
}
