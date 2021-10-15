import { createContext, useState, useCallback } from 'react'

export const context = createContext()

export default ({ children, row, onRowChange, column: { key } }) => {
  const [view, setView] = useState('form')

  const updateMetadata = useCallback(
    json => onRowChange({ ...row, metadata: JSON.parse(json) }),
    [onRowChange, row]
  )

  return (
    <context.Provider value={{ json: row[key], setView, view, updateMetadata }}>
      {children}
    </context.Provider>
  )
}
