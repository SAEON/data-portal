import { createContext } from 'react'
import QuickForm from '@saeon/quick-form'
import getUriState from '../../lib/fns/get-uri-state'
import FromSavedSearch from './from-saved-search'

export const context = createContext()

export default ({ children }) => {
  /**
   * search => a uri param that indicates the ID of a saved search
   */
  const { search, text = undefined, referrer = undefined } = getUriState()

  return (
    <FromSavedSearch id={search}>
      {search => (
        <QuickForm
          referrer={referrer || undefined}
          text={text || search?.text || undefined}
          extent={search?.extent || undefined}
          terms={search?.terms || []}
          ids={search?.ids || []}
          dois={search?.dois || []}
          selectedIds={search?.selectedIds || []}
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
