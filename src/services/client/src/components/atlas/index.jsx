import React, { lazy, Suspense, useRef, useContext } from 'react'
import { Loading } from '../../components'
import { UriStateContext } from '../../modules/provider-uri-state'

const MenuProvider = lazy(() => import('@saeon/snap-menus'))
const MapProvider = lazy(() => import('../../modules/provider-map'))

export default () => {
  const snapMenusContainer = useRef()

  const { getUriState } = useContext(UriStateContext)
  const { terms = undefined } = Object.assign(getUriState({ splitString: true }))
  const { extent = undefined, text = undefined, layersearch = undefined } = getUriState({
    splitString: false,
  })

  if (layersearch) {
    console.log('search for records with terms, extent and text')
  } else {
    console.log('search for records by DOI value, keep a map of which resource to use per record')
  }

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
        <MapProvider>
          <Suspense fallback={null}>
            <MenuProvider
              VERTICAL_OFFSET_TOP={5}
              VERTICAL_OFFSET_BOTTOM={5}
              HORIZONTAL_MARGIN_LEFT={5}
              HORIZONTAL_MARGIN_RIGHT={5}
              SNAP_MENUS_CONTAINER={snapMenusContainer.current}
            ></MenuProvider>
          </Suspense>
        </MapProvider>
      </div>
    </Suspense>
  )
}
