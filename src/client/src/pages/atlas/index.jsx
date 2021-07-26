import { useRef } from 'react'
import { useQuery } from '@apollo/client'
import Loading from '../../components/loading'
import getUriState from '../../lib/fns/get-uri-state'
import { gql } from '@apollo/client'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink } from './../../hooks/use-share-link'
import LayerSearch from './_layer-search'

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

  const { error, loading, data } = useQuery(
    gql`
      query ($id: ID!) {
        atlas(id: $id)
      }
    `,
    { variables: { id: atlasId } }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw new Error('Error loading search state for Atlas')
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 48,
      }}
    >
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
        <LayerSearch ref={snapMenusContainer} referrer={referrer} search={data.atlas.search} />
      </div>
    </div>
  )
}
