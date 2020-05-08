import DataLoader from './_data-loader'
import { gql, execute, toPromise } from '@apollo/client'

export default ({ link, query }) => {
  const logBatch = (browserEvents) =>
    new Promise((resolve, reject) => {
      toPromise(
        execute(link, {
          query,
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
