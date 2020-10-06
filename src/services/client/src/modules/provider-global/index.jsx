import React, { createContext } from 'react'
import QuickForm from '@saeon/quick-form'
import { getUriState } from '../../lib/fns'
import { Loading } from '../../components'
import { useQuery, gql } from '@apollo/client'

export const GlobalContext = createContext()

const GlobaProvider = ({ children, ...props }) => {
  return (
    <QuickForm
      /**
       * /records state
       */
      selectedDois={props?.selectedDois || []}
      /**
       * Global search state
       */
      text={props?.text || undefined}
      extent={props?.extent || undefined}
      terms={props?.terms || []}
      ids={props?.ids || []}
      dois={props?.dois || []}
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

export default props => {
  const { search, text = undefined } = getUriState()
  let gqlResponse = {}

  if (search) {
    gqlResponse = useQuery(
      gql`
        query($id: ID!) {
          browserClient {
            findSearchState(id: $id)
          }
        }
      `,
      {
        variables: {
          id: search,
        },
      }
    )
  }
  const { error, loading, data } = gqlResponse
  if (error) {
    console.warn(
      'Error loading initial app state. This is most probably because no initial app state was specified',
      error
    )
  }

  return loading ? (
    <Loading />
  ) : (
    <GlobaProvider text={text} {...props} {...data?.browserClient.findSearchState} />
  )
}
