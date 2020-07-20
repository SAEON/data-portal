import React from 'react'
import { CatalogueResultsView } from '../../components'
import { getStateFromUri } from '../../modules/uri-state'
import { Typography } from '@material-ui/core'

const components = {
  'catalogue-results-view': CatalogueResultsView,
}

export default ({ location }) => {
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
    Object.entries(getStateFromUri(false)).map(([prop, value]) => {
      if (value === 'false') return [prop, false]
      if (value === 'true') return [prop, true]
      return [prop, value]
    })
  )

  return <Component {...props} />
}
