import React, { lazy, Suspense, useRef } from 'react'
import { Loading } from '../../components'
import SideMenu from './side-menu'
import { useCatalogue as WithCatalogue, WithQglQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import { gql } from '@apollo/client'
import { CLIENT_HOST_ADDRESS, MAX_ATLAS_DATASETS } from '../../config'

const MenuProvider = lazy(() => import('@saeon/snap-menus/src/provider'))
const OlReactProvider = lazy(() => import('../../contexts/ol-react'))
const StateProvider = lazy(() => import('./state'))
const Map = lazy(() => import('./map'))

export default () => {
  const snapMenusContainer = useRef()
  const searchId = getUriState().search
  if (!searchId) {
    throw new Error(
      `The ATLAS requires prior-configuration of what layers to show. This is done at ${CLIENT_HOST_ADDRESS}/records`
    )
  }

  return (
    <WithQglQuery
      QUERY={gql`
        query($id: ID!) {
          browserClient {
            findSearchState(id: $id)
          }
        }
      `}
      variables={{ id: searchId }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw new Error('Error loading search state for Atlas')
        }

        return loading ? (
          <Loading />
        ) : (
          <WithCatalogue
            {...Object.assign(
              { ...(data?.browserClient.findSearchState || {}) },
              { dois: [...(data?.browserClient.findSearchState.selectedDois || [])] }
            )}
            pageSize={MAX_ATLAS_DATASETS}
          >
            {({ error, loading, data }) => {
              if (error) {
                throw new Error('Error searching catalogue')
              }

              if (data?.catalogue.records.totalCount > MAX_ATLAS_DATASETS) {
                throw new Error(
                  `Atlas supports a maximum of ${MAX_ATLAS_DATASETS} datasets. ${data.catalogue.records.totalCount} datasets were specified`
                )
              }

              return loading ? (
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
                    <OlReactProvider>
                      <Suspense fallback={null}>
                        <StateProvider data={data}>
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
                    </OlReactProvider>
                  </Suspense>
                </div>
              )
            }}
          </WithCatalogue>
        )
      }}
    </WithQglQuery>
  )
}
