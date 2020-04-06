import React from 'react'
import { DragMenu } from '../../components'
import { MenuContext } from '../menu-provider'
import ResultsList from './_results-vlist'

export default ({ id, onClose, data }) => {
  return (
    <MenuContext.Consumer>
      {({ getMenuById, setActiveMenu }) => (
        <DragMenu
          onMouseDown={() => setActiveMenu(id)}
          zIndex={getMenuById(id).zIndex}
          defaultPosition={{ x: 650, y: 25 }}
          defaultWidth={500}
          title={'SAEON catalogue search results'}
          active={true}
          close={onClose}
        >
          {() => <ResultsList data={data} />}
        </DragMenu>
      )}
    </MenuContext.Consumer>
  )
}
