import { useRef } from 'react'
import { useQuery } from '@apollo/client'
import Loading from '../../components/loading'
import { gql } from '@apollo/client'
import LayerSearch from './_layer-search'

export default ({ id, ...props }) => {
  const snapMenusContainer = useRef()

  const { error, loading, data } = useQuery(
    gql`
      query($id: ID!) {
        atlas(id: $id)
      }
    `,
    { variables: { id } }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw new Error('Error loading search state for Atlas')
  }

  return (
    <div
      ref={snapMenusContainer}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      }}
    >
      <LayerSearch
        ref={snapMenusContainer}
        referrer={props.match.params.referrer || undefined}
        search={data.atlas.search}
      />
    </div>
  )
}
