import React from 'react'
import { Form } from '../../../../../components'
import { DragMenu } from '@saeon/snap-menus'
import { MapContext } from '../../../../provider-map'
import { isMobile } from 'react-device-detect'
import Selector from './selector'

export default ({ id, onDrawEnd, container }) => {
  return (
    <Form selectPolygonActive={false} selectRectActive={false}>
      {({ updateForm, selectPolygonActive, selectRectActive, ...props }) => (
        <MapContext.Consumer>
          {({ proxy }) => {
            return (
              <DragMenu
                container={container}
                id={id}
                defaultPosition={{ x: 150, y: 25 }}
                defaultWidth={60}
                defaultHeight={143}
                title={''}
                resizable={false}
                defaultSnap={isMobile ? 'Top' : undefined}
                {...props}
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
