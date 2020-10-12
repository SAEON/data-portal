import React, { createContext } from 'react'
import QuickForm from '@saeon/quick-form'
import { getUriState } from '../lib/fns'
import { Loading } from '../components'
import { gql } from '@apollo/client'
import { WithQglQuery } from '../hooks'

export const GlobalContext = createContext()

export default ({ children }) => {
  const { search, text = undefined, originId = undefined } = getUriState()

  return (
    <WithQglQuery
      QUERY={gql`
        query($id: ID!) {
          browserClient {
            findSearchState(id: $id)
          }
        }
      `}
      variables={{ id: search }}
    >
      {({ error, loading, data }) => {
        if (error) {
          // TODO - Get the error context from Apollo link
        }

        const state = data?.browserClient.findSearchState

        return loading ? (
          <Loading />
        ) : (
          <QuickForm
            originId={originId || undefined}
            text={text || state?.text || undefined}
            extent={state?.extent || undefined}
            terms={state?.terms || []}
            ids={state?.ids || []}
            dois={state?.dois || []}
            selectedDois={state?.selectedDois || []}
          >
            {(setGlobal, global) => {
              return (
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
              )
            }}
          </QuickForm>
        )
      }}
    </WithQglQuery>
  )
}
