import { useState, createContext } from 'react'

export const context = createContext()

export default ({ children, databook }) => {
  const [sql, setSql] = useState('select * from odp_925377aa_6914_41e8_8b92_f448ebe11f9c limit 10')

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
