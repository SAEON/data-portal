import { createContext } from 'react'

export const context = createContext()

export default ({ children, value }) => (
  <context.Provider value={value}>{children}</context.Provider>
)
