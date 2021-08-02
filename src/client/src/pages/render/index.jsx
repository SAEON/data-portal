import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import getUriState from '../../lib/fns/get-uri-state'
import { Redirect } from 'react-router-dom'

const components = {
  'compact-record': lazy(() => import('../compact-record')),
}

/**
 * This page really should redirect to /,
 * however there is a bit of a hack where
 * some WordPress sites are rendering components
 * via iFrame. So until this is fixed, this route
 * needs to accommodate the 'compact-record' hack
 */
export default ({ location: { pathname } }) => {
  const Component = components[pathname.replace('/render', '').replace(/.*\//, '')]
  if (Component) {
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

  return <Redirect to={pathname.replace('/render', '')} />
}
