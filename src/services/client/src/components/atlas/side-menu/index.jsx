import React, { createContext } from 'react'
import { useMenu } from '@saeon/snap-menus'
import Tabs from './tabs'

export const SideMenuContext = createContext()

export default ({ snapMenusContainer }) => {
  console.log('rendering side menu')
  const RecordsMenu = useMenu({ id: 'records' })

  return (
    <RecordsMenu
      defaultHeight={snapMenusContainer.current?.offsetHeight - 30}
      defaultWidth={300}
      defaultPosition={{ x: 10, y: 10 }}
      draggable={false}
      resizable={false}
      open={true}
      title={'Data Explorer'}
    >
      {({ width, height }) => {
        return (
          <SideMenuContext.Provider value={{ width, height }}>
            <Tabs />
          </SideMenuContext.Provider>
        )
      }}
    </RecordsMenu>
  )
}
