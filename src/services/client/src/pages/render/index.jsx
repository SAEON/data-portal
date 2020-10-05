import React from 'react'
import { Records, Record, Atlas, Home, RecordsPage } from '../../components'
import { getUriState } from '../../lib/fns'
import { Typography } from '@material-ui/core'

const components = {
  '': Home,
  home: Home,
  records: Records,
  record: Record,
  atlas: Atlas,
  recordspage: RecordsPage,
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
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Component {...props} />
    </div>
  )
}
