import React, { createContext } from 'react'
import QuickForm from '@saeon/quick-form'

export const GlobalContext = createContext()

export default ({ children }) => {
  return (
    <QuickForm
      textSort={undefined}
      layersearch={undefined}
      layers={[]}
      text={undefined}
      extent={undefined}
      terms={[]}
    >
      {(setGlobal, global) => (
        <GlobalContext.Provider
          value={{
            global,
            setGlobal: (obj, clearHistory = false, cb) => {
              setGlobal(
                Object.assign(
                  clearHistory
                    ? {
                        layers: [],
                        text: undefined,
                        extent: undefined,
                        terms: [],
                      }
                    : {},
                  obj
                )
              )
              if (cb) cb()
            },
          }}
        >
          {children}
        </GlobalContext.Provider>
      )}
    </QuickForm>
  )
}
