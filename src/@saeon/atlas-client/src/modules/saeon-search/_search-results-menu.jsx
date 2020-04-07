import React from 'react'
import { DragMenu } from '../../components'
import { MenuContext } from '../menu-provider'
import ResultsList from './_results-vlist'
import { Typography } from '@material-ui/core'

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
          active={true}
          close={onClose}
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
