import React, { createContext, useEffect, useState } from 'react'
import QuickForm from '@saeon/quick-form'
import { getUriState } from '../../lib/fns'
import { Loading } from '../../components'
import { useQuery, gql } from '@apollo/client'

export const GlobalContext = createContext()

const GlobaProvider = ({ children, ...props }) => {
  return (
    <QuickForm
      textSort={props.textSort || undefined}
      layersearch={undefined}
      layers={[]}
      text={props.text || undefined}
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

export default props => {
  const { search } = getUriState()
  const { error, loading, data } = useQuery(
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

  if (error) {
    console.warn(
      'Error loading initial app state. This is most probably because no initial app state was specified',
      error
    )
  }

  return loading ? (
    <Loading />
  ) : (
    <GlobaProvider {...props} {...data?.browserClient.findSearchState} />
  )
}
