# UI Testing
UI testing in this case will amount to mounting a single component or page at a time, and making sure that it renders and functions correctly

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TODO

```jsx
import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import getUriState from '../../lib/fns/get-uri-state'
import { Redirect } from 'react-router-dom'

const components = {
  'compact-record': lazy(() => import('../compact-record')),
}

export default ({ location: { pathname } }) => {
  const Component = components[pathname.replace('/render', '').replace(/.*\//, '')]

  if (!Component) {
    throw new Error(`Unable to find component`)
  }

  return (
    <Suspense fallback={<Loading />}>
      <Component
        {...Object.fromEntries(
          Object.entries(getUriState()).map(([prop, value]) => {
            if (value === 'false') return [prop, false]
            if (value === 'true') return [prop, true]
            return [prop, value]
          })
        )}
      />
    </Suspense>
  )
}
```