import React from 'react'
import { Form } from '../../../../../components'
import { DragMenu } from '@saeon/snap-menus'
import { MapContext } from '../../../../provider-map'
import { isMobile } from 'react-device-detect'
import Selector from './selector'

export default ({ id, onDrawEnd }) => {
  return (
    <Form selectPolygonActive={false} selectRectActive={false}>
      {({ updateForm, selectPolygonActive, selectRectActive }) => (
        <MapContext.Consumer>
          {({ proxy }) => {
            return (
              <DragMenu
                id={id}
                defaultPosition={{ x: 150, y: 25 }}
                defaultWidth={60}
                defaultHeight={143}
                title={''}
                resizable={false}
                defaultSnap={isMobile ? 'Top' : undefined}
              >
                <Selector
                  updateForm={updateForm}
                  selectPolygonActive={selectPolygonActive}
                  selectRectActive={selectRectActive}
                  proxy={proxy}
                  onDrawEnd={onDrawEnd}
                />
              </DragMenu>
            )
          }}
        </MapContext.Consumer>
      )}
    </Form>
  )
}
