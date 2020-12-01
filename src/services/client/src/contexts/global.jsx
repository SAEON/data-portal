import { createContext } from 'react'
import QuickForm from '@saeon/quick-form'
import { getUriState } from '../lib/fns'
import Loading from '../components/loading'
import { gql } from '@apollo/client'
import { WithGqlQuery } from '../hooks'

export const context = createContext()

const FromSavedSearch = ({ id, children }) =>
  id ? (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          searchState(id: $id)
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw new Error('Unable to load saved search.' + error.message)
        }

        return children(data?.searchState.state)
      }}
    </WithGqlQuery>
  ) : (
    children()
  )

export default ({ children }) => {
  const { search, text = undefined, referrer = undefined } = getUriState()

  return (
    <FromSavedSearch id={search}>
      {state => (
        <QuickForm
          referrer={referrer || undefined}
          text={text || state?.text || undefined}
          extent={state?.extent || undefined}
          terms={state?.terms || []}
          ids={state?.ids || []}
          dois={state?.dois || []}
          selectedIds={state?.selectedIds || []}
        >
          {(setGlobal, global) => {
            return (
              <context.Provider
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
              </context.Provider>
            )
          }}
        </QuickForm>
      )}
    </FromSavedSearch>
  )
}
