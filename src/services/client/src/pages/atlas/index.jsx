import { useRef } from 'react'
import Loading from '../../components/loading'
import SideMenu from './side-menu'
import WithGqlQuery from '../../hooks/with-gql-query'
import getUriState from '../../lib/fns/get-uri-state'
import { gql } from '@apollo/client'
import { CATALOGUE_CLIENT_ADDRESS, CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../config'
import { setShareLink } from './../../hooks/use-share-link'
import MenuProvider from '@saeon/snap-menus/src/provider'
import OlReactProvider from '../../contexts/ol-react'
import StateProvider from './state'
import Map from './map'

export default () => {
  const snapMenusContainer = useRef()
  const { atlas: atlasId, referrer } = getUriState()
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
      <WithGqlQuery
        QUERY={gql`
          query($id: ID!) {
            atlas(id: $id)
          }
        `}
        variables={{ id: atlasId }}
      >
        {({ error, loading, data }) => {
          if (loading) {
            return <Loading />
          }

          if (error) {
            throw new Error('Error loading search state for Atlas')
          }

          const {
            ids = undefined,
            dois = undefined,
            extent = undefined,
            terms = undefined,
            text = undefined,
          } = data.atlas.search

          return (
            <WithGqlQuery
              QUERY={gql`
                query(
                  $extent: WKT_4326
                  $text: String
                  $terms: [TermInput!]
                  $size: Int
                  $ids: [ID!]
                  $dois: [String!]
                  $referrer: String
                ) {
                  catalogue(referrer: $referrer) {
                    id
                    records(
                      extent: $extent
                      text: $text
                      terms: $terms
                      size: $size
                      ids: $ids
                      dois: $dois
                    ) {
                      pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                      }
                      totalCount
                      nodes {
                        metadata
                      }
                    }
                  }
                }
              `}
              variables={{
                ids,
                dois,
                extent,
                terms,
                text,
                size: CATALOGUE_CLIENT_MAX_ATLAS_LAYERS,
                referrer,
              }}
            >
              {({ error, loading, data }) => {
                if (loading) {
                  return <Loading />
                }

                if (error) {
                  throw new Error('Error searching catalogue on atlas load')
                }

                return (
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
            </WithGqlQuery>
          )
        }}
      </WithGqlQuery>
    </div>
  )
}
