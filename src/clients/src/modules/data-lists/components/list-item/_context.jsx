import { createContext } from 'react'

export const context = createContext()

export default ({ children, update, ...fields }) => {
  return <context.Provider value={{ update, ...fields }}>{children}</context.Provider>
}
