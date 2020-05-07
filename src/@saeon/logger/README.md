# @saeon/logger

A tiny package that adds timestamps to some of the functions on the console object

```js
npm install -s @saeon/logger
```

To use, include in your entry file

```js
import '@saeon/logger' // ESM
require('@saeon/logger') // commonjs (default Node.js format)
```

### Extend / configure the console object
To unhelpfully print 'hello world' everytime console.log() is called:

```js
import { configure } from '@saeon/logger'
// or
const configure = require('@saeon/logger').configure

/**
 * Call the configure function with a callback that exposes the
 * global.console object and the current date-fns formatter
 *
 * Your callback needs to return an object with this signature
 * {
 *   overwrites: {
 *     ... the console.* properties/fns you would like to overwrite
 *   },
 *   timestampFormat: ... date-fns format string (or null)
 * }
 */
configure(({ console, timestampFormat }) => {
  return {
    overwrites: {
      log: () => console.log('hello world'),
    },
    formatter: timestampFormat,
  }
})
```

### Log to a webserver
Another potential use of this library is to extend the console object to log to a URL endpoint. Below is an example that will log `console.logToServer(...)` events via HTTP, batched at a maximum rate of every 10 seconds

```js
/**
 * Inspired by the dataloader library
 * https://www.npmjs.com/package/dataloader
 */
export default class DataLoader {
  constructor(_batchLoadingFn) {
    this._timer
    this._keys = []
    this._batchLoadingFn = _batchLoadingFn
    this._batchingInterval = 10 * 1000
  }

  load(key) {
    clearTimeout(this._timer)
    const promisedValue = new Promise((resolve) => this._keys.push({ key, resolve }))
    this._timer = setTimeout(() => {
      this._batchLoadingFn(this._keys.map((k) => k.key)).then((values) => {
        this._keys.forEach(({ resolve }, i) => {
          resolve(values[i])
        })
        this._keys = []
      })
    }, this._batchingInterval)
    return promisedValue
  }
}

const uri = "https://your API address here.co.za/log"

configure(() => ({
  overwrites: {
    logToServer: (uri, client = fetch) => {
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
    },
  },
}))

```

And now you have the following console.* methods available in your browser or in your webserver
```js
console.log(msg)
console.info(msg)
console.logToServer(msg)
```