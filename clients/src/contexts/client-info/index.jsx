import { createContext } from 'react'
import WithFetch from './with-fetch'
import Loading from '../../components/loading'
import { PUBLIC_HTTP_ADDRESS } from '../../config'

export const context = createContext()

export default ({ children }) => {
  return (
    <WithFetch uri={`${PUBLIC_HTTP_ADDRESS}/client-info`}>
      {({ error, loading, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          const msg = `Unable to reach server

This error usually occurs because we are updating our catalogue software. Please wait a few minutes and then refresh the page`
          console.error(msg, error)
          throw new Error(msg)
        }

        return (
          <context.Provider
            value={{
              ...data,
            }}
          >
            {children}
          </context.Provider>
        )
      }}
    </WithFetch>
  )
}
