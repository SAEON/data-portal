import React, { lazy, Suspense, useRef, useContext } from 'react'
import { Loading } from '../../components'
import SideMenu from './side-menu'
import { GlobalContext } from '../../modules/provider-global'
import useCatalogue from '../../lib/useCatalogue'
import { Typography } from '@material-ui/core'

const MenuProvider = lazy(() => import('@saeon/snap-menus/src/provider'))
const MapProvider = lazy(() => import('../../modules/provider-map'))
const StateProvider = lazy(() => import('./state'))
const Map = lazy(() => import('./map'))

/**
 * The atlas is initialized from the results of an
 * Elasticsearch query
 *
 * No further requests to Elasticsearch are made once
 * this component is mounted
 *
 * All state of layer selection, etc. is handled in the
 * Atlas proxy
 *
 */
export default () => {
  const snapMenusContainer = useRef()
  const { global } = useContext(GlobalContext)
  const { layers: dois, layersearch } = global

  var gqlData = layersearch
    ? useCatalogue({ pageSize: 5000 })
    : useCatalogue({
        terms: dois.map(doi => ({
          field: 'identifier.identifier.raw',
          value: doi,
        })),
        pageSize: 5000,
      })

  return gqlData.error ? (
    <Typography>{JSON.stringify(gqlData.error)}</Typography>
  ) : gqlData.loading ? (
    <Loading />
  ) : (
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
      <Suspense fallback={<Loading />}>
        <MapProvider>
          <Suspense fallback={null}>
            <StateProvider gqlData={gqlData}>
              <Suspense fallback={null}>
                <MenuProvider
                  MARGIN_TOP={5}
                  MARGIN_RIGHT={5}
                  MARGIN_BOTTOM={5}
                  MARGIN_LEFT={5}
                  SNAP_MENUS_CONTAINER_REF={snapMenusContainer}
                >
                  <SideMenu snapMenusContainer={snapMenusContainer} />
                  <Map />
                </MenuProvider>
              </Suspense>
            </StateProvider>
          </Suspense>
        </MapProvider>
      </Suspense>
    </div>
  )
}
