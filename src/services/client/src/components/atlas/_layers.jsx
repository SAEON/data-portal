import React, { useContext } from 'react'
import { AtlasContext } from './_state-provider'
import { useMenu } from '@saeon/snap-menus'

export default ({ snapMenusContainer }) => {
  const { gqlData } = useContext(AtlasContext)
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
      {JSON.stringify(gqlData.data?.catalogue)}
    </RecordsMenu>
  )
}
