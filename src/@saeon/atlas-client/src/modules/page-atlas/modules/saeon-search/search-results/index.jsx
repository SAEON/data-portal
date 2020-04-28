import React from 'react'
import { MenuContext, DragMenu } from '@saeon/snap-menus'
import ResultsList from './_results-list'
import { Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

export default ({ id, onClose, data }) => {
  return (
    <MenuContext.Consumer>
      {({ getMenuById, setActiveMenu }) => (
        <DragMenu
          onMouseDown={() => setActiveMenu(id)}
          zIndex={getMenuById(id).zIndex}
          defaultPosition={{ x: 650, y: 25 }}
          defaultWidth={500}
          title={'Search results'}
          close={onClose}
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
      )}
    </MenuContext.Consumer>
  )
}
