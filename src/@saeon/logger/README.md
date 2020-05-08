# @saeon/logger

A tiny package that adds timestamps to some of the functions on the console object. Please note that this is still in development. The library should work as expected but the build process isn't finalized yet and as such the bundle is still larger than necessary.

### Installation

```sh
npm install -s @saeon/logger
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

To unhelpfully print 'hello world' everytime console.log() is called:

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
      log: () => console.log('hello world'),
    },
    formatter: timestampFormat,
  }
})
```

### Log to a webserver

Another potential use of this library is to extend the console object to log to a URL endpoint - there is built-in support for logging to HTTP endpoints as well as GraphQL endpoints (using the @apollo/client library)

#### Configuring HTTP logging

```js
import logToHttp from '@saeon/logger/log-to-http'
const httpUri = 'https://your API address here.co.za/log'

configureLogger(() => ({
  overwrites: {
    logToHttp: logToHttp(httpUri),
  },
}))
```

### Configuring GraphQL logging

Refer to the ApolloClient documentation. Currently a client is required as an argument to use the GraphQL logging function. Please submit an issue if you would like to use only an Apollo link object.

```js
import logToGraphQL from '@saeon/logger/log-to-graphql'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'your graphql endpoint' }),
})

configureLogger(() => ({
  overwrites: {
    logToGraphQL: logToGraphQL(client),
  },
}))
```

### Or both HTTP, GraphQL, with formatter specified and overwriting the console.error function

```js
configure(({ console, timestampFormat }) => {
  return {
    overwrites: {
      error: () => console.log('hello world'),
      logToGraphQL: logToGraphQL(client), // see above
      logToHttp: logToHttp(httpUri),
    },
    formatter: 'MM/DD/YYYY', // https://date-fns.org/v2.13.0/docs/format
  }
})
```

And now you have the following console.\* methods available in your browser or in your webserver

```js
console.log(msg)
console.info(msg)
console.error() // always prints 'hello world'
console.logToHttp(msg)
console.logToGraphQL(msg)
```

### Batching network requests

Both the `console.logToHttp` and `console.logToGraphQL` functions batch requests - the maximum rate at which servers are sent information is once per 5 second interval. This makes these functions suitable for logging even very many requests to the server.

This is an example of logging batches of mouse move events every 5 seconds (but note that debouncing the mousemove event is still recommended):

```js
const debounce = (cb, duration = 0) => {
  var timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => cb(...args), duration)
  }
}

document.getElementsByTagName('body')[0].onmousemove = debounce(({ x, y }) =>
  console.logToHttp({ x, y, etc })
)
```
