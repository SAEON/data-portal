import { gql, useApolloClient } from '@apollo/client'
import logger from '@saeon/logger'
import logToGql from '@saeon/logger/logToGql'

export { default as RegisterEventLog } from './_register-event-log'
export { default as makeLog } from './_make-log'
export { default as LogAppRender } from './_app-render'

const { configure: configureLogger } = logger

export default ({ children }) => {
  const { link } = useApolloClient()

  configureLogger(() => ({
    overwrites: {
      gql: logToGql({
        link,
        query: gql`
          mutation logBrowserEvents($input: [BrowserEventInput]!) {
            logBrowserEvents(input: $input)
          }
        `,
      }),
    },
  }))

  return children
}
