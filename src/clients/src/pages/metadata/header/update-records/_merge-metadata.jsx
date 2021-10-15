import { memo, useMemo } from 'react'
import ConfirmAndMutate from './_confirm-and-mutate'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export default memo(({ changes, changedSelectedRows, ...props }) => {
  const metadataIds = useMemo(() => changedSelectedRows.map(({ id }) => id), [changedSelectedRows])

  const { error, loading, data } = useQuery(
    gql`
      query ($ids: [ID!]) {
        indexedMetadata(ids: $ids) {
          id
          metadata
        }
      }
    `,
    {
      variables: {
        ids: metadataIds,
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  if (!data.indexedMetadata.length) {
    return null
  }

  const otherMetadata = Object.fromEntries(
    data.indexedMetadata.map(({ id, metadata = {} } = {}) => [id, { ...metadata }])
  )

  const changesMergedWithOtherMetadata = Object.fromEntries(
    Object.entries(changes).map(([id, { metadata = {}, ...record } = {}]) => [
      id,
      { ...record, metadata: { ...otherMetadata[id], ...metadata } },
    ])
  )

  return (
    <ConfirmAndMutate
      changes={changesMergedWithOtherMetadata}
      changedSelectedRows={changedSelectedRows}
      {...props}
    />
  )
})
