import { createContext, useState, useCallback } from 'react'

export const context = createContext()

export default ({ children, schemaJson, row, onRowChange, column: { key } }) => {
  const [activeEditor, setActiveEditor] = useState('form')

  const updateMetadata = useCallback(
    json => onRowChange({ ...row, metadata: JSON.parse(json) }),
    [onRowChange, row]
  )

  return (
    <context.Provider
      value={{ schemaJson, json: row[key], setActiveEditor, activeEditor, updateMetadata }}
    >
      {children}
    </context.Provider>
  )
}
