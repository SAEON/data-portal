import { createContext } from 'react'
import QuickForm from '../../packages/quick-form'
import getUriState from '../../lib/fns/get-uri-state'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/loading'

export const context = createContext()

/**
 * From URL query:
 * "search" indicates the ID of a saved search
 * "text" is the text value of search input
 *
 * NOTE
 *
 * Updating the global state actually results in
 * the QuickForm component rerendering. Might
 * have been better to split the component into
 * a parent and child, but works as expected.
 */
export default ({ children }) => {
  const { search, text = undefined } = getUriState()

  const { error, loading, data } = useQuery(
    gql`
      query ($id: ID) {
        list(id: $id) {
          id
          filter
          title
          description
          referrer
          url
          createdBy
          disableSidebar
          showSearchBar
          type
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      variables: {
        id: search,
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw new Error('Unable to load saved search.' + error.message)
  }

  return (
    <QuickForm
      filter={data.list?.filter || {}}
      text={text || ''}
      extent={undefined}
      terms={[]}
      ids={[]}
      dois={[]}
      selectedIds={[]}
    >
      {(setGlobal, global) => (
        <context.Provider
          value={{
            global,
            setGlobal: (obj, clearHistory = false, cb) => {
              setGlobal(
                Object.assign(
                  clearHistory
                    ? {
                        layers: [],
                        text: '',
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
      )}
    </QuickForm>
  )
}
