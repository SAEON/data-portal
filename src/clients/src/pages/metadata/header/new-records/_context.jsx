import { createContext, useRef } from 'react'

export const context = createContext()

export default ({ children }) => {
  const formRef = useRef({})
  return <context.Provider value={{ formRef }}>{children}</context.Provider>
}
