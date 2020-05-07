import DataLoader from '../data-loader'
import { gql, execute, toPromise } from '@apollo/client'

export const logToGraphQL = ({ link }) => {
  const logBatch = (browserEvents) =>
    new Promise((resolve, reject) => {
      toPromise(
        execute(link, {
          query: gql`
            mutation logBrowserEvents($input: [BrowserEventInput]!) {
              logBrowserEvents(input: $input)
            }
          `,
          variables: {
            input: browserEvents,
          },
        })
      )
        .then((json) => resolve(json))
        .catch((error) => reject(error))
    })

  const loader = new DataLoader(logBatch)
  return (browserEvent) => loader.load(browserEvent)
}

export const logToHttp = (uri, client = fetch) => {
  const logBatch = (msgs) =>
    new Promise((resolve, reject) => {
      client(uri, {
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(msgs),
      })
        .then((res) => res.text())
        .then((json) => resolve(json))
        .catch((error) => reject(error))
    })

  const loader = new DataLoader(logBatch)
  return (msg) => loader.load(msg)
}
