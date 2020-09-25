# @saeon/logger

A tiny package that adds timestamps to the `info`, `log`, `warn`, and `error` functions on `globalThis.console`, and allows for extending `console` with bespoke functions. Functions for logging to a service via HTTP or GraphQL are included in the package with examples below. The signature of the original object is preserved (unless extended obviously).

### Installation

```sh
npm install -s @saeon/logger date-fns @apollo/client
```

### Basic usage

```js
import '@saeon/logger'

// All console logging functions now have a timestamp
console.log(msg)
console.info(msg)
console.warn(msg)
console.error(msg)
```

### Extend / configure the console object

To unhelpfully print 'hello world' every time console.log() is called:

```js
import { configure } from '@saeon/logger'

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
      // But note that console.log then won't have a timestamp, since you are overwriting the overwritten console.log function
      log: () => console.log('hello world'),
    },
    formatter: timestampFormat,
  }
})
```

### Log to a webserver

Another potential use of this library is to extend the console object to log to a URL endpoint - there is built-in support for logging to HTTP endpoints as well as GraphQL endpoints (using the @apollo/client library)

#### Configure HTTP logging

```js
import { logToHttp } from '@saeon/logger/log-to-http'
const httpUri = 'https://your API address here.co.za/log'
const batchingInterval = 2000

configure(() => ({
  overwrites: {
    http: logToHttp(httpUri, batchingInterval),
  },
}))
```

#### Configure GraphQL logging

Refer to the ApolloClient documentation on how to configure a GraphQL `link`

```js
import { logToGql } from '@saeon/logger/log-to-graphql'
import gql from 'graphql-tag'

const link = new HttpLink({ uri: 'your graphql endpoint' })
const batchingInterval = 1800 // 1800 ms = 1.8 secs batching interval

configure(() => ({
  overwrites: {
    gql: logToGql({
      link,
      query: gql`
        mutation logBrowserEvents($input: [BrowserEventInput]!) {
          logBrowserEvents(input: $input)
        }
      `,
    }, batchingInterval),
  },
}))
```

### Or both HTTP, GraphQL, with formatter specified and overwriting the console.error function

```js
configure(({ console }) => {
  return {
    overwrites: {
      error: () => console.log('hello world'),
      gql: logToGql({ link, query }, 2500), // see above
      http: logToHttp(httpUri, 1500), // see above
    },
    formatter: 'yyyy-MM-dd', // https://date-fns.org
  }
})
```

And now you have the following console.\* methods available in your browser or in your webserver

```js
console.log(msg)
console.info(msg)
console.error() // always prints 'hello world'
console.http(msg)
console.gql(msg)
```

### Batching network requests

Both the `console.http` and `console.gql` functions batch requests - the maximum rate at which servers are sent information is once per 5 second interval. This makes these functions suitable for logging even very many requests to the server.

This is an example of logging batches of `mousemove` events every 2 seconds (the default batching interval). Debouncing events that are fired often is good practice:

```js
const debounce = (cb, duration = 0) => {
  var timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => cb(...args), duration)
  }
}

document.getElementsByTagName('body')[0].onmousemove = debounce(({ x, y }) =>
  console.http({ x, y, etc })
)
```
