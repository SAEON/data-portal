import { createContext, useState, useContext } from 'react'
import fetchFn from './fetch.js'
import { context as databookContext } from '../databook-provider'

export const context = createContext()

/**
 * There can only ever be one active query,
 * so caching abortController at the app-level
 * should be fine
 */
let abortController

export default ({ children }) => {
  const { id: databookId } = useContext(databookContext)
  const [state, setState] = useState({
    error: false,
    loading: false,
    data: undefined,
    sql: undefined,
  })

  const exeSqlQuery = async sql => {
    abortController = new AbortController()
    setState(Object.assign({ ...state }, { loading: true, sql }))
    await fetchFn({
      databookId,
      sql,
      signal: abortController.signal,
      setState,
      state,
    })
      .then(text => {
        if (text.substring(0, 5) === 'ERROR') {
          setState(
            Object.assign(
              { ...state },
              {
                error: new Error(text.substring(5, text.length - 5)),
                loading: false,
                data: undefined,
              }
            )
          )
        } else {
          setState(
            Object.assign({ ...state }, { error: false, loading: false, data: JSON.parse(text) })
          )
        }
      })
      .catch(error =>
        setState(
          Object.assign({ ...state }, { error, data: undefined, loading: false, sql: undefined })
        )
      )
  }

  const cancelSqlQuery = () => {
    if (abortController) {
      abortController.abort()
    }
    setState(Object.assign({ ...state }, { loading: false, sql: undefined }))
  }

  return (
    <context.Provider value={{ exeSqlQuery, cancelSqlQuery, ...state }}>
      {children}
    </context.Provider>
  )
}
