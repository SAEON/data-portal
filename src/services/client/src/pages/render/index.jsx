import { lazy, Suspense } from 'react'
import Loading from '../../components/loading'
import { getUriState } from '../../lib/fns'
import { Typography } from '@material-ui/core'

const components = {
  '': lazy(() => import('../home')),
  home: lazy(() => import('../home')),
  records: lazy(() => import('../records')),
  record: lazy(() => import('../record')),
  atlas: lazy(() => import('../atlas')),
  databook: lazy(() => import('../databook')),
  chart: lazy(() => import('../chart')),
  'compact-record': lazy(() => import('../compact-record')),
}

export default ({ location }) => {
  const { pathname } = location
  const uriSearchParams = getUriState()

  /**
   * First get the name of the component. This
   * is the last part of the page's URI path
   */
  const componentName = pathname.replace('/render', '').replace(/.*\//, '')
  const Component = components[componentName]

  /**
   * If no component is found, say so
   */
  if (!Component) {
    return (
      <Typography style={{ margin: 10, display: 'block' }} variant="overline">
        Component {componentName} not found!
      </Typography>
    )
  }

  /**
   * Component props can be specified via URI parameters
   */
  const props = Object.fromEntries(
    Object.entries(uriSearchParams).map(([prop, value]) => {
      if (value === 'false') return [prop, false]
      if (value === 'true') return [prop, true]
      return [prop, value]
    })
  )

  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  )
}
