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
  })

  const exeSqlQuery = async sql => {
    abortController = new AbortController()
    setState(Object.assign({ ...state }, { loading: true }))
    const res = await fetchFn({ databookId, sql, signal: abortController.signal, setState, state })
  }

  const cancelSqlQuery = () => {
    if (abortController) {
      abortController.abort()
    }
    setState(Object.assign({ ...state }, { loading: false }))
  }

  return (
    <context.Provider value={{ exeSqlQuery, cancelSqlQuery, ...state }}>
      {children}
    </context.Provider>
  )
}
