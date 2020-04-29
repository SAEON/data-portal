import React from 'react'
import { DragMenu } from '@saeon/snap-menus'
import ResultsList from './_results-list'
import { Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

// TODO - onClose ?
// eslint-disable-next-line no-unused-vars
export default ({ id, onClose, data }) => {
  return (
    <DragMenu
      id={id}
      defaultPosition={{ x: 650, y: 25 }}
      defaultWidth={500}
      title={'Search results'}
      fullscreen={isMobile}
    >
      {({ height, width }) =>
        data && data.hits.total ? (
          <ResultsList height={height} width={width} data={data} />
        ) : (
          <Typography>No results...</Typography>
        )
      }
    </DragMenu>
  )
}
