import React from 'react'
import { Records } from '../../components'
import { getUriState } from '../../lib/fns'
import { Typography } from '@material-ui/core'
import Home from '../home'
import Atlas from '../atlas'
import Record from '../record'

const components = {
  '': Home,
  home: Home,
  records: Records,
  record: Record,
  atlas: Atlas,
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

  return <Component {...props} />
}
