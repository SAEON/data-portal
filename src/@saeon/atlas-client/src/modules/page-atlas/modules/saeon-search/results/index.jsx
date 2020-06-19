import React from 'react'
import { DragMenu } from '@saeon/snap-menus'
import ResultsList from './_results-list'
import { Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

export default ({ id, data, currentPage, updateCurrentPage, ...props }) => {
  return (
    <DragMenu
      id={id}
      defaultPosition={{ x: 650, y: 25 }}
      defaultWidth={500}
      title={'Search results'}
      defaultSnap={isMobile ? 'Top' : 'Right'}
      {...props}
    >
      {({ height, width }) =>
        data?.hits.total ? (
          <ResultsList
            height={height}
            width={width}
            data={data}
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
            {...props}
          />
        ) : (
          <Typography>No results...</Typography>
        )
      }
    </DragMenu>
  )
}
