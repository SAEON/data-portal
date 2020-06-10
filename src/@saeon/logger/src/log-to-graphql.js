import DataLoader from './_data-loader'
import { execute, toPromise } from '@apollo/client'

const createArrayFromLength = (l) => {
  const arr = []
  for (let i = 0; i < l; i++) {
    arr.push(false)
  }
  return arr
}

export default ({ link, query }, interval) => {
  const logBatch = (browserEvents) =>
    new Promise((resolve) => {
      toPromise(
        execute(link, {
          query,
          variables: {
            input: browserEvents,
          },
        })
      )
        .then((json) => resolve(json))
        .catch((error) => {
          console.error('logToGraphQL failed', error)
          resolve(createArrayFromLength(browserEvents.length))
        })
    })

  const loader = new DataLoader(logBatch, interval)
  return (browserEvent) => loader.load(browserEvent)
}
