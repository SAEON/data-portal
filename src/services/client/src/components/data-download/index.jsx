import React from 'react'
import { Tooltip, Button } from '@material-ui/core'
import { GetApp as GetAppIcon } from '@material-ui/icons'
import SimpleLink from '../link'

export default ({ immutableResource, children, ...props }) => {
  return (
    <SimpleLink style={{ display: 'block' }} uri={immutableResource.resourceURL}>
      <Tooltip
        title={`${immutableResource.resourceDescription} (${immutableResource.resourceURL.replace(
          /.*\./,
          ''
        )})`}
      >
        <Button {...props} startIcon={<GetAppIcon />}>
          {children}
        </Button>
      </Tooltip>
    </SimpleLink>
  )
}
