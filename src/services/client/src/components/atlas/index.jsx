import React, { lazy, Suspense, useRef } from 'react'
import { Loading } from '../../components'
import SideMenu from './side-menu'

const MenuProvider = lazy(() => import('@saeon/snap-menus'))
const MapProvider = lazy(() => import('../../modules/provider-map'))
const StateProvider = lazy(() => import('./state'))

export default () => {
  const snapMenusContainer = useRef()

  return (
    <Suspense fallback={<Loading />}>
      <div
        ref={snapMenusContainer}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <Suspense fallback={null}>
          <StateProvider>
            <MapProvider>
              <Suspense fallback={null}>
                <MenuProvider
                  VERTICAL_OFFSET_TOP={5}
                  VERTICAL_OFFSET_BOTTOM={5}
                  HORIZONTAL_MARGIN_LEFT={5}
                  HORIZONTAL_MARGIN_RIGHT={5}
                  SNAP_MENUS_CONTAINER_REF={snapMenusContainer}
                >
                  <SideMenu snapMenusContainer={snapMenusContainer} />
                </MenuProvider>
              </Suspense>
            </MapProvider>
          </StateProvider>
        </Suspense>
      </div>
    </Suspense>
  )
}
