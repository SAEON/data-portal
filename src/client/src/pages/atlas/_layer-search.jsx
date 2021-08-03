import { forwardRef } from 'react'
import MenuProvider from '@saeon/snap-menus/provider'
import SideMenu from './side-menu'
import Loading from '../../components/loading'
import { useQuery, gql } from '@apollo/client'
import OlReactProvider from '../../contexts/ol-react'
import { CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../config'
import StateProvider from './state'
import Map from './map'
import useTheme from '@material-ui/core/styles/useTheme'

export default forwardRef(({ search, referrer }, snapMenusContainer) => {
  const theme = useTheme()
  const {
    ids = undefined,
    dois = undefined,
    extent = undefined,
    terms = undefined,
    text = undefined,
  } = search

  const { error, loading, data } = useQuery(
    gql`
      query (
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
    `,
    {
      variables: {
        ids,
        dois,
        extent,
        terms,
        text,
        size: CATALOGUE_CLIENT_MAX_ATLAS_LAYERS,
        referrer,
      },
    }
  )

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
          MARGIN_TOP={theme.spacing(1)}
          MARGIN_RIGHT={theme.spacing(1)}
          MARGIN_BOTTOM={theme.spacing(1)}
          MARGIN_LEFT={theme.spacing(1)}
          SNAP_MENUS_CONTAINER_REF={snapMenusContainer}
        >
          <SideMenu snapMenusContainer={snapMenusContainer} />
          <Map />
        </MenuProvider>
      </OlReactProvider>
    </StateProvider>
  )
})
