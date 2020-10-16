import { useEffect } from 'react'
import { gql, useApolloClient } from '@apollo/client'
import { configure as configureLogger } from '@saeon/logger'
import { logToGql } from '@saeon/logger/log-to-graphql'
import DefaultEventLogs from './_default-event-logs'

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
