import { useEffect } from 'react'
import { gql, useApolloClient } from '@apollo/client'
import logger from '@saeon/logger'
import DefaultEventLogs from './_default-event-logs'
const { configure: configureLogger, logToGql } = logger

export default ({ children }) => {
  const { link } = useApolloClient()

  useEffect(() => {
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
  })

  return <DefaultEventLogs>{children}</DefaultEventLogs>
}
