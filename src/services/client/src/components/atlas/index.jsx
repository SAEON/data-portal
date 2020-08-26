import React, { lazy, Suspense, useRef, useContext } from 'react'
import { Loading } from '../../components'
import SideMenu from './side-menu'
import { UriStateContext } from '../../modules/provider-uri-state'
import useCatalogue from '../../lib/useCatalogue'

const MenuProvider = lazy(() => import('@saeon/snap-menus'))
const MapProvider = lazy(() => import('../../modules/provider-map'))
const StateProvider = lazy(() => import('./state'))

/**
 * The atlas is initialized from the results of an
 * Elasticsearch query
 *
 * No further requests to Elasticsearch are made once
 * this component is mounted
 *
 * All state of layer selection, etc. is handled in the
 * Atlas proxy
 */
export default () => {
  const snapMenusContainer = useRef()
  const { getUriState } = useContext(UriStateContext)
  let { layers = undefined } = getUriState({ splitString: true })
  const { layersearch = undefined } = getUriState({
    splitString: false,
  })

  /**
   * In the case where specific maps are selected
   * to preview, doiMap is taken into account
   *
   * Layers is an array of strings:
   * ["doi~<index>", "doi~<index>", etc.]
   *
   * DOIs can have multiple links. This code creates a
   * map that looks something like this:
   * {
   *  "10.15493/SARVA.CSAG.10000145": ["0"]
   *  "10.15493/SARVA.CSAG.10000252": ["0"]
   *  "10.15493/SARVA.CSAG.10000371": ["0"]
   *  "DummyDOI3816": ["0", "1"]
   * }
   */
  const doiMap = layers?.reduce(
    (acc, layerId) =>
      Object.assign(acc, {
        [layerId.split('~')[0]]: [
          ...new Set([...(acc[layerId.split('~')[0]] || []), layerId.split('~')[1]].filter(_ => _)),
        ].sort(),
      }),
    {}
  )

  var gqlData
  if (layersearch) {
    gqlData = useCatalogue({ pageSize: 5000 })
  } else {
    gqlData = useCatalogue({
      /**
       * Convert doiMap into a terms query, that looks like this:
       * [
       *  { field: 'identifier.identifier.raw', value: '10.15493/SARVA.CSAG.10000145' },
       *  { field: 'identifier.identifier.raw', value: '"10.15493/SARVA.CSAG.10000252' },
       *  { etc. }
       * ]
       */
      terms: [...new Set(Object.entries(doiMap || {}).map(([k]) => k))].map(k => ({
        field: 'identifier.identifier.raw',
        value: k,
      })),
      pageSize: 5000,
    })
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
        <Suspense fallback={null}>
          <StateProvider gqlData={gqlData} doiMap={doiMap}>
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
