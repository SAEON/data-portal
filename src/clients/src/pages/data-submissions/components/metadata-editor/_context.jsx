import { createContext, useState } from 'react'

export const context = createContext()

export default ({ children, row, onRowChange, json }) => {
  const [view, setView] = useState('form')

  const updateMetadata = json => onRowChange({ ...row, metadata: JSON.parse(json) })

  return (
    <context.Provider value={{ json, setView, view, updateMetadata }}>{children}</context.Provider>
  )
}
