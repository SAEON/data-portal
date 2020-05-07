import DataLoader from '../data-loader'

export const logToServer = (uri) => {
  const logBatch = (msgs) =>
    new Promise((resolve, reject) => {
      fetch(uri, {
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
