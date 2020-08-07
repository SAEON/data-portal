import React, { useContext } from 'react'
import { Records, Record } from '../../components'
import { Typography } from '@material-ui/core'
import { UriStateContext } from '../../modules/provider-uri-state'

const components = {
  records: Records,
  record: Record,
}

export default ({ location }) => {
  const { getUriState } = useContext(UriStateContext)
  const { pathname } = location

  /**
   * First get the name of the component. This
   * is the last part of the page's URI path
   */
  const componentName = pathname.replace(/.*\//, '')
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
    Object.entries(getUriState(true)).map(([prop, value]) => {
      if (value === 'false') return [prop, false]
      if (value === 'true') return [prop, true]
      return [prop, value]
    })
  )

  return <Component {...props} />
}
