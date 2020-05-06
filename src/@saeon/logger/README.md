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

#### Extend / configure the console object
```js
import {configure} from '@saeon/logger'
// or
const configure = require('@saeon/logger').configure

/**
 * Call the configure function with a callback that exposes the global.console object
 * and the current date-fns formatter  
 * 
 * Your callback needs to return an object with this signature
 * {
 *   overwrites: {
 *     ... the console.* properties/fns you would like to overwrite
 *   },
 *   timestampFormat: ... date-fns format string (or null)
 * }
 */
configure(({console, timestampFormat}) => {
  return {
    overwrites: {
      log: () => 'hello world'
    },
    formatter: timestampFormat
  }
})

// Now your application will unhelpfully print 'hello world' everytime console.log() is called
```


