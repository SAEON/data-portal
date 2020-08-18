import React, { lazy, Suspense, useRef } from 'react'
import { LinearProgress } from '@material-ui/core'

const MenuProvider = lazy(() => import('@saeon/snap-menus'))
const MapProvider = lazy(() => import('../../modules/provider-map'))

export default () => {
  const snapMenusContainer = useRef()
  return (
    <Suspense fallback={<LinearProgress style={{ position: 'absolute', left: 0, right: 0 }} />}>
      <MapProvider>
        <div
          id="saeon-snap-menus-atlas-component"
          style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
          ref={snapMenusContainer}
        >
          <MenuProvider
            VERTICAL_OFFSET_TOP={5}
            VERTICAL_OFFSET_BOTTOM={5}
            HORIZONTAL_MARGIN_LEFT={5}
            HORIZONTAL_MARGIN_RIGHT={5}
            SNAP_MENUS_CONTAINER={snapMenusContainer.current}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>hi</div>
          </MenuProvider>
        </div>
      </MapProvider>
    </Suspense>
  )
}
