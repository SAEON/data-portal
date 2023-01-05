import { createContext } from 'react'
import getUriState from '../../lib/fns/get-uri-state'

export const context = createContext()

/**
 * From URL query:
 * "referrer" is for tracking page source
 *
 * NOTE
 * referrer will be set once per app load,
 * navigating to other routes will NOT reset
 * referrer since this component will only be
 * rendered once!!
 */
export default ({ children }) => {
  const { referrer = undefined } = getUriState()

  return <context.Provider value={{ referrer }}>{children}</context.Provider>
}
