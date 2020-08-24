import React from 'react'
import { useMenu } from '@saeon/snap-menus'
import Tabs from './_tabs'

export default ({ snapMenusContainer }) => {
  const RecordsMenu = useMenu({ id: 'records' })

  return (
    <RecordsMenu
      defaultHeight={snapMenusContainer.current?.offsetHeight - 30}
      defaultWidth={300}
      defaultPosition={{ x: 10, y: 10 }}
      draggable={false}
      resizable={true}
      open={true}
      title={'Data Explorer'}
    >
      <Tabs />
    </RecordsMenu>
  )
}
