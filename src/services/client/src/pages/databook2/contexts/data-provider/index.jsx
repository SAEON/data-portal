import { createContext, useState } from 'react'

export const context = createContext()

export default ({ children }) => {
  const exeSqlQuery = sql => alert('hi')

  return <context.Provider value={{ exeSqlQuery, loading: false }}>{children}</context.Provider>
}
