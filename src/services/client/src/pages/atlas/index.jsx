import { useRef } from 'react'
import Loading from '../../components/loading'
import SideMenu from './side-menu'
import { useCatalogue as WithCatalogue, WithQglQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import { gql } from '@apollo/client'
import { CATALOGUE_CLIENT_ADDRESS, CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../config'
import { setShareLink } from './../../hooks'
import MenuProvider from '@saeon/snap-menus/src/provider'
import OlReactProvider from '../../contexts/ol-react'
import StateProvider from './state'
import Map from './map'

export default () => {
  const snapMenusContainer = useRef()
  const atlasId = getUriState().atlas
  if (!atlasId) {
    throw new Error(
      `The ATLAS requires prior-configuration of what layers to show. This is done at ${CATALOGUE_CLIENT_ADDRESS}/records`
    )
  }

  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/atlas?atlas=${atlasId}`,
    params: false,
  })

  return (
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
      <WithQglQuery
        QUERY={gql`
          query($id: ID!) {
            browserClient {
              atlas(id: $id)
            }
          }
        `}
        variables={{ id: atlasId }}
      >
        {({ error, loading, data }) => {
          if (error) {
            throw new Error('Error loading search state for Atlas')
          }

          return loading ? (
            <Loading />
          ) : (
            <WithCatalogue
              {...data?.browserClient.atlas.state}
              pageSize={CATALOGUE_CLIENT_MAX_ATLAS_LAYERS}
            >
              {({ error, loading, data }) => {
                if (error) {
                  throw new Error('Error searching catalogue')
                }

                if (data?.catalogue.records.totalCount > CATALOGUE_CLIENT_MAX_ATLAS_LAYERS) {
                  throw new Error(
                    `Atlas supports a maximum of ${CATALOGUE_CLIENT_MAX_ATLAS_LAYERS} datasets. ${data.catalogue.records.totalCount} datasets were specified`
                  )
                }

                return loading ? (
                  <Loading />
                ) : (
                  <StateProvider data={data}>
                    <OlReactProvider>
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
                    </OlReactProvider>
                  </StateProvider>
                )
              }}
            </WithCatalogue>
          )
        }}
      </WithQglQuery>
    </div>
  )
}
