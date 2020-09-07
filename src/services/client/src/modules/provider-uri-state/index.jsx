import React, { createContext } from 'react'
import QuickForm from '@saeon/quick-form'

export const GlobalContext = createContext()

export default ({ children }) => {
  return (
    <QuickForm terms={[]}>
      {(setGlobal, { ...global }) => (
        <GlobalContext.Provider
          value={{
            global,
            setGlobal,
          }}
        >
          {children}
        </GlobalContext.Provider>
      )}
    </QuickForm>
  )
}
