import React, { createContext } from 'react'
import QuickForm from '@saeon/quick-form'
import { gql, useMutation } from '@apollo/client'

export const GlobalContext = createContext()

export default ({ children }) => {
  const [persistSearchState] = useMutation(gql`
    mutation($state: JSON!) {
      browserClient {
        persistSearchState(state: $state)
      }
    }
  `)

  const saveGlobalState = state => {
    return persistSearchState({ variables: { state } }).then(
      ({ data }) => data.browserClient.persistSearchState
    )
  }

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
            saveGlobalState: () => saveGlobalState({}),
          }}
        >
          {children}
        </GlobalContext.Provider>
      )}
    </QuickForm>
  )
}
