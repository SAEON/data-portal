import { createContext, useState, useCallback } from 'react'

export const context = createContext()

export default ({ children, schemaJson, row, onRowChange, column: { key } }) => {
  const [activeEditor, setActiveEditor] = useState('form')

  const updateMetadata = useCallback(
    metadata =>
      onRowChange({
        ...row,
        metadata: typeof metadata === 'string' ? JSON.parse(metadata) : metadata,
      }),
    [onRowChange, row]
  )

  return (
    <context.Provider
      value={{
        schemaJson,
        metadata: row[key],
        errors: row.errors,
        setActiveEditor,
        activeEditor,
        updateMetadata,
      }}
    >
      {children}
    </context.Provider>
  )
}
